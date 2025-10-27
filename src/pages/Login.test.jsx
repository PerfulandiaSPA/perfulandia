import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Componente Login', () => {

    test('el componente Login se monta correctamente', () => {
        render(<Login />);

        // Comprueba que el título esté en el documento
        const titulo = screen.getByRole('heading', { name: /iniciar sesión/i });
        expect(titulo).toBeInTheDocument();

        // Comprueba que existan los elementos principales del formulario
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

        // Y que el botón continuar esté presente
        expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
    });

    test('muestra errores cuando email y/o password están incorrectos/vacíos', async () => {
        render(<Login />);

        // Click en "Continuar" sin rellenar nada
        const continuarBtn = screen.getByRole('button', { name: /continuar/i });
        await userEvent.click(continuarBtn);

        expect(screen.getByText(/el correo es obligatorio y debe ser válido/i)).toBeInTheDocument();
        expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
        expect(screen.queryByText(/inicio de sesión exitoso/i)).not.toBeInTheDocument();

    });

    test('al ingresar datos válidos y presionar continuar, muestra inicio de sesión exitoso', async () => {
        render(<Login />);

        await userEvent.type(screen.getByLabelText(/email/i), 'user@email.com');
        await userEvent.type(screen.getByLabelText(/contraseña/i), '1234');

        await userEvent.click(screen.getByRole('button', { name: /continuar/i }));

        expect(screen.getByText(/¡inicio de sesión exitoso!/i)).toBeInTheDocument();
    });
});
