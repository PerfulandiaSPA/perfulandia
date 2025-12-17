// src/pages/PerfumeForm.jsx
import { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner, Table, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import {
    getAllPerfumes,
    createPerfume,
    deletePerfume
} from '../api/perfumeService';
import { getAllCategories } from '../api/categoryService';

const initialForm = {
    productName: '',
    brand: '',
    price: '',
    stock: '',
    image: '',
    size: '',
    descPerfume: '',
    isActive: true,
    categoryGender: null,
    categoryFragancy: null
};

export default function PerfumeForm() {
    const { addToCart } = useCart();

    const [perfumes, setPerfumes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(initialForm);

    async function loadData() {
        try {
            setLoading(true);
            setError('');
            const perfumesData = await getAllPerfumes();
            setPerfumes(Array.isArray(perfumesData) ? perfumesData : perfumesData.data || []);
            
            const categoriesData = await getAllCategories();
            const catsArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
            setCategories(catsArray);
            
            if (catsArray.length === 0) {
                console.warn('No categories found');
            }
        } catch (e) {
            console.error(e);
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : (name.includes('category') ? (value ? Number(value) : null) : value)
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const payload = {
                productName: form.productName.trim(),
                brand: form.brand.trim(),
                price: form.price ? Number(form.price) : 0,
                stock: form.stock ? Number(form.stock) : 0,
                image: form.image.trim(),
                size: form.size.trim(),
                descPerfume: form.descPerfume.trim(),
                isActive: form.isActive,
                categoryGender: form.categoryGender ? { idCategory: form.categoryGender } : null,
                categoryFragancy: null
            };

            const nuevo = await createPerfume(payload);
            setPerfumes((prev) => [...prev, nuevo]);
            setForm({ ...initialForm });
            setError('');
            // Recarga las categorías para asegurar disponibilidad
            await loadData();
        } catch (e) {
            console.error(e);
            setError('Error al crear el perfume (revisa validaciones del backend)');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('¿Seguro que quieres eliminar este perfume?')) return;

        try {
            setLoading(true);
            setError('');
            await deletePerfume(id);
            setPerfumes((prev) => prev.filter((perfume) => perfume.idPerfume !== id));
        } catch (e) {
            console.error(e);
            setError('Error al eliminar el perfume');
        } finally {
            setLoading(false);
        }
    }

    function handleAddToCart(perfume) {
        addToCart(perfume);
    }

    // Agrupar categorías por género
    const genderCategories = categories.filter(cat => cat.gender);

    return (
        <main className="container">
            <h2 className="mb-3">Gestión de Perfumes</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-4">
                <Col md={6}>
                    <h4>Nuevo perfume</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre del Producto *</Form.Label>
                            <Form.Control
                                name="productName"
                                value={form.productName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Marca *</Form.Label>
                            <Form.Control
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio *</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Stock *</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Imagen *</Form.Label>
                            <Form.Control
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="ej: https://fimgs.net/mdimg/perfume/o.40069.jpg"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Tamaño *</Form.Label>
                            <Form.Control
                                name="size"
                                value={form.size}
                                onChange={handleChange}
                                placeholder="ej: 100 ml"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Género *</Form.Label>
                            <Form.Select
                                name="categoryGender"
                                value={form.categoryGender || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Selecciona un género --</option>
                                {genderCategories && genderCategories.length > 0 ? (
                                    genderCategories.map(cat => (
                                        <option key={cat.idCategory} value={cat.idCategory}>
                                            {cat.gender}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Cargando géneros...</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descPerfume"
                                value={form.descPerfume}
                                onChange={handleChange}
                                placeholder="Descripción del perfume"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                name="isActive"
                                label="Activo"
                                checked={form.isActive}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar perfume'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <h4>Listado de perfumes</h4>
            {loading && <Spinner animation="border" />}

            {!loading && perfumes.length === 0 && (
                <p>No hay perfumes registrados.</p>
            )}

            {!loading && perfumes.length > 0 && (
                <Table striped bordered hover size="sm" className="mt-2">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Género</th>
                            <th>Tamaño</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {perfumes.map((perfume) => (
                            <tr key={perfume.idPerfume}>
                                <td>{perfume.idPerfume}</td>
                                <td>{perfume.productName}</td>
                                <td>{perfume.brand}</td>
                                <td>${Number(perfume.price).toLocaleString('es-CL')}</td>
                                <td>{perfume.stock}</td>
                                <td>{perfume.categoryGender?.gender || 'N/A'}</td>
                                <td>{perfume.size}</td>
                                <td>{perfume.isActive ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleAddToCart(perfume)}
                                    >
                                        Agregar al carrito
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(perfume.idPerfume)}
                                    >
                                        Borrar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </main>
    );
}