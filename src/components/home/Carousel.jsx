import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './CarouselImage';
import './Carousel.css'; 

export default function IndividualIntervalsExample() {
  return (
    <div className="carousel-hero">
      <Carousel interval={4000} pause="hover" touch keyboard>
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




