function ExampleCarouselImage({ text }) {
  // imagen por defecto = primer slide
  let imgSrc = '/resources/images/carousel_1.png';

  if (text === 'Second slide') {
    imgSrc = '/resources/images/carousel_2.png';
  } else if (text === 'Third slide') {
    imgSrc = '/resources/images/carousel_3.png';
  }

  return (
    <img
      className="d-block w-100"
      src={imgSrc}
      alt={text}
      style={{ height: '420px', objectFit: 'cover' }}
    />
  );
}

export default ExampleCarouselImage;
