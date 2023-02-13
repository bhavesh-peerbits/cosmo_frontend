import DoubleSlider from '@components/SliderRange/SliderRange';
import TableFilterProp from '@components/table/filter/TableFilterProp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormValue {
	filterSlider?: number[];
}

const SliderFilter = <T extends object>({
	onFilterChange,
	filteredValue,
	tableId,
	column
}: TableFilterProp<T>) => {
	// eslint-disable-next-line no-param-reassign
	column.columnDef.filterFn = 'numberRangeCompare';
	const { getValues, setValue, watch } = useForm<FormValue>({
		defaultValues: { filterSlider: filteredValue as [number, number] }
	});

	const filterSliderValue = watch('filterSlider');

	useEffect(() => onFilterChange(filterSliderValue), [filterSliderValue, onFilterChange]);
	return (
		<div className='flex items-start '>
			<div className='flex items-end space-x-2'>
				<DoubleSlider
					size='sm'
					name='filterSlider'
					getValues={getValues}
					setValue={setValue}
					labelText={column.columnDef.header?.toString() ?? ''}
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '0')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? Number.MAX_VALUE)}
					idDS={`${tableId}-${column.id}`}
				/>
			</div>
		</div>
	);
};

export default SliderFilter;
