import { NumberInput } from '@carbon/react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

const NumberFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	label,
	tableId,
	column
}: TableFilterProp<T>) => {
	return (
		<div className='flex items-start '>
			<div className='flex items-end space-x-2'>
				<NumberInput
					size='sm'
					type='number'
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					label={label}
					allowEmpty
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '0')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? Number.MAX_VALUE)}
					value={(filteredValue as [number, number])?.[0]}
					onChange={(e, { value }) => onFilterChange(value)}
					placeholder={`Min ${
						column.getFacetedMinMaxValues()?.[0]
							? `(${column.getFacetedMinMaxValues()?.[0]})`
							: ''
					}`}
					id={`${tableId}-${column.id}min`}
				/>
				<NumberInput
					type='number'
					size='sm'
					allowEmpty
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '0')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? Number.MAX_VALUE)}
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					value={(filteredValue as [number, number])?.[1]}
					onChange={(e, { value }) => onFilterChange(value)}
					placeholder={`Max ${
						column.getFacetedMinMaxValues()?.[1]
							? `(${column.getFacetedMinMaxValues()?.[1]})`
							: ''
					}`}
					id={`${tableId}-${column.id}max`}
				/>
			</div>
		</div>
	);
};

export default NumberFilter;
