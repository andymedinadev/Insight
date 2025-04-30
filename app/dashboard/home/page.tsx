import { ButtonCards, CompletedList } from '@/components';
import { cardData } from '@/utils';

import React from 'react';

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-white">
      <div className="ml-5">
        <h1 className="mt-8 mb-5 text-xl font-bold text-black">Hola, Maria</h1>
        <p className="mb-9 text-base font-normal text-black">
          Bienvenida, aquí encontrarás tu lista de pacientes, y mucho más!
        </p>
      </div>
      <div className="flex flex-col gap-4 lg:mb-16">
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
      <div>
        <CompletedList />
      </div>
    </div>
  );
}
