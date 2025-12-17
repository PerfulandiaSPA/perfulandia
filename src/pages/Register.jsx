import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authService';
import '../register.css'; // Asegúrate que el nombre coincide (mayus/minus)

// Ruta a tu video en la carpeta public
const videoUrl = '/resources/videos/7815883-hd_1080_1920_25fps.mp4';

export default function Register() {
    const navigate = useNavigate();

    // 1. Agregamos 'email' al estado inicial
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (form.password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres.');
            return;
        }

        try {
            setLoading(true);
            // 2. Pasamos el email a la función
            await register(form.userName, form.email, form.password);

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error(err);
            const msg = err.response?.data || 'Error al registrar usuario.';
            // Manejo seguro del mensaje de error (por si es un objeto)
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <Container fluid className="p-0 h-100">
                <Row className="g-0 h-100">

                    {/* --- COLUMNA IZQUIERDA: VIDEO --- */}
                    <Col lg={6} className="d-none d-lg-block p-0 overflow-hidden">
                        <div className="register-video-container">
                            <video autoPlay loop muted playsInline className="video-bg">
                                <source src={videoUrl} type="video/mp4" />
                                Tu navegador no soporta videos HTML5.
                            </video>
                            <div className="video-overlay-dark"></div>
                            <div className="brand-overlay text-white animate__animated animate__fadeInLeft">
                                <h1 className="display-4 font-playfair">Essence</h1>
                                <p className="lead font-light">Únete a nuestras exquisitas fragancias</p>
                            </div>
                        </div>
                    </Col>

                    {/* --- COLUMNA DERECHA: FORMULARIO --- */}
                    <Col lg={6} className="d-flex align-items-center justify-content-center bg-white">
                        <div className="register-form-container animate__animated animate__fadeInRight">
                            <div className="text-center mb-5">
                                <h2 className="font-playfair fw-bold mb-2">Crear Cuenta</h2>
                                <p className="text-muted">Ingresa tus datos para comenzar</p>
                            </div>

                            {error && <Alert variant="danger" className="text-center border-0 bg-danger-subtle text-danger">{error}</Alert>}

                            {success && (
                                <Alert variant="success" className="text-center border-0 bg-success-subtle text-success">
                                    ¡Cuenta creada con éxito! Redirigiendo...
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                {/* CAMPO USUARIO */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-uppercase fw-bold text-secondary">Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userName"
                                        placeholder="Elige tu nombre de usuario"
                                        className="custom-auth-input"
                                        value={form.userName}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                    />
                                </Form.Group>

                                {/* 3. CAMPO EMAIL (NUEVO) */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-uppercase fw-bold text-secondary">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="nombre@ejemplo.com"
                                        className="custom-auth-input"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                </Form.Group>

                                {/* CAMPO PASSWORD */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-uppercase fw-bold text-secondary">Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="custom-auth-input"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* CAMPO CONFIRMAR PASSWORD */}
                                <Form.Group className="mb-5">
                                    <Form.Label className="small text-uppercase fw-bold text-secondary">Confirmar Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        className="custom-auth-input"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn-auth-gold" disabled={loading || success}>
                                        {loading ? <Spinner animation="border" size="sm" /> : 'REGISTRARME'}
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <span className="text-muted me-2">¿Ya tienes cuenta?</span>
                                <Link to="/login" className="auth-link fw-bold">Iniciar Sesión</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}