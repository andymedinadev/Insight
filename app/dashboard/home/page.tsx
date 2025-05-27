'use client';
import { ButtonCards, CompletedList } from '@/components';
import { cardData } from '@/utils';
import { UserNamePsicologo } from '@/components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/slices/userSlice';
import React, { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser()); // ✅ esto ahora funciona bien
  }, [dispatch]);
  return (
    <div className="flex h-screen w-full flex-col items-center bg-white lg:flex lg:items-start">
      <div className="lg:ml-10 lg:items-start">
        <h1 className="mt-1.5 mb-1.5 flex flex-row text-3xl leading-10 font-semibold text-black lg:mt-10 lg:mb-2.5 lg:text-3xl lg:leading-[48px] lg:font-semibold">
          <p className="mr-2">Hola</p>
          <UserNamePsicologo />
        </h1>
        <p className="mb-5 block text-sm leading-normal font-normal text-black lg:mb-10 lg:hidden lg:text-base">
          Bienvenida, aquí encontrarás tu lista de pacientes, y <br /> mucho más!
        </p>
        <p className="mb-5 hidden text-sm leading-normal font-normal text-black lg:mb-10 lg:block lg:text-base">
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
      <div className="ml-[-2rem] lg:hidden">
        <h1 className="mt-6 mb-1.5 text-3xl leading-10 font-semibold text-black">
          Próximos pacientes
        </h1>
        <p className="mb-2 text-sm leading-normal font-normal text-black">
          Aquí visualizaras los pacientes del dia de hoy
        </p>
      </div>

      <div className="lg:w-full">
        <CompletedList variant="home" />
      </div>
    </div>
  );
}
