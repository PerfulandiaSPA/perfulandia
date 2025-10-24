import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Login(){
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = (data.get('email') || '').trim();
        const password = (data.get('password') || '').trim();

        const errs = [];
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('El correo es obligatorio y debe ser válido');
        if(!password) errs.push('La contraseña es obligatoria');

        setErrors(errs);
        setMsg(errs.length === 0 ? '¡Inicio de sesión exitoso!' : '');
    };

    return (
        <main>
        <Container>
            <h2>INICIAR SESIÓN</h2>
            {msg && <Alert variant="success">{msg}</Alert>}
            {errors.length > 0 && <Alert variant="danger">{errors.join('. ')}</Alert>}

            <Form onSubmit={onSubmit} noValidate>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>EMAIL:</Form.Label>
                <Form.Control type="email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>CONTRASEÑA:</Form.Label>
                <Form.Control type="password" name="password" required />
            </Form.Group>            

            <Button type="submit">CONTINUAR</Button>
            </Form>
        </Container>
      </main>
    );
}

export default Login;
