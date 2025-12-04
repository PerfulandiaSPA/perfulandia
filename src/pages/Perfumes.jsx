import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import PerfumeGrid from '../components/perfumes/PerfumeGrid';
import { useCart } from '../context/CartContext';
import { getAllPerfumes } from '../api/perfumeService';

export default function Perfumes() {
    const [params] = useSearchParams();
    const cat = params.get('cat') || 'all';
    const { addToCart } = useCart();
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar perfumes de la API
    useEffect(() => {
        async function fetchPerfumes() {
            try {
                setLoading(true);
                const data = await getAllPerfumes();
                setPerfumes(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error al obtener perfumes:", err);
                setError("No se pudieron cargar los productos");
            } finally {
                setLoading(false);
            }
        }
        fetchPerfumes();
    }, []);

    // Filtrar perfumes según la categoría
    const list = useMemo(() => {
        if (cat === 'all') return perfumes;
        return perfumes.filter(p => p.categoryGender?.name === cat || p.category === cat);
    }, [perfumes, cat]);

    if (loading) return (
        <main>
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        </main>
    );

    if (error) return (
        <main>
            <Container>
                <Alert variant="danger" className="mt-5">{error}</Alert>
            </Container>
        </main>
    );

    return (
        <main>
            <Container>
                <br />
                <h2 className="mb-2 titulo-perfume">PRODUCTOS</h2>
                <p className="text-muted mb-3"> </p>
                {list.length === 0 ? (
                    <Alert variant="info">No hay productos disponibles</Alert>
                ) : (
                    <PerfumeGrid items={list} onAdd={addToCart} />
                )}
            </Container>
        </main>
    );
}
