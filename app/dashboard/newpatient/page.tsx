"use client"
import React, { useState } from 'react'
import Button from '@/components/ui/Button'

export default function NewPatient() {

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')

  const createPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log('Datos del formulario:', data)
  }

  return (
    <div>
      <h1 className='text-[26px] leading-[26px] font-semibold mb-8 mt-8 ml-10'>Formulario paciente nuevo</h1>

      <div className='p-8 max-w-xl mx-auto'>
        <form onSubmit={createPatient} className='flex flex-col gap-y-6'>
          {/* Datos personales */}
          <h2 className='text-[20px] leading-[28px] font-semibold'>Datos personales</h2>

          <p className='text-[14px] leading-[20px] font-normal text-gray-600'>*Datos requeridos</p>

          <div className='flex flex-col'>
            <label className='mb-1'>Nombre/s *</label>
            <input 
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Apellido/s *</label>
            <input 
              name='lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Edad *</label>
            <input 
              name='age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Fecha de nacimineto *</label>
            <span className="text-sm text-gray-500 mb-1">(dd/mm/yyyy)</span>
            <input 
              name='birthdate' 
              type='date'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-900 mb-2">Sexo *</label>
            <div className="flex flex-col gap-y-4">
              {["Femenino", "Masculino", "Otros"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-x-3 w-[118px] h-[32px] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={gender === option.toLowerCase()}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 accent-indigo-600 border border-[#000D4D73]"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Email *</label>
            <input 
              name='email' 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Numero de celular *</label>
            <input 
              name='phone' 
              type='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Fecha de ingreso *</label>
            <span className="text-sm text-gray-500 mb-1">(dd/mm/yyyy)</span>
            <input 
              name='date' 
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' 
            />
          </div>
          <br />

          {/* Motivo de consulta */}
          <h2 className='text-[20px] leading-[28px] font-semibold'>Motivo de consulta</h2>

          <div className='flex flex-col'>
            <label className='mb-1'>Motivo principal de consulta</label>
            <textarea name='reason' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Síntomas actuales</label>
            <textarea name='symptoms' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Eventos recientes relevantes</label>
            <textarea name='events' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Diagnóstico previo</label>
            <textarea name='diagnosis' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>
          <br />

          {/* Historia clínica */}
          <h2 className='text-[20px] leading-[28px] font-semibold'>Historia clínica</h2>

          <div className='flex flex-col'>
            <label className='mb-1'>Observaciones del profesional</label>
            <textarea name='observations' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Frases recurrentes / palabras clave</label>
            <textarea name='keywords' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Actos fallidos / asociaciones llamativas</label>
            <textarea name='failedActs' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Interconsultas / derivaciones realizadas</label>
            <textarea name='interconsultations' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Evolución del paciente</label>
            <textarea name='evolution' className='w-full h-[100px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>
          <br />

          {/* Organización y seguimineto */}
          <h2 className='text-[20px] leading-[28px] font-semibold'>Organización y seguimineto</h2>

          <div className='flex flex-col'>
            <label className='mb-1'>Día y horario de la sesión</label>
            <input name='meetingTime' className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Frecuencia (semanal, mensual, etc)</label>
            <input name='frequency' className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-900 mb-2">Modalidad de atención</label>
            <div className="flex flex-col gap-y-4">
              {["Online", "Presencial", "Híbrido"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-x-3 w-[118px] h-[32px] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="careModality"
                    value={option.toLowerCase()}
                    className="w-5 h-5 accent-indigo-600 border border-[#000D4D73]"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-900 mb-2">Duración aproximada de la sesión</label>
            <div className="flex flex-col gap-y-4">
              {["30 min", "45 min", "50 min", "60 min"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-x-3 w-[118px] h-[32px] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="time"
                    value={option.toLowerCase()}
                    className="w-5 h-5 accent-indigo-600 border border-[#000D4D73]"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1'>Medio de contacto preferido</label>
            <input name='contact' className='w-full h-[48px] rounded-lg border bg-white border-[#000D4D73] px-3' />
          </div>

          <Button 
            type='submit'
            // disabled={!name || !lastname}
          >
            Crear paciente
          </Button>
        </form>
      </div>
    </div>
  )
}
