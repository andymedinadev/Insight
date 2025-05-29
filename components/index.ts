// Importaciones barril
// EJEMPLO: export { default as RootLayout } from "./layout";

export { default as Button } from './ui/Button';
export { default as InputField } from './ui/InputField';
export { ValidationError } from './ui/ValidationError';

// Layouts
export { default as DashboardLinks } from './layouts/DashboardLinks';
export { default as Navbar } from './layouts/navbar/Navbar';
export { default as Sidebar } from './layouts/sidebar/Sidebar';
export { default as NavbarButtons } from './layouts/navbar/NavbarButtons';
export { default as NavbarClient } from './layouts/navbar/NavbarClient';
export { default as CurrentPath } from './layouts/CurrentPath';

// Cards
export { default as ButtonCards } from './Cards/ButtonCards/ButtonCards';

// PatientList
export { default as CompletedList } from './CompletedListPatients/CompletedList';
export { default as SearchBar } from './SearchBar/SearchBar';
export { default as FilterButton } from './FilterButton/FilterButton';
export { default as PatientList } from './PatientList/PatientList';
export { default as SeeMoreButton } from './SeeMoreButton/SeeMoreButton';
export { default as AddPatientButton } from './AddPatientButton/AddPatientButton';
export { default as ArchivedLink } from './ArchivedLink/ArchivedLink';
export { default as CompletedListArchived } from './CompletedListPatients/CompletedListArchived/CompletedListArchived';
export { default as GoBackArchived } from './ArchivedLink/GoBackArchived';
export { default as PatientListArchived } from './PatientList/PatientListArchived/PatientListArchived';

// NewPatient
export { default as FormPatient } from './FormPatient/FormPatient';

// PatientProfile
export { EditPatientForm } from './EditPatientForm/EditPatientForm';
export { PatientProfileHeader } from './PatientProfile/PatientProfileHeader';
export { PatientProfileInfo } from './PatientProfile/PatientProfileInfo';
export { PatientProfileLorem } from './PatientProfile/PatientProfileLorem';

// MedicalHistory
export { default as MedicalHistoryHeader } from './MedicalHistory/MedicalHistoryHeader';
export { default as MedicalHistoryList } from './MedicalHistory/MedicalHistoryList';
export { default as MedicalHistoryNew } from './MedicalHistory/MedicalHistoryNew';
export { default as MedicalHistoryView } from './MedicalHistory/MedicalHistoryView';
export { default as MedicalHistoryEdit } from './MedicalHistory/MedicalHistoryEdit';
export { default as Empty } from './MedicalHistory/Empty';

// Pagination
export { default as Pagination } from './Pagination/Pagination';

//Filtros
export { default as PatientFilterDropdown } from './FilterButton/PatientFilterDropdown';

export { default as UserNamePsicologo } from './UserName/UserName';
export { default as UserProfileView } from './FormUserEdit/UserProfileView';
export { default as UserProfileEdit } from './FormUserEdit/UserProfileEdit';
export { default as UserNameDrop } from './UserName/UserNameDrop';

// Login
export { LoginForm } from './LoginPage/LoginForm';
export { LoginHeader } from './LoginPage/LoginHeader';
export { LoginIllustration } from './LoginPage/LoginIllustration';
export { LoginLogo } from './LoginPage/LoginLogo';

// Signup
export { SignupForm } from './SignupPage/SignupForm';
export { SignupHeader } from './SignupPage/SignupHeader';
export { SignupIllustration } from './SignupPage/SignupIllustration';
export { SignupLogo } from './SignupPage/SignupLogo';

// Confirm-account
export { CodeInput } from './CodeInput/CodeInput';
export { ConfirmForm } from './ConfirmAccountPage/ConfirmForm';
export { ConfirmHeader } from './ConfirmAccountPage/ConfirmHeader';
export { ConfirmIllustration } from './ConfirmAccountPage/ConfirmIllustration';
export { ConfirmLogo } from './ConfirmAccountPage/ConfirmLogo';
export { SuccessConfirm } from './SuccessConfirm/SuccessConfirm';
export { SuccessForm } from './SuccessConfirm/SuccessForm';
