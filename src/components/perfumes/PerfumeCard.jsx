import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './../../Cart.css';

export default function PerfumeCard({ product, onAdd }) {
    const navigate = useNavigate();

    if (!product) return null;

    const handleCardClick = () => {
        navigate(`/perfumes/${product.idPerfume || product.id}`);
    };

    return (
        <Card 
            className="h-100 perfume-card"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <Card.Img 
                variant="top" 
                src={product.image || product.imageUrl || 'https://via.placeholder.com/200'} 
                alt={product.productName || product.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{product.productName || product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {product.brand || 'Sin marca'}
                </Card.Subtitle>
                <p className="text-sm">
                    {product.descPerfume || product.description || 'Sin descripción'}
                </p>
                <p className="text-muted small">
                    <strong>Tamaño:</strong> {product.size || product.volume || 'N/A'}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0">
                        <strong>${Number(product.price).toLocaleString('es-CL')}</strong>
                    </Card.Text>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se navegue al detalle
                            onAdd();
                        }}
                        disabled={!product.stock || product.stock === 0}
                    >
                        {product.stock && product.stock > 0 ? 'Agregar' : 'Sin stock'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}