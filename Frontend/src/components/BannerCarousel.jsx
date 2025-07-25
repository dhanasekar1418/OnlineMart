import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic from '../assets/Ban2.jpg';

const BannerCarousel = () => {
  const banners = [
    'https://m.media-amazon.com/images/G/31/img24/Laptops_2025/ELP-Intel-1500x300._CB791831106_.gif',
    'https://www.sonatawatches.in/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw7a6847b1/images/Category%20Banners/Trending-PLP-Collection.jpg',
    'https://i.pinimg.com/736x/f0/27/c1/f027c19f65c5f05257a1ed0bb962c6a4.jpg',
    'https://www.sonatawatches.in/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw1452b017/images/Category%20Banners/SF-PLP-Function.jpg',
  ];

  return (
    <div className="my-4">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {banners.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="rounded-xl w-full h-[300px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
