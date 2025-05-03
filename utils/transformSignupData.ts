import { SignupFormData, SignupPayload } from '@/types';

export function transformFormDataToSignupPayload(formData: SignupFormData): SignupPayload {
  const payload = {
    identification: Math.floor(Math.random() * 2147483647),
    name: formData.name,
    apellido: formData.lastname,
    email: formData.email,
    password: formData.password,
  };
  return payload;
}
