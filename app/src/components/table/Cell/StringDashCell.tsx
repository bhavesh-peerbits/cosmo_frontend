import { CellContext } from '@tanstack/react-table';

const StringDashCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as string;
	return value?.length > 0 ? value : '-';
};
export default StringDashCell;
