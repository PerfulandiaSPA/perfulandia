import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getPerfumeById } from '../api/perfumeService';
import { useCart } from '../context/CartContext';

import PerfumeReviews from '../components/review/PerfumeReviews';
export default function PerfumeDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const [perfume, setPerfume] = useState(null);
	const [loading, setLoading] = useState(true);
	const [qty, setQty] = useState(1);

	useEffect(() => {
		if (id) {
			getPerfumeById(id)
				.then(setPerfume)
				.catch(err => console.error('Error cargando perfume:', err))
				.finally(() => setLoading(false));
		}
	}, [id]);

	if (loading) {
		return <Container className="py-5 text-center"><h3>Cargando producto...</h3></Container>;
	}

	if (!perfume) {
		return (
			<Container className="py-5 text-center">
				<p className="mb-4">Perfume no encontrado.</p>
				<Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
			</Container>
		);
	}

	const {
		idPerfume,
		productName = 'Sin nombre',
		price,
		image,
		descPerfume = 'Sin descripción',
		size = 'N/A',
		stock = 0
	} = perfume;

	const handleQtyChange = (e) => {
		const value = Math.max(1, Number(e.target.value) || 1);
		setQty(value);
	};

	const handleAddToCart = () => {
		addToCart({ ...perfume, qty });
	};

	const priceNum = Number(price);
	const priceFormatted = isNaN(priceNum) ? '---' : priceNum.toLocaleString('es-CL');

	return (
		<main>
			<Container className="py-5">
				{/* SECCIÓN SUPERIOR: DETALLE DEL PRODUCTO */}
				<Row className="mb-5">
					{/* Columna Imagen */}
					<Col md={6} lg={5} className="mb-4">
						<Card className="shadow-lg border-0 overflow-hidden">
							{image ? (
								<Card.Img
									variant="top"
									src={image}
									alt={productName}
									style={{ objectfit: 'contain', height: '500px', width: '100%' }}
								/>
							) : (
								<div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '500px' }}>
									<span className="text-muted">Sin Imagen</span>
								</div>
							)}
						</Card>
					</Col>

					{/* Columna Información */}
					<Col md={6} lg={7}>
						<div className="ps-md-4">
							<h1 className="display-5 fw-bold mb-2">{productName}</h1>
							<h3 className="text-primary fw-bold mb-4">$ {priceFormatted} CLP</h3>

							<p className="lead mb-4">{descPerfume}</p>

							<div className="mb-4 p-3 bg-light rounded">
								<ul className="list-unstyled mb-0">
									<li className="mb-2"><strong>Tamaño:</strong> {size}</li>
									<li>
										<strong>Stock disponible:</strong>{' '}
										<span className={stock > 0 ? "text-success" : "text-danger"}>
											{stock > 0 ? stock : "Agotado"}
										</span>
									</li>
								</ul>
							</div>

							{/* Controles de Compra */}
							<div className="d-flex align-items-center gap-3 mb-4">
								<input
									type="number"
									className="form-control text-center"
									style={{ width: '80px', height: '50px', fontSize: '1.2rem' }}
									min="1"
									max={stock}
									value={qty}
									onChange={handleQtyChange}
									disabled={stock <= 0}
								/>

								<Button
									variant="dark"
									size="lg"
									onClick={handleAddToCart}
									disabled={stock <= 0}
									className="px-4"
									style={{ height: '50px' }}
								>
									{stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
								</Button>
							</div>
						</div>
					</Col>
				</Row>

				<hr className="my-5" />

				{/* SECCIÓN INFERIOR: RESEÑAS Y COMENTARIOS */}
				<Row>
					<Col>
						{/* Aquí insertamos el componente de reviews pasándole el ID correcto */}
						<PerfumeReviews perfumeId={idPerfume} />
					</Col>
				</Row>
			</Container>
		</main>
	);
}