"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DragSlider() {
  const images = [
    "/Slide1-removebg-preview.png",
    "/Slide2-removebg-preview.png",
    "/Slide3-removebg-preview.png",
    "/Slide5-removebg-preview.png",
    "/Slide6-removebg-preview.png",
    "/Slide7-removebg-preview.png",
    "/Slide8-removebg-preview.png",
    "/Slide9-removebg-preview.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // хүсвэл сум гаргаж болно
    draggable: true, // **mouse drag идэвхжүүлсэн**
    swipe: true, // **touch swipe идэвхжүүлсэн**
    autoplay: false, // **autoplay-ийг унтраасан**
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
