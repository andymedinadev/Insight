'use client';

export default function Terms() {
  return (
    <div className="pr-6 pl-8">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">Términos y Condiciones de Uso</h3>

      <p className="mb-10 text-sm leading-relaxed text-black">
        Última actualización: 1 de mayo de 2025. Bienvenido/a a Insight. Al registrarte y utilizar
        nuestros servicios, aceptás los presentes Términos y Condiciones de Uso, que regulan la
        relación entre vos (el usuario profesional de la salud mental) e Insight Technologies S.R.L.
      </p>

      <section className="mb-8">
        <p className="text-sm leading-relaxed text-black">
          La Plataforma permite a profesionales de la salud mental gestionar información de sus
          pacientes, registrar sesiones, compartir tareas y mantener comunicación profesional
          mediante un entorno seguro.
        </p>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">2. Usuario responsable</h4>
        <p className="text-sm leading-relaxed text-black">
          El uso de la Plataforma está destinado exclusivamente a psicólogos/as y profesionales
          habilitados/as, quienes serán responsables del tratamiento de los datos personales y
          sensibles que ingresen en el sistema, conforme a la Ley 25.326.
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-black">
          <li>Usar la Plataforma respetando el secreto profesional.</li>
          <li>
            Obtener el consentimiento informado del paciente para el registro y tratamiento de su
            información.
          </li>
          <li>No compartir datos del paciente con terceros no autorizados.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">
          3. Datos personales y confidencialidad
        </h4>
        <p className="text-sm leading-relaxed text-black">
          La Plataforma almacena datos personales y sensibles, incluyendo información de salud.
          Estos datos:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-black">
          <li>Son protegidos mediante medidas técnicas como cifrado y control de accesos.</li>
          <li>
            No serán compartidos con terceros sin autorización expresa del usuario y/o paciente.
          </li>
          <li>
            Pueden ser modificados o eliminados a pedido del profesional o paciente, según la
            normativa vigente.
          </li>
        </ul>
        <p className="mt-2 text-sm leading-relaxed text-black">
          La empresa actúa como encargado del tratamiento, implementando medidas de seguridad pero
          sin acceso directo al contenido clínico, salvo requerimiento legal.
        </p>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">
          4. Obligaciones del paciente (si accede a la app)
        </h4>
        <p className="text-sm leading-relaxed text-black">
          Cuando el paciente accede a su espacio personal en la Plataforma (si esta funcionalidad
          existe), acepta:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-black">
          <li>Usar la información con fines terapéuticos únicamente.</li>
          <li>No divulgar datos de otros usuarios ni acceder a información que no le pertenece.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">5. Seguridad y acceso</h4>
        <p className="text-sm leading-relaxed text-black">
          El usuario se compromete a mantener la confidencialidad de sus credenciales de acceso. La
          Plataforma recomienda el uso de contraseñas fuertes y no se responsabiliza por accesos
          indebidos derivados de negligencia del usuario.
        </p>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">6. Propiedad intelectual</h4>
        <p className="text-sm leading-relaxed text-black">
          Todo el contenido y desarrollo tecnológico de la Plataforma pertenece a Insight
          Technologies S.R.L., quedando prohibida su reproducción o distribución sin autorización
          expresa.
        </p>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">7. Modificaciones</h4>
        <p className="text-sm leading-relaxed text-black">
          Nos reservamos el derecho de modificar estos Términos y Condiciones. Notificaremos a los
          usuarios registrados sobre cualquier cambio relevante. El uso continuado de la Plataforma
          implica aceptación de los nuevos términos.
        </p>
      </section>

      <section className="mb-8">
        <h4 className="mb-2 text-lg font-semibold text-gray-900">8. Legislación aplicable</h4>
        <p className="text-sm leading-relaxed text-black">
          Estos Términos se rigen por las leyes de la República Argentina. Cualquier controversia
          será sometida a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de
          Buenos Aires.
        </p>
      </section>
    </div>
  );
}
