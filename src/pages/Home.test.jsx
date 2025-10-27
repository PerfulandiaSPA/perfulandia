import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

// Simula (mock) el componente del carrusel para que las pruebas se enfoquen en el diseño de Home
jest.mock('../components/home/Carousel', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-carousel">Carousel simulado</div>,
}));

describe('Componente Home', () => {
    test('Renderiza el componente de carousel', () => {
        render(<Home />);
        expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
    });

    test('está envuelto en un contenedor de Bootstrap (tiene la clase .container', () => {
        const { container } = render(<Home />);
        expect(container.querySelector('.container')).toBeInTheDocument();
    });
});