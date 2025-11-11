type LoginHeaderProps = {
  isLoading: boolean;
  onDemoLogin: () => void;
};

export function LoginHeader({ isLoading, onDemoLogin }: LoginHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <h3 className="mt-8 font-['Roboto'] text-xl font-semibold text-black md:mt-12 md:text-3xl md:leading-10 md:font-normal">
          ¿Primera vez aquí?
        </h3>
        <p className="mt-3 w-[350px] font-['Roboto'] text-base leading-tight font-normal text-black md:mt-4 md:w-[445px] md:text-lg">
          Puedes recorrer la aplicación y conocer sus funciones sin registrarte.
        </p>
        <button
          type="button"
          disabled={isLoading}
          onClick={onDemoLogin}
          className={`mt-6 flex h-12 w-full items-center justify-center rounded-lg md:mt-8 md:rounded-xl ${
            isLoading ? 'cursor-not-allowed bg-[#0011661A]' : 'cursor-pointer bg-[#0655D5]'
          }`}
        >
          <p className="font-['Roboto'] text-base font-semibold text-white md:text-2xl">
            {isLoading ? 'Cargando...' : 'Entrar en modo demo'}
          </p>
        </button>
      </div>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-[#D5D5D5]" />
        <span className="font-['Roboto'] text-xs font-medium text-[#6B6B6B] uppercase">o</span>
        <span className="h-px flex-1 bg-[#D5D5D5]" />
      </div>

      <h3 className="mt-8 font-['Roboto'] text-xl font-semibold text-black md:mt-12 md:text-3xl md:leading-10 md:font-normal">
        Inicia sesión
      </h3>
      <p className="mt-3 w-[350px] font-['Roboto'] text-base leading-tight font-normal text-black md:mt-4 md:w-[445px] md:text-lg">
        Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y eficiente.
      </p>
    </>
  );
}
