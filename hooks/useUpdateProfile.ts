// hooks/useUpdateProfile.ts
import { useDispatch } from 'react-redux';
import { updateProfile } from '@/store/thunks/profileThunk';
import { AppDispatch } from '@/store';
import { UpdateProfilePayload } from '@/types/Profile/profileTypes';

export const useUpdateProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateProfileAction = (formData: UpdateProfilePayload) => {
    dispatch(updateProfile(formData));
  };

  return updateProfileAction;
};
