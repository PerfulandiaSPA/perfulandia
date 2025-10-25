import { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { PERFUMES_LIST, CATEGORIES } from '../data/perfume.mock';  // Solo una importación
import Filters from '../components/perfumes/Filters';
import PerfumeGrid from '../components/perfumes/PerfumeGrid';

export default function Perfumes() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');

    const list = useMemo(() => {
        return filter === 'all'
            ? PERFUMES_LIST
            : PERFUMES_LIST.filter(p => p.category === filter);
    }, [filter]);

    return (
        <main>
            <Container>
                <h2 className="mb-2">Perfulandia</h2>
                <p className="text-muted mb-3">Variedad de perfumes</p>

                <Filters
                    current={filter}
                    onChange={setFilter}
                    options={CATEGORIES}
                    total={PERFUMES_LIST.length}
                />

                <PerfumeGrid items={list} onAdd={addToCart} />
            </Container>
        </main>
    );
}
