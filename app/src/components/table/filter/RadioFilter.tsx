import { FormGroup, RadioButton, RadioButtonGroup } from '@carbon/react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface RadioFilterProps<T extends object> extends TableFilterProp<T> {
	sortedUniqueValues: string[];
}

const RadioFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	sortedUniqueValues,
	tableId,
	label,
	column
}: RadioFilterProps<T>) => {
	return (
		<FormGroup legendText={label}>
			<RadioButtonGroup
				orientation='vertical'
				name={`${tableId}-${column.id}-radio`}
				valueSelected={filteredValue as string}
				onChange={value => {
					onFilterChange(value);
				}}
			>
				{sortedUniqueValues.map(option => (
					<RadioButton key={option} labelText={option} value={option} />
				))}
			</RadioButtonGroup>
		</FormGroup>
	);
};

export default RadioFilter;
