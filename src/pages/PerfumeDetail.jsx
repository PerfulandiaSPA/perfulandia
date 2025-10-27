import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { PERFUMES_LIST } from '../data/perfume.mock';
import { useCart } from '../context/CartContext';

export default function PerfumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const perfume = useMemo(
    () => PERFUMES_LIST.find(p => String(p.id) === String(id)),
    [id]
  );

  if (!perfume) {
    return (
      <Container className="py-5">
        <p className="mb-4">Perfume no encontrado.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  const { name, price, category, imageUrl } = perfume;

  return (
    <main>
      <Container className="py-4">
        <Button
          variant="link"
          className="text-decoration-none mb-3 ps-0"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>

        <Row>
          <Col md={5} className="mb-3">
            <Card className="shadow-sm">
              {imageUrl && (
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={name}
                  style={{ objectFit: 'cover', height: 420 }}
                />
              )}
            </Card>
          </Col>

          <Col md={7}>
            <h2 className="mb-2">{name}</h2>
            <div className="mb-3"><Badge bg="dark">{category}</Badge></div>

            <h4 className="mb-3">$ {Number(price).toLocaleString('es-CL')}</h4>

            <div className="mb-4">
              <h5 className="mb-2">Especificaciones</h5>
              <ul className="mb-0">
                <li><strong>Categoría:</strong> {category}</li>
                <li><strong>Precio:</strong> $ {Number(price).toLocaleString('es-CL')}</li>
              </ul>
            </div>

            <Button variant="warning" onClick={() => addToCart(perfume)}>
              Agregar al carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
