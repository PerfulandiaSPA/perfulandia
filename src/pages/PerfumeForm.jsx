import { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner, Table, Row, Col, Card, Badge, Image } from 'react-bootstrap';
// Importamos updatePerfume
import {
    getAllPerfumes,
    createPerfume,
    updatePerfume,
    deletePerfume
} from '../api/perfumeService';
import { getAllCategories } from '../api/categoryService';
import '../PerfumeForm.css';

// --- ICONOS SVG (Lápiz y Basura) ---
const IconEdit = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const IconTrash = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const initialForm = {
    productName: '',
    brand: '',
    price: '',
    stock: '',
    image: '',
    size: '',
    descPerfume: '',
    isActive: true,
    categoryGender: ''
};

export default function PerfumeForm() {
    const [perfumes, setPerfumes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estados para control de edición
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null); // Si es null = Creando. Si tiene ID = Editando.

    // 1. Cargar datos iniciales
    async function loadData() {
        try {
            setLoading(true);
            setError('');
            const perfumesData = await getAllPerfumes();
            setPerfumes(Array.isArray(perfumesData) ? perfumesData : perfumesData.data || []);

            const categoriesData = await getAllCategories();
            const catsArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
            setCategories(catsArray);
        } catch (e) {
            console.error(e);
            setError('Error al cargar los datos del servidor');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // 2. Manejar cambios en inputs
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name.includes('category') ? (value ? Number(value) : '') : value)
        }));
    }

    // 3. Preparar formulario para EDITAR
    function handleEdit(perfume) {
        setError('');
        setEditingId(perfume.idPerfume);

        // Rellenamos el form con los datos del perfume seleccionado
        setForm({
            productName: perfume.productName,
            brand: perfume.brand,
            price: perfume.price,
            stock: perfume.stock,
            image: perfume.image,
            size: perfume.size,
            descPerfume: perfume.descPerfume,
            isActive: perfume.isActive,
            // Asumimos que categoryGender viene como objeto. Si viene null, ponemos string vacío.
            categoryGender: perfume.categoryGender ? perfume.categoryGender.idCategory : ''
        });

        // Scroll suave hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 4. Cancelar edición
    function handleCancelEdit() {
        setEditingId(null);
        setForm(initialForm);
        setError('');
    }

    // 5. Enviar formulario (Crear o Actualizar)
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const payload = {
                productName: form.productName.trim(),
                brand: form.brand.trim(),
                price: Number(form.price),
                stock: Number(form.stock),
                image: form.image.trim(),
                size: form.size.trim(),
                descPerfume: form.descPerfume.trim(),
                isActive: form.isActive,
                categoryGenderId: form.categoryGender ? Number(form.categoryGender) : null
            };

            if (editingId) {
                // --- MODO ACTUALIZAR ---
                const actualizado = await updatePerfume(editingId, payload);

                // Actualizamos la lista localmente
                setPerfumes(prev => prev.map(p => (p.idPerfume === editingId ? actualizado : p)));

                // Volvemos a modo creación
                setEditingId(null);
            } else {
                // --- MODO CREAR ---
                const nuevo = await createPerfume(payload);
                setPerfumes((prev) => [...prev, nuevo]);
            }

            // Limpiar formulario
            setForm({ ...initialForm });

        } catch (e) {
            console.error(e);
            setError(`Error al guardar: ${e.message || 'Verifica los datos'}`);
        } finally {
            setLoading(false);
        }
    }

    // 6. Eliminar
    async function handleDelete(id) {
        if (!window.confirm('¿Seguro que quieres eliminar este perfume permanentemente?')) return;

        try {
            setLoading(true);
            await deletePerfume(id);
            setPerfumes((prev) => prev.filter((perfume) => perfume.idPerfume !== id));

            // Si estábamos editando justo el que borramos, limpiar
            if (editingId === id) handleCancelEdit();

        } catch (e) {
            console.error(e);
            setError('Error al eliminar el perfume');
        } finally {
            setLoading(false);
        }
    }

    const genderCategories = categories.filter(cat => cat.gender);

    return (
        <main className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Gestión de Inventario</h2>
                <Badge bg="dark" className="p-2 fs-6 fw-normal">Total: {perfumes.length} perfumes</Badge>
            </div>

            {error && <Alert variant="danger" className="shadow-sm animate__animated animate__fadeIn">{error}</Alert>}

            {/* --- CARD DEL FORMULARIO --- */}
            <Card className={`manager-card mb-5 shadow-sm border-0 ${editingId ? 'border-edit-active' : ''}`}>
                <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="form-section-title">
                        {editingId ? ' Editando Perfume' : ' Agregar Nuevo Perfume'}
                    </h5>
                    {editingId && (
                        <Button variant="outline-secondary" size="sm" onClick={handleCancelEdit}>
                            Cancelar Edición
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            {/* COLUMNA IZQUIERDA */}
                            <Col md={8}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Nombre del Producto *</Form.Label>
                                            <Form.Control className="custom-input" name="productName" value={form.productName} onChange={handleChange} required placeholder="Ej: Sauvage" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Marca *</Form.Label>
                                            <Form.Control className="custom-input" name="brand" value={form.brand} onChange={handleChange} required placeholder="Ej: Dior" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Precio *</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0">$</span>
                                                <Form.Control className="custom-input" type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Stock *</Form.Label>
                                            <Form.Control className="custom-input" type="number" name="stock" value={form.stock} onChange={handleChange} required min="0" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Tamaño *</Form.Label>
                                            <Form.Control className="custom-input" name="size" value={form.size} onChange={handleChange} required placeholder="Ej: 100ml" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="custom-label">Género *</Form.Label>
                                            <Form.Select className="custom-input" name="categoryGender" value={form.categoryGender || ''} onChange={handleChange} required>
                                                <option value="">-- Seleccionar --</option>
                                                {genderCategories.map(cat => (
                                                    <option key={cat.idCategory} value={cat.idCategory}>{cat.gender}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label={form.isActive ? "Producto en Oferta" : "Producto Regular"}
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleChange}
                                            className="mt-4 ms-2 custom-switch-label"
                                        />
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className="custom-label">Descripción *</Form.Label>
                                    <Form.Control className="custom-input" as="textarea" rows={2} name="descPerfume" value={form.descPerfume} onChange={handleChange} required placeholder="Descripción..." />
                                </Form.Group>
                            </Col>

                            {/* COLUMNA DERECHA */}
                            <Col md={4} className="d-flex flex-column">
                                <Form.Group className="mb-3">
                                    <Form.Label className="custom-label">URL de Imagen *</Form.Label>
                                    <Form.Control className="custom-input" name="image" value={form.image} onChange={handleChange} required placeholder="https://..." />
                                </Form.Group>

                                <div className="image-preview-box flex-grow-1 d-flex align-items-center justify-content-center bg-light rounded border">
                                    {form.image ? (
                                        <Image src={form.image} alt="Preview" fluid className="preview-img animate__animated animate__fadeIn" onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'} />
                                    ) : (
                                        <span className="text-muted small">Vista previa</span>
                                    )}
                                </div>
                            </Col>
                        </Row>

                        <div className="d-grid mt-4">
                            <Button type="submit" disabled={loading} className={`btn-save-perfume ${editingId ? 'btn-update' : ''}`}>
                                {loading ? <Spinner as="span" animation="border" size="sm" /> : (editingId ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO')}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* --- TABLA --- */}
            <h4 className="mb-3 form-section-title">Inventario Actual</h4>

            <Card className="shadow-sm border-0 overflow-hidden">
                <Table hover responsive className="align-middle mb-0 custom-table">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4">Producto</th>
                            <th>Marca</th>
                            <th>Precio / Stock</th>
                            <th>Detalles</th>
                            <th>Estado</th>
                            <th className="text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && perfumes.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-5"><Spinner animation="border" /></td></tr>
                        ) : perfumes.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-5 text-muted">No hay perfumes registrados</td></tr>
                        ) : (
                            perfumes.map((perfume) => (
                                <tr key={perfume.idPerfume} className={editingId === perfume.idPerfume ? 'table-active' : ''}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="img-thumbnail-wrapper me-3">
                                                <img src={perfume.image} alt={perfume.productName} className="table-img" onError={(e) => e.target.src = 'https://via.placeholder.com/50'} />
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">{perfume.productName}</div>
                                                <small className="text-muted">ID: {perfume.idPerfume}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{perfume.brand}</td>
                                    <td>
                                        <div className="fw-bold">${Number(perfume.price).toLocaleString('es-CL')}</div>
                                        <small className={perfume.stock < 5 ? "text-danger fw-bold" : "text-muted"}>Stock: {perfume.stock}</small>
                                    </td>
                                    <td>
                                        <Badge bg="light" text="dark" className="border me-1">{perfume.size}</Badge>
                                        <Badge bg={perfume.categoryGender?.gender === 'Hombre' ? 'info' : 'warning'} text="dark" className="bg-opacity-25">
                                            {perfume.categoryGender?.gender || 'N/A'}
                                        </Badge>
                                    </td>
                                    <td>
                                        {perfume.isActive ? <Badge bg="primary" className="rounded-pill">En Oferta</Badge> : <Badge bg="light" text="dark" className="border">Regular</Badge>}
                                    </td>
                                    <td className="text-end pe-4">
                                        <Button
                                            variant="outline-dark"
                                            className="me-2 btn-icon-action"
                                            onClick={() => handleEdit(perfume)}
                                            title="Editar"
                                            disabled={loading}
                                        >
                                            <IconEdit />
                                        </Button>

                                        <Button
                                            variant="outline-danger"
                                            className="btn-icon-action"
                                            onClick={() => handleDelete(perfume.idPerfume)}
                                            title="Eliminar"
                                            disabled={loading}
                                        >
                                            <IconTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card>
        </main>
    );
}