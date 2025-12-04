import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { login, isAdmin } = useAuth();
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
            setMsg('¡Inicio de sesión exitoso!');
            
            // Redirigir después de un pequeño delay para que se actualice el estado
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            setErrors([error.message || 'Error al iniciar sesión. Verifica tu usuario y contraseña']);
            setMsg('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Container>
                <h2>INICIAR SESIÓN</h2>
                {msg && <Alert variant="success">{msg}</Alert>}
                {errors.length > 0 && <Alert variant="danger">{errors.join('. ')}</Alert>}

                <Form onSubmit={onSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>USUARIO:</Form.Label>
                        <Form.Control type="text" name="username" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>CONTRASEÑA:</Form.Label>
                        <Form.Control type="password" name="password" required />
                    </Form.Group>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'CONTINUAR'}
                    </Button>
                </Form>
            </Container>
        </main>
    );
}

export default Login;
