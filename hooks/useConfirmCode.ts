import { useCodeInput, useVerification } from '@/hooks';

export function useConfirmCode(onSuccess?: () => void) {
  const { verify, loading } = useVerification();
  const { code, isComplete, handleChange, handleKeyDown } = useCodeInput();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;

    const verificationCode = code.join('');
    const storedEmail = sessionStorage.getItem('signupEmail');

    if (!storedEmail) {
      return;
    }

    const success = await verify({ email: storedEmail, verificationCode });

    if (success) {
      onSuccess?.();
    }
  };

  return {
    code,
    isComplete,
    isLoading: loading,
    handleChange,
    handleKeyDown,
    handleSubmit,
  };
}
