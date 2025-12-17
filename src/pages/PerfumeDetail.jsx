import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { getPerfumeById } from '../api/perfumeService';
import { useCart } from '../context/CartContext';

export default function PerfumeDetail() {
	// 1) Hooks SIEMPRE al tope, sin condiciones
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [perfume, setPerfume] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			getPerfumeById(id)
				.then(setPerfume)
				.catch(err => console.error('Error:', err))
				.finally(() => setLoading(false));
		}
	}, [id]);

	// Este useState debe ir ANTES de cualquier return condicional
	const [qty, setQty] = useState(1);

	// 2) Recién ahora puedes condicionar el return
	if (loading) {
		return <Container className="py-5"><p>Cargando...</p></Container>;
	}

	if (!perfume) {
		return (
			<Container className="py-5">
				<p className="mb-4">Perfume no encontrado.</p>
				<Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
			</Container>
		);
	}

	const { productName = 'Sin nombre', price, image, descPerfume = 'Sin descripción', size = 'N/A', stock = 0 } = perfume;

	const handleQtyChange = (e) => {
		const value = Math.max(1, Number(e.target.value) || 1);
		setQty(value);
	};

	const handleAddToCart = () => {
		// si quieres respetar la cantidad elegida, pasa qty en el producto
		addToCart({ ...perfume, qty });
	};

	// Debug: asegurar que price es un número
	const priceNum = Number(price);
	const priceFormatted = isNaN(priceNum) ? 'Precio no disponible' : priceNum.toLocaleString('es-CL');

	return (
		<main>
			<Container className="py-4">
				<Row>
					<Col md={5} className="mb-3">
						<Card className="shadow-sm">
							{image && (
								<Card.Img variant="top" src={image} alt={productName} style={{ objectFit: 'cover', height: 700 }} />
							)}
						</Card>
					</Col>

					<Col md={7}>
						<h2 className="mb-2">{productName}</h2>
						<h4 className="mb-3">CLP ${priceFormatted}</h4>

						<input
							type="number"
							className="counter"
							min="1"
							value={qty}
							onChange={handleQtyChange}
							placeholder="Cantidad"
						/>

						<Button variant="warning" onClick={handleAddToCart}>AGREGAR</Button>

						<div className="mt-4">
							<p>{descPerfume}</p>
							<h5 className="mb-2">DESCRIPCIÓN</h5>
							<ul className="mb-0">
								<li><strong>Tamaño:</strong> {size}</li>
								<li><strong>Stock:</strong> {stock}</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</main>
	);
}
