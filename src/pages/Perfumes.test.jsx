import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PERFUMES_LIST } from '../data/perfume.mock';
import Perfumes from './Perfumes';

jest.mock('../context/CartContext', () => ({
    useCart: () => ({
        addToCart: jest.fn()
    }),
}));

jest.mock('../components/perfumes/PerfumeGrid', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: ({ items = [] }) => React.createElement('div', { 'data-testid': 'perfume-grid', 'data-count': String(items.length) }),
    };
});

describe('Componente Perfumes', () => {

    test('se monta correctamente y muestra el título', () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/perfulandia/i)).toBeInTheDocument();
    });

    test('muestra el subtítulo "Variedad de perfumes"', () => {
        render(
            <MemoryRouter>
                <Perfumes />
            </MemoryRouter>
        );
        expect(screen.getByText(/variedad de perfumes/i)).toBeInTheDocument();
    });

    test('por defecto (sin parámetro) renderiza el grid con todos los perfumes', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Perfumes />
            </MemoryRouter>
        );
        const grid = screen.getByTestId('perfume-grid');
        expect(grid).toBeInTheDocument();
        expect(grid.dataset.count).toBe(String(PERFUMES_LIST.length));
    });

    test('filtra perfumes según el parámetro "cat"', () => {
        const category = PERFUMES_LIST[0].category;
        const expectedCount = PERFUMES_LIST.filter(p => p.category === category).length;

        render(
            <MemoryRouter initialEntries={[`/?cat=${encodeURIComponent(category)}`]}>
                <Perfumes />
            </MemoryRouter>
        );

        const grid = screen.getByTestId('perfume-grid');
        expect(grid.dataset.count).toBe(String(expectedCount));
    });

    test('parámetro "cat" desconocido produce lista vacía', () => {
        render(
            <MemoryRouter initialEntries={['/?cat=nonexistent-category']}>
                <Perfumes />
            </MemoryRouter>
        );
        const grid = screen.getByTestId('perfume-grid');
        expect(grid.dataset.count).toBe('0');
    });

});