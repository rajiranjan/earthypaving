import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css"

const ImageURL = [
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650524/turf7_la65ci.jpg',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650524/cropt_a6bzyb.jpg',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650524/9542dedefbbaca314577e537fc448a3e_mhmezz.jpg',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650523/ATS_Modern_Artificial_Grass_yard_xwgyow.jpg',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685651115/7_x5mvwz.png',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650523/dd9dac0a7944147d89446511d76a791d_lan3rv.jpg',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685651120/10_y46wm3.png',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685651118/13_rsmvgv.png',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685651116/12_s006gz.png',
  'https://res.cloudinary.com/dejwpag1r/image/upload/v1685650523/istockphoto-845130540-612x612_pehjoj.jpg'
];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshow, setSlideshow] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [left, setLeft] = useState(0);

  const slideTransition = (slider) => {
    if (currentIndex === 9) {
      setLeft(0);
      slider.style.left = `${left}px`;
    } else {
      const newLeft = left - 60;
      setLeft(newLeft);
      slider.style.left = `${newLeft}px`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideshow === true) {
        const slider = document.getElementById('slider-img-container');
        const index = currentIndex === 9 ? 0 : currentIndex + 1;

        slideTransition(slider);

        setCurrentIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [slideshow, currentIndex]);

  const slideshowHandler = () => {
    setSlideshow((prevState) => !prevState);
  };

  const exitFullScreen = () => {
    const i = document.getElementsByClassName('gallery-img-container ')[0];
    i.getElementsByClassName('gallery-img')[0].style.height = '300px';
    i.getElementsByClassName('gallery-img')[0].style.width = '100%';
    setFullscreen((prevState) => !prevState);
  };

  const enterFullScreen = () => {
    const i = document.getElementsByClassName('gallery-img-container ')[0];

    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    }

    i.getElementsByClassName('gallery-img')[0].style.height = '100%';
    i.getElementsByClassName('gallery-img')[0].style.width = '100%';

    setFullscreen((prevState) => !prevState);
  };

  const dotHandler = (event) => {
    const imgIndex = event.target.id;
    const slider = document.getElementById('slider-img-container');
    const newLeft = parseInt(imgIndex) * -60;
    setLeft(newLeft);
    slider.style.left = `${newLeft}px`;
    setCurrentIndex(parseInt(imgIndex));
  };

  const updateImage = (event) => {
    const imgIndex = event.target.id;
    const slider = document.getElementById('slider-img-container');
    const newLeft = parseInt(imgIndex) * -60;
    setLeft(newLeft);
    slider.style.left = `${newLeft}px`;
    setCurrentIndex(parseInt(imgIndex));
  };

  const prevHandler = () => {
    const slider = document.getElementById('slider-img-container');
    const index = currentIndex === 0 ? 9 : currentIndex - 1;

    slideTransition(slider);

    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 9 : prevIndex - 1));
  };

  const nextHandler = () => {
    const slider = document.getElementById('slider-img-container');
    const index = currentIndex === 9 ? 0 : currentIndex + 1;

    slideTransition(slider);

    setCurrentIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
  };

  const i = currentIndex;
  const dotNumbers = Array.from(Array(ImageURL.length).keys());
  const carouselDots = dotNumbers.map((n, index) => (
    
    <div 
      className={[
        'carousel-dot',
        index === currentIndex ? 'active' : ''
      ].join(' ')}
      key={n}
      id={n}
      onClick={dotHandler}
    >
      &#9679;
    </div>
  ));

  const ImgItem = (
    <div className="gallery-img-container" >
      <img className="gallery-img" src={ImageURL[i]} />
      <button className="prev-carousel-button" onClick={prevHandler}>
        &#9664;
      </button>
      <div id="carousel-dot-container">{carouselDots}</div>
      <div className="next-carousel-button" onClick={nextHandler}>
        &#9654;
      </div>
      {slideshow === false ? (
        <button className="slideshow-button" onClick={slideshowHandler}>
          &#9654;
        </button>
      ) : (
        <button className="slideshow-button" onClick={slideshowHandler}>
          &#9646;&#9646;
        </button>
      )}
      {fullscreen === false ? (
        <button className="fullscreen-button" onClick={enterFullScreen}>
          &#9635;
        </button>
      ) : (
        <button className="fullscreen-button" onClick={exitFullScreen}>
          &#9635;
        </button>
      )}
    </div>
  );

  let imgId = 0;

  const sliderImages = ImageURL.slice(0, 10).map((n, index) => (
    <img
      className={[
        'slider-img',
        index === currentIndex ? 'active' : ''
      ].join(' ')}
      src={n}
      key={n}
      id={imgId++}
      onClick={updateImage}
    />
  ));

  return (
    <div id="gallery-container">
      {ImgItem}
      <div id="slider-img-container">
        {sliderImages}
      </div>
    </div>
  );
};

export default ImageGallery;
