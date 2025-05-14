import { SignupFormData, SignupPayload } from '@/types';

export function transformFormDataToSignupPayload(formData: SignupFormData): SignupPayload {
  const payload = {
    identification: Math.floor(Math.random() * (21474836 - 10 + 1)) + 10,
    title: null,
    surname: formData.lastname,
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };
  return payload;
}
