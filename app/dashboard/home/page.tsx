'use client';

import React from 'react';
import { ButtonCards, CompletedList } from '@/components';
import { cardData } from '@/utils';

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-white lg:flex lg:items-start">
      <div className="ml-5 lg:ml-10 lg:items-start">
        <h1 className="mt-8 mb-5 text-xl font-bold text-black lg:mt-10 lg:mb-2.5 lg:text-3xl lg:font-semibold">
          Hola, Maria
        </h1>
        <p className="mb-9 text-base font-normal text-black lg:mb-10">
          Bienvenida, aquí encontrarás tu lista de pacientes, y mucho más!
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-4 lg:mb-16 lg:flex-row lg:justify-center lg:gap-32">
        {cardData.map((card, i) => (
          <ButtonCards
            key={i}
            href={card.href}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className="ml-5 lg:hidden">
        <h1 className="mt-12 mb-9 text-lg font-semibold text-black">Próximos pacientes</h1>
        <p className="mb-8 text-base font-normal text-black">
          Aquí se visualizan los pacientes agendados del día x
        </p>
      </div>
      <hr className="hidden lg:mb-10 lg:block lg:w-full lg:border-t lg:border-black" />

      <div className="lg:w-full">
        <CompletedList variant="home" />
      </div>
    </div>
  );
}
