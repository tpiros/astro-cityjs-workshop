import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import destinations from '../data/destinations.json';

import 'swiper/css';
function Gallery() {
  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
        <div className="flex flex-col items-center sm:items-stretch sm:flex-row justify-between">
          <h2 className="text-4xl sm:text-5xl font-black tracking-wide text-center">
            Popular Destinations
          </h2>
          <div className="flex items-center">
            <button
              id="prev"
              className="px-8 py-3 font-bold rounded bg-blue-500 text-gray-100 hover:bg-blue-700 hover:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2"
            >
              &lt;
            </button>
            <button
              id="next"
              className="px-8 py-3 font-bold rounded bg-blue-500 text-gray-100 hover:bg-blue-700 hover:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2"
            >
              &gt;
            </button>
          </div>
        </div>
        <Swiper
          className="flex h-auto justify-center mb-1 mt-16"
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          navigation={{
            nextEl: '#next',
            prevEl: '#prev',
          }}
        >
          {destinations.map((destination, index) => {
            const imageSrc = `https://res.cloudinary.com/tamas-demo/image/upload/f_auto,q_auto,w_295/${destination.publicId}`;
            return (
              <SwiperSlide
                className="h-full flex! flex-col sm:border max-w-sm rounded rounded-l relative focus:outline-none"
                key={index}
              >
                <img
                  src={imageSrc}
                  loading="lazy"
                  className="w-full h-56 sm:h-64 bg-cover bg-center rounded-l"
                />
                <div className="py-6 sm:px-10 sm:py-6">
                  <h2 className="text-xl font-bold leading-loose mt-2 sm:mt-4">
                    {destination.country}
                  </h2>
                  <p className="text-sm leading-loose mt-2 sm:mt-4">
                    {destination.description}
                  </p>
                </div>
                <a
                  href={`/destinations/${destination.country.toLowerCase()}`}
                  className="inline-block hover:cursor-pointer text-center font-bold bg-blue-500 text-gray-100 hover:bg-blue-700 hover:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-auto sm:text-lg w-full rounded-l sm:rounded-br-4xl py-3 sm:py-6"
                >
                  Explore
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Gallery;
