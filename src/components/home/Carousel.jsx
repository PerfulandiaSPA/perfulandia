import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import './Carousel.css'; // 👈 asegúrate que coincida con el nombre real del CSS

export default function IndividualIntervalsExample() {
  const carouselRef = useRef(null);
  const [height, setHeight] = useState(window.innerHeight * 0.9); // 90% del alto real

  // 🔧 Recalcula la altura al hacer zoom o cambiar tamaño
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight * 0.9);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // 👇 el contenedor full-bleed mantiene el ancho completo
    <div className="full-bleed" ref={carouselRef}>
      <Carousel
        interval={5000}
        pause="hover"
        fade
        style={{ height }} // 👈 altura dinámica en píxeles reales
      >
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h3></h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" />
          <Carousel.Caption>
            <h3></h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" />
          <Carousel.Caption>
            <h3></h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}


