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
	
	const { name, brand, price, category, imageUrl, description, specs } = perfume;
	
	return (
		<main>
			<Container className="py-4">
				<br />			
				<Row>
					<Col md={5} className="mb-3">
						<Card className="shadow-sm">
							{imageUrl && (
								<Card.Img
								variant="top"
								src={imageUrl}
								alt={name}
								style={{ objectFit: 'cover', height: 700 }}
								/>
							)}
						</Card>
					</Col>
					
					<Col md={7}>
						<h2 className="mb-2">{name}</h2>
						
						<h4 className="mb-3">CLP {Number(price).toLocaleString('es-CL')}</h4>

						<Button variant="warning" onClick={() => addToCart(perfume)}>
							AGREGAR
						</Button>
						<br />
						<br />
						<br />

						<p>{description}</p>
						<br />
						
						<div className="mb-4">
							<h5 className="mb-2">DESCRIPCIÓN</h5>
							<ul className="mb-0">
								{specs && Object.entries(specs).map(([key, value]) => (
									<li key={key} list-style>
										<strong>{key}:</strong> {value}
									</li>
								))}
							</ul>
						</div>
						
						
					</Col>
				</Row>
			</Container>
		</main>
	);
}
