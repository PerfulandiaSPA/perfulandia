// PerfumeGrid.jsx o HomePage.jsx

import React, { useState, useEffect } from 'react';
import PerfumeCard from './PerfumeCard';
import { getAllPerfumes } from '../../api/perfumeService';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';

export default function PerfumeGrid() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPerfumes() {
            try {
                // 1. Llamar al servicio que usa Axios
                const data = await getAllPerfumes();

                // 2. Asumiendo que 'data' es el array de perfumes.
                setPerfumes(data);

            } catch (err) {
                console.error("Error al obtener perfumes:", err);
                setError("No se pudieron cargar los productos. " + err.message);

            } finally {
                setLoading(false);
            }
        }
        fetchPerfumes();
    }, []);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;

    const handleAdd = (product) => {
        // Lógica para añadir al carrito (Contexto o Redux)
        console.log("Añadir al carrito:", product.name);
    };

    return (
        <Row xs={1} md={2} lg={4} className="g-4 mt-3">
            {perfumes.map(perfume => (
                <Col key={perfume.id}>
                    {/* 3. Pasar el objeto completo al Card */}
                    <PerfumeCard
                        product={perfume}
                        // Enlazar handleAdd para que la tarjeta lo llame al hacer click
                        onAdd={() => handleAdd(perfume)}
                    />
                </Col>
            ))}
        </Row>
    );
}