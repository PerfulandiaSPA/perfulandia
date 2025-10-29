import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { PERFUMES_LIST } from '../data/perfume.mock';
import { useCart } from '../context/CartContext';

export default function PerfumeDetail() {
	// 1) Hooks SIEMPRE al tope, sin condiciones
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const perfume = useMemo(
		() => PERFUMES_LIST.find(p => String(p.id) === String(id)),
		[id]
	);

	// Este useState debe ir ANTES de cualquier return condicional
	const [qty, setQty] = useState(1);

	// 2) Recién ahora puedes condicionar el return
	if (!perfume) {
		return (
			<Container className="py-5">
				<p className="mb-4">Perfume no encontrado.</p>
				<Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
			</Container>
		);
	}

	const { name, price, imageUrl, description, specs } = perfume;

	const handleQtyChange = (e) => {
		const value = Math.max(1, Number(e.target.value) || 1);
		setQty(value);
	};

	const handleAddToCart = () => {
		// si quieres respetar la cantidad elegida, pasa qty en el producto
		addToCart({ ...perfume, qty });
	};

	return (
		<main>
			<Container className="py-4">
				<Row>
					<Col md={5} className="mb-3">
						<Card className="shadow-sm">
							{imageUrl && (
								<Card.Img variant="top" src={imageUrl} alt={name} style={{ objectFit: 'cover', height: 700 }} />
							)}
						</Card>
					</Col>

					<Col md={7}>
						<h2 className="mb-2">{name}</h2>
						<h4 className="mb-3">CLP {Number(price).toLocaleString('es-CL')}</h4>

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
							<p>{description}</p>
							<h5 className="mb-2">DESCRIPCIÓN</h5>
							<ul className="mb-0">
								{specs && Object.entries(specs).map(([k, v]) => (
									<li key={k}><strong>{k}:</strong> {v}</li>
								))}
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</main>
	);
}
