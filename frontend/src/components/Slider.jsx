// src/components/Slider.jsx
import React from 'react';
import SlickSlider from 'react-slick';

// стили slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slider({ children }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <SlickSlider {...settings}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ padding: '0 10px' }}>
          {child}
        </div>
      ))}
    </SlickSlider>
  );
}
