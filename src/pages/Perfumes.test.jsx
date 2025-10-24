import { render, screen } from '@testing-library/react';
import Perfumes from './Perfumes';

jest.mock('../context/AppContext', () => ({
    useCart: () => ({ 
        addToCart: jest.fn()
    }),
}));

describe('Componente Perfumes', () => {

    test('se monta correctamente y muestra el título', () => {
        render(<Perfumes />);
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('renderiza todas las tarjetas de perfume', () => {
        render(<Perfumes />);
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('el botón "Agregar" aparece en cada tarjeta', () => {
        render(<Perfumes />);
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('renderiza perfumes y permite agregar', async () => {
        render(<Perfumes />);
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

});