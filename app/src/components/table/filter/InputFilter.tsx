import { TextInput } from '@carbon/react';
import { ChangeEvent } from 'react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface InputFilterProps<T extends object> extends TableFilterProp<T> {
	sortedUniqueValues: string[];
}

const InputFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	tableId,
	label,
	column,
	sortedUniqueValues
}: InputFilterProps<T>) => {
	return (
		<>
			<datalist id={`${tableId}-${column.id}-list`}>
				{sortedUniqueValues.slice(0, 5000).map(value => (
					// eslint-disable-next-line jsx-a11y/control-has-associated-label
					<option value={value} key={value} />
				))}
			</datalist>
			<TextInput
				type='text'
				size='sm'
				labelText={label}
				value={filteredValue as string}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					onFilterChange(e.target.value);
				}}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
				list={`${tableId}-${column.id}-list`}
				id={`${tableId}-${column.id}-input`}
			/>
		</>
	);
};

export default InputFilter;
