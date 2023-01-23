import { Dropdown } from '@carbon/react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface DropdownFilterProps<T extends object> extends TableFilterProp<T> {
	sortedUniqueValues: string[];
}

const DropdownFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	tableId,
	sortedUniqueValues,
	column,
	label
}: DropdownFilterProps<T>) => {
	return (
		<Dropdown
			id={`${tableId}-${column.id}-dropdown`}
			titleText={label}
			size='sm'
			label=''
			items={sortedUniqueValues}
			selectedItem={filteredValue as string}
			onChange={({ selectedItem }) => {
				onFilterChange(selectedItem);
			}}
		/>
	);
};

export default DropdownFilter;
