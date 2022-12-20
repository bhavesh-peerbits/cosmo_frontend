import { ColumnFiltersState } from '@tanstack/react-table';
import { atomFamily } from 'recoil';

const filterAtom = atomFamily<ColumnFiltersState, string>({
  key: 'paginationFilter',
  default: []
});

export default filterAtom;
