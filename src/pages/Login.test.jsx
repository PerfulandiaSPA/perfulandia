import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Login';

describe('Login Component', () => {
    
    test('el componente Login se monta correctamente', () => {
        render(<Contact />);

        // Comprueba que el título esté en el documento
        const titulo = screen.getByRole('heading', { name: /login/i });
        expect(titulo).toBeInTheDocument();

        // Comprueba que existan los elementos principales del formulario
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/´password/i)).toBeInTheDocument();

        // Y que el botón de enviar esté presente
        expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
    });

    test('muestra errores cuando email y/o password están incorrectos/vacíos', async () => {
        render(<Contact />);

        // Click en "Continuar" sin rellenar nada
        const continuarBtn = screen.getByRole('button', { name: /continuar/i });
        await userEvent.click(continuarBtn);

        expect(screen.getByText(/El correo es inválido/i)).toBeInTheDocument();
        expect(screen.getByText(/Contraseña incorrecta/i)).toBeInTheDocument();
    });
    
    test('envío válido muestra mensaje de éxito', async () => {
        render(<Contact />);

        await userEvent.type(screen.getByLabelText(/correo/i), 'ada@example.com');
        await userEvent.type(screen.getByLabelText(/password/i), '');
        await userEvent.type(screen.getByLabelText(/mensaje/i), '');

        await userEvent.click(screen.getByRole('button', { name: /cotinuar/i }));

        expect(screen.getByText(/¡Mensaje enviado/i)).toBeInTheDocument();
    });
});