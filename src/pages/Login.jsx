import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Login.css'; // Importamos los estilos nuevos

function Login() {
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const username = (data.get('username') || '').trim();
        const password = (data.get('password') || '').trim();

        const errs = [];
        if (!username) errs.push('El usuario es obligatorio');
        if (!password) errs.push('La contraseña es obligatoria');

        if (errs.length > 0) {
            setErrors(errs);
            setMsg('');
            return;
        }

        try {
            setLoading(true);
            setErrors([]);
            await login(username, password);
            setMsg('¡Bienvenido de nuevo!');

            setTimeout(() => {
                navigate('/');
            }, 800);
        } catch (error) {
            setErrors(['Credenciales incorrectas. Inténtalo de nuevo.']);
            setMsg('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Card className="login-card shadow-lg">
                    <Card.Body className="p-5">

                        {/* Cabecera */}
                        <div className="text-center mb-4">
                            <h2 className="login-title">INICIAR SESIÓN</h2>
                            <p className="login-subtitle">Accede a tu cuenta en Perfulandia</p>
                        </div>

                        {/* Mensajes de Alerta */}
                        {msg && <Alert variant="success" className="text-center animate__animated animate__fadeIn">{msg}</Alert>}
                        {errors.length > 0 && <Alert variant="danger" className="text-center animate__animated animate__shakeX">{errors.join('. ')}</Alert>}

                        <Form onSubmit={onSubmit} noValidate>
                            <Form.Group className="mb-4" controlId="username">
                                <Form.Label className="form-label-custom">USUARIO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    required
                                    className="form-control-custom"
                                    placeholder="Ingresa tu usuario"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label className="form-label-custom">CONTRASEÑA</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    required
                                    className="form-control-custom"
                                    placeholder="••••••••"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                className="btn-login w-100 mt-2"
                                disabled={loading}
                            >
                                {loading ? 'ACCEDIENDO...' : 'ENTRAR'}
                            </Button>
                        </Form>

                        {/* Pie de la tarjeta */}
                        <div className="text-center mt-4 login-footer">
                            <p className="mb-1">¿No tienes cuenta?</p>
                            <Link to="/register" className="register-link">
                                Regístrate aquí
                            </Link>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Login;