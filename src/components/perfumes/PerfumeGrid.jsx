import { Row, Col } from 'react-bootstrap';
import ProductCard from './PerfumeCard';

export default function PerfumeGrid({ items, onAdd }) {
    return (
        <Row xs={1} sm={2} lg={3} className="g-3">
        {items.map(p => (
            <Col key={p.id}>
            <ProductCard product={p} onAdd={() => onAdd(p)} />
            </Col>
        ))}
        </Row>
    );
}