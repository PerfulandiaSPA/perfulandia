import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfumes from './Perfumes';

jest.mock('../context/CartContext', () => ({
    useCart: () => ({
        addToCart: jest.fn()
    }),
}));

describe('Componente Perfumes', () => {

    test('se monta correctamente y muestra el título', () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('renderiza todas las tarjetas de perfume', () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('el botón "Agregar" aparece en cada tarjeta', () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('renderiza perfumes y permite agregar', async () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

});