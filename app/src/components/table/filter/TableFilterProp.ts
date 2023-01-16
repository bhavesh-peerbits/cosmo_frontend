import { Column, RowData } from '@tanstack/react-table';

export default interface TableFilterProp<T extends object> {
	column: Column<T, RowData>;
	onFilterChange: (value: unknown) => void;
	filteredValue: unknown;
	tableId: string;
	label: string;
}
