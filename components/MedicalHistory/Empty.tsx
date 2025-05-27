type EmptyProps = {
  type: 'material' | 'nota';
};

export default function Empty({ type }: EmptyProps) {
  return (
    <div className="relative h-36 w-full bg-[rgba(0,48,125,0.02)] px-10">
      <h1 className="mt-6 mb-3 font-['Roboto'] text-3xl leading-10 font-semibold text-black">
        {`Aún no tienes ${type === 'nota' ? 'notas agregadas' : 'material agregado'}`}
      </h1>
      <p className="font-['Roboto'] text-xl font-normal text-black">
        {type === 'nota'
          ? 'Para agregar una nota, pulsa el botón Agregar nueva nota.'
          : 'Para agregar material para el paciente, pulsa el botón Agregar nuevo material.'}{' '}
      </p>
    </div>
  );
}
