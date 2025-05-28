import { SignupFormData, SignupPayload } from '@/types';

export function transformFormDataToSignupPayload(formData: SignupFormData): SignupPayload {
  const payload = {
    name: formData.name,
    surname: formData.lastname,
    email: formData.email,
    phone: formData.phone === '' ? null : formData.phone,
    title: null,
    password: formData.password,
  };
  return payload;
}
