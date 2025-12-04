// src/pages/PerfumeForm.jsx
import { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner, Table, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import {
    getAllPerfumes,
    createPerfume,
    deletePerfume
} from '../api/perfumeService';

const initialForm = {
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
    volume: '',
    concentration: '',
    topNotes: '',
    middleNotes: '',
    baseNotes: ''
};

export default function PerfumeForm() {
    const { addToCart } = useCart();

    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(initialForm);

    async function loadPerfumes() {
        try {
            setLoading(true);
            setError('');
            const data = await getAllPerfumes();
            setPerfumes(Array.isArray(data) ? data : data.data || []);
        } catch (e) {
            console.error(e);
            setError('Error al cargar los perfumes');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPerfumes();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const payload = {
                name: form.name.trim(),
                category: form.category.trim() || null,
                price: form.price ? Number(form.price) : 0,
                imageUrl: form.imageUrl.trim() || null,
                description: form.description.trim() || null,
                specs: {
                    "Volumen": form.volume.trim() || null,
                    "Concentración": form.concentration.trim() || null,
                    "Notas de salida": form.topNotes.trim() || null,
                    "Notas de corazón": form.middleNotes.trim() || null,
                    "Notas de fondo": form.baseNotes.trim() || null
                }
            };

            const nuevo = await createPerfume(payload);
            setPerfumes((prev) => [...prev, nuevo]);
            setForm(initialForm);
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
            setPerfumes((prev) => prev.filter((perfume) => perfume.id !== id));
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

    return (
        <main className="container">
            <h2 className="mb-3">Gestión de Perfumes</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-4">
                <Col md={6}>
                    <h4>Nuevo perfume</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="ej: Mujer, Hombre, Unisex"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                                placeholder="ej: https://fimgs.net/mdimg/perfume/o.40069.jpg"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                min="0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Volumen (ml)</Form.Label>
                            <Form.Control
                                name="volume"
                                value={form.volume}
                                onChange={handleChange}
                                placeholder="ej: 100 ml"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Concentración</Form.Label>
                            <Form.Control
                                name="concentration"
                                value={form.concentration}
                                onChange={handleChange}
                                placeholder="ej: Eau de Parfum"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Notas de Salida</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="topNotes"
                                value={form.topNotes}
                                onChange={handleChange}
                                placeholder="ej: Bergamota, limón, pimienta"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Notas de Corazón</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="middleNotes"
                                value={form.middleNotes}
                                onChange={handleChange}
                                placeholder="ej: Jazmín, rosa, iris"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Notas de Fondo</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="baseNotes"
                                value={form.baseNotes}
                                onChange={handleChange}
                                placeholder="ej: Vainilla, sándalo, almízcares"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Descripción del perfume"
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
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Volumen</th>
                            <th>Concentración</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {perfumes.map((perfume) => (
                            <tr key={perfume.id}>
                                <td>{perfume.id}</td>
                                <td>{perfume.name}</td>
                                <td>{perfume.category}</td>
                                <td>${Number(perfume.price).toLocaleString('es-CL')}</td>
                                <td>{perfume.specs?.["Volumen"] || perfume.volume}</td>
                                <td>{perfume.specs?.["Concentración"] || perfume.concentration}</td>
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
                                        onClick={() => handleDelete(perfume.id)}
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