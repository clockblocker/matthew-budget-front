import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative } from 'swiper';

type PeriodHeaderProps = {
  title: string;
};

const SlideContent = ({ title }: PeriodHeaderProps) => {
  return (
    <div className="w-full flex align-middle justify-center bg-cyan-600">
      {title}
    </div>
  );
};

export function PeriodHeader({ title }: PeriodHeaderProps) {
  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper"
      >
        {[1, 2, 3].map((n) => (
          <SwiperSlide>
            <SlideContent title={`Slide ${n}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
