export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}
