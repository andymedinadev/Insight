export interface SignupPayload {
  name: string;
  surname: string;
  email: string;
  phone: string | null;
  title: string | null;
  password: string;
}
