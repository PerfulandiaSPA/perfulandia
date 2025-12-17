// src/pages/CartPage.jsx
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, updateQty, removeFromCart, totals } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <main className="container py-4">
                <h3>Tu carrito está vacío</h3>
                <p className="text-muted">Agrega productos desde la tienda.</p>
                <Button as={Link} to="/perfumes" variant="primary">Ir a la tienda</Button>
            </main>
        );
    }

    return (
        <main className="container py-4">
            <Row className="g-4">
                <Col lg={8}>
                    <h3 className="mb-3">Carrito</h3>
                    <Table responsive bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th style={{ width: 120 }}>Cantidad</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(p => (
                                <tr key={p.idPerfume}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            {p.image && <img src={p.image} alt={p.productName} width="60" height="60" style={{ objectFit: 'cover' }} />}
                                            <div>
                                                <div className="fw-semibold">{p.productName}</div>
                                                <small className="text-muted">{p.brand}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${p.price.toLocaleString()}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            min={1}
                                            value={p.qty}
                                            onChange={(e) => updateQty(p.idPerfume, e.target.value)}
                                        />
                                    </td>
                                    <td>${(p.price * p.qty).toLocaleString()}</td>
                                    <td>
                                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(p.idPerfume)}>
                                            Quitar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <h5>Resumen</h5>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <strong>${totals.subtotal.toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Envío</span>
                                <strong>${totals.shipping.toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>IVA (19%)</span>
                                <strong>${totals.tax.toLocaleString()}</strong>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fs-5">
                                <span>Total</span>
                                <strong>${totals.total.toLocaleString()}</strong>
                            </div>

                            <div className="d-grid mt-3">
                                <Button variant="primary" onClick={() => navigate('/checkout')}>
                                    Ir a pagar
                                </Button>
                            </div>
                            <div className="d-grid mt-2">
                                <Button variant="outline-secondary" as={Link} to="/perfumes">
                                    Seguir comprando
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}
