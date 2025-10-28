// src/pages/CheckoutPage.jsx
import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
    const { totals, cart, clearCart } = useCart();

    const onSubmit = (e) => {
        e.preventDefault();
        // aqui integraremos el api de pagos
        alert('Pago simulado con éxito 🎉');
        clearCart();
    };

    return (
        <main className="container py-4">
            <Button variant="outline-secondary" as={Link} to="/cart">
                Volver
            </Button>
            <h3>Checkout</h3>
            <Row className="g-4 mt-1">
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <h5 className="mb-3">Datos de envío</h5>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Ciudad</Form.Label>
                                            <Form.Control required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                <h5 className="mb-3">Pago (maqueta)</h5>
                                <Row className="g-3">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>Número de tarjeta</Form.Label>
                                            <Form.Control placeholder="**** **** **** ****" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>MM/AA</Form.Label>
                                            <Form.Control placeholder="12/29" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control placeholder="123" required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid mt-4">
                                    <Button type="submit" variant="success">
                                        Pagar ${totals.total.toLocaleString()}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <h5>Resumen</h5>
                            <ul className="list-unstyled small">
                                {cart.map(p => (
                                    <li key={p.id} className="d-flex justify-content-between">
                                        <span>{p.name} × {p.qty}</span>
                                        <span>${(p.price * p.qty).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <strong>${totals.subtotal.toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Envío</span>
                                <strong>${totals.shipping.toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>IVA</span>
                                <strong>${totals.tax.toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between fs-5 mt-2">
                                <span>Total</span>
                                <strong>${totals.total.toLocaleString()}</strong>
                            </div>
                            <Alert variant="info" className="mt-3 mb-0">
                                * Esta es una maqueta de pago.
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}
