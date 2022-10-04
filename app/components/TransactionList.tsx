import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCurrentPeriod } from '../providers/currentPeriodAtom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCards } from 'swiper';

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

export function TransactionList() {
  const { currentPertiod, setCurrentPertiod } = useCurrentPeriod();
  return <div></div>;
}
