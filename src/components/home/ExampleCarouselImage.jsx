function ExampleCarouselImage({ text }) {
  return (
    <img
      className="d-block w-100"
      src="/resources/images/carousel.png"  
      alt={text}
      style={{ height: '420px', objectFit: 'cover' }} 
    />
  );
}

export default ExampleCarouselImage;
