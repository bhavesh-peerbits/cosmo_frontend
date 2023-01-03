import { CellContext } from '@tanstack/react-table';

const DateCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as Date;
	return value ? value.toLocaleDateString() : '-';
};
export default DateCell;
