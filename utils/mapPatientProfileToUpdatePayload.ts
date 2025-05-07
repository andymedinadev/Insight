import { PatientProfileData, UpdatePatientPayload } from '@/types';

export function mapPatientProfileToUpdatePayload(
  profile: PatientProfileData
): UpdatePatientPayload {
  const [name, ...surnameParts] = profile.fullName.split(' ');
  const surname = surnameParts.join(' ');

  const sexMap: Record<PatientProfileData['sex'], UpdatePatientPayload['sex']> = {
    Masculino: 'M',
    Femenino: 'F',
    Otros: 'O',
  };

  const parsedDate = new Date(profile.birthdate);
  const isValidDate = !isNaN(parsedDate.getTime());
  const isoBirthdate = isValidDate ? parsedDate.toISOString() : undefined;

  return {
    name,
    surname,
    birthdate: isoBirthdate,
    sex: sexMap[profile.sex],
    modality: profile.modality,
    email: profile.email,
    phone: profile.phone,
  };
}
