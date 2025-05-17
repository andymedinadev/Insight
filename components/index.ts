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

// Pagination
export { default as Pagination } from './Pagination/Pagination';

//Filtros
export { default as PatientFilterDropdown } from './FilterButton/PatientFilterDropdown';

// Confirmar registro
export { SuccessConfirm } from './SuccessConfirm/SuccessConfirm';
export { default as UserNamePsicologo } from './UserName/UserName';
export { default as UserProfileView } from './FormUserEdit/UserProfileView';
export { default as UserProfileEdit } from './FormUserEdit/UserProfileEdit';
export { default as UserNameDrop } from './UserName/UserNameDrop';
