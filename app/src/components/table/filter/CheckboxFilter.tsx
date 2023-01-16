import { Checkbox, FormGroup } from '@carbon/react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface CheckboxFilterProps<T extends object> extends TableFilterProp<T> {
	sortedUniqueValues: string[];
}

const CheckboxFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	column,
	tableId,
	label,
	sortedUniqueValues
}: CheckboxFilterProps<T>) => {
	// eslint-disable-next-line no-param-reassign
	column.columnDef.filterFn = 'checkboxCompare';

	return (
		<FormGroup legendText={label}>
			{sortedUniqueValues.map(option => (
				<Checkbox
					key={option}
					id={`${tableId}-${column.id}-${option}`}
					value={option}
					labelText={option}
					onChange={(event, { checked }) => {
						onFilterChange(
							checked
								? [...(filteredValue as string[]), option]
								: (filteredValue as string[]).filter(value => value !== option)
						);
					}}
					checked={filteredValue instanceof Array && filteredValue.includes(option)}
				/>
			))}
		</FormGroup>
	);
};

export default CheckboxFilter;
