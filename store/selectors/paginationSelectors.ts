import { RootState } from '@/store';

export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectTotalPages = (state: RootState) => state.pagination.totalPages;
