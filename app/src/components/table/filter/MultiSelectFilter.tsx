import { MultiSelect } from '@carbon/react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface MultiSelectFilterProps<T extends object> extends TableFilterProp<T> {
	sortedUniqueValues: string[];
}

const MultiSelectFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	tableId,
	sortedUniqueValues,
	column,
	label
}: MultiSelectFilterProps<T>) => {
	// eslint-disable-next-line no-param-reassign
	column.columnDef.filterFn = 'checkboxCompare';
	return (
		<MultiSelect
			id={`${tableId}-${column.id}-multiselect`}
			size='sm'
			label=''
			titleText={label}
			items={sortedUniqueValues}
			itemToString={item => item}
			initialSelectedItems={(filteredValue as string[]) || []}
			onChange={({ selectedItems }) => {
				onFilterChange(selectedItems);
			}}
		/>
	);
};

export default MultiSelectFilter;
