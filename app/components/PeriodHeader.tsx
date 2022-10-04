import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCurrentPeriod } from '../providers/currentPeriodAtom';

import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative } from 'swiper';
import { rotatePeriod, monthLabelFromPeriod } from '../dateUtils';

type SlideContentProps = {
  title: string;
};

const SlideContent = ({ title }: SlideContentProps) => {
  return (
    <div className="w-full flex align-middle justify-center bg-cyan-600">
      {title}
    </div>
  );
};

const creativeEffect = {
  prev: {
    shadow: true,
    translate: [0, 0, -400],
  },
  next: {
    translate: ['100%', 0, 0],
  },
};

export function PeriodHeader() {
  const { currentPertiod, setCurrentPertiod } = useCurrentPeriod();
  const slidesContent = [1, 2, 3];
  const initialIndex = slidesContent.length - 1;

  return (
    <>
      <Swiper
        initialSlide={initialIndex}
        grabCursor={true}
        effect={'creative'}
        onSlideChange={({ previousIndex, activeIndex }) => {
          setCurrentPertiod((p) =>
            rotatePeriod(p, activeIndex - previousIndex)
          );
        }}
        creativeEffect={creativeEffect}
        modules={[EffectCreative]}
        className="mySwiper"
      >
        {slidesContent.map((n) => (
          <SwiperSlide>
            <SlideContent
              title={monthLabelFromPeriod(
                rotatePeriod(currentPertiod, n - initialIndex)
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
