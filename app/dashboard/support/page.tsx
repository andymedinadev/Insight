'use client';

import React, { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import Terms from '@/app/dashboard/support/Terms';

export default function Soporte() {
  const preguntas: { pregunta: string; respuesta: string }[] = [
    {
      pregunta: '¿Cómo puedo recuperar mi contraseña?',
      respuesta:
        "Para recuperar tu contraseña, haz clic en 'Olvidé mi contraseña' en la página de inicio de sesión y sigue los pasos indicados.",
    },
    {
      pregunta: '¿Cómo puedo actualizar mi información de perfil?',
      respuesta: "Puedes actualizar tu perfil desde la sección de 'Configuración' en tu cuenta.",
    },
    {
      pregunta: '¿Dónde puedo encontrar los términos y condiciones?',
      respuesta:
        'Los términos y condiciones se encuentran en el pie de página de nuestro sitio web, o puedes consultarlos directamente aquí en esta sección.',
    },
    {
      pregunta: '¿Cómo contactarme con soporte?',
      respuesta:
        'Para contactar con soporte, puedes escribirnos a soporte@insightapp.com o utilizar nuestro chat en vivo disponible en la plataforma.',
    },
    {
      pregunta: '¿Qué hacer si encuentro un error en la plataforma?',
      respuesta:
        'Si encuentras un error, por favor, comunícalo a través de nuestro formulario de soporte o por email a soporte@insightapp.com.',
    },
  ];

  const [activa, setActiva] = useState<number | null>(null);

  const togglePregunta = (index: number): void => {
    setActiva(activa === index ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="w-full pr-6 pl-[52px]">
        {/* TÍTULO alineado más a la izquierda */}
        <div className="mb-6">
          <p className="mb-1 text-sm text-gray-500">Dashboard / Soporte</p>
          <h2 className="text-2xl font-bold">Soporte</h2>
        </div>

        {/* CONTENIDO (con indentado) */}
        <div className="mb-8 pl-8">
          <h3 className="mb-2 text-xl font-bold">¿Necesitas ayuda? Contáctanos</h3>
          <p className="text-sm text-black">
            📧 <strong>soporte@insightapp.com</strong>
            {'\n'}
            Horario de atención: Lunes a Viernes 8 a 18 h<br />
            {'\n'}
            No brindamos atención psicológica por este medio. Para urgencias, comunícate con líneas
            de asistencia profesional.
          </p>
        </div>

        <h3 className="mb-3 pl-8 text-xl font-bold">Preguntas Frecuentes</h3>

        {/* Actualización de contenedor de preguntas con líneas que abarcan todo el ancho */}
        <div className="mb-6 border-t border-b border-stone-300">
          {preguntas.map((item, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => togglePregunta(index)}
                className="flex w-full items-start justify-between gap-2 border-b border-stone-300 bg-transparent px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-black">{item.pregunta}</span>
                <div className="pr-6">
                  <TiArrowSortedDown
                    className={`mt-1 transform transition-transform duration-200 ${activa === index ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </div>
              </button>
              {activa === index && (
                <div className="w-full bg-transparent px-6 py-2 text-sm text-black">
                  {item.respuesta}
                </div>
              )}
            </div>
          ))}
        </div>

        <Terms />
      </main>
    </div>
  );
}
