import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PerfumeCard({ product, onAdd }) {
  if (!product) return null;
  const { id, name, price, category, imageUrl } = product;

  const handleAdd = (e) => {
    e.preventDefault();    // evita que el Link haga navegación
    e.stopPropagation();   // evita burbujeo
    onAdd?.();             // ya viene ligado a product desde el Grid
  };

  return (
    <Link
      to={`/perfumes/${id}`}
      className="text-decoration-none text-reset"
      aria-label={`Ver detalles de ${name}`}
    >
      <Card className="h-100 shadow-sm card-hover">
        {imageUrl && (
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={`Imagen de ${name}`}
            loading="lazy"
            style={{ objectFit: 'contain', height: 180 }}
          />
        )}

        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{name}</Card.Title>
            {category && <Badge bg="dark">{category}</Badge>}
          </div>

          <Card.Text className="text-muted mb-3">
            ${Number(price).toLocaleString('es-CL')}
          </Card.Text>

          <Button
            variant="primary"
            onClick={handleAdd}
            className="mt-auto"
            aria-label={`Agregar ${name} al carrito`}
          >
            Agregar
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
}
