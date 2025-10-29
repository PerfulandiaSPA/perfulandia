import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PERFUMES_LIST, CATEGORIES } from '../data/perfume.mock';
import PerfumeGrid from '../components/perfumes/PerfumeGrid';
import { useCart } from '../context/CartContext';

export default function Perfumes() {
    const [params] = useSearchParams();
    // Leer el parámetro "cat" de la URL
    const cat = params.get('cat') || 'all';
    const { addToCart } = useCart();
    // Filtrar perfumes según el valor del parámetro
    const list = useMemo(() => {
        if (cat === 'all') return PERFUMES_LIST;
        return PERFUMES_LIST.filter(p => p.category === cat);
    }, [cat]);

    return (
        <main>
            <Container>
                <br />
                <h2 className="mb-2 titulo-perfume">PRODUCTOS</h2>
                <p className="text-muted mb-3"> </p>



                {/* Grid con los productos filtrados */}
                <PerfumeGrid items={list} onAdd={addToCart} />

            </Container>
        </main>
    );
}
