import { DatePicker, DatePickerInput, Toggle } from '@carbon/react';
import { useState } from 'react';
import TableFilterProp from '@components/table/filter/TableFilterProp';

interface DateFilterProps<T extends object> extends TableFilterProp<T> {
	filterContainerRef: HTMLElement;
}

const DateFilter = <T extends object>({
	column,
	filterContainerRef,
	onFilterChange,
	filteredValue,
	tableId,
	label
}: DateFilterProps<T>) => {
	const [range, setRange] = useState(
		filteredValue instanceof Array && filteredValue.length > 1
	);
	// eslint-disable-next-line no-param-reassign
	column.columnDef.filterFn = 'dateCompare';
	return (
		<div className='relative'>
			<DatePicker
				key={`${range}`}
				appendTo={filterContainerRef}
				onChange={value => {
					onFilterChange([...value.slice(0, range ? 2 : 1)]);
				}}
				value={
					range
						? (filteredValue as [Date, Date])
						: ((filteredValue as [Date, Date])?.[0] as Date)
				}
				datePickerType={range ? 'range' : 'single'}
			>
				<DatePickerInput
					size='sm'
					placeholder='mm/dd/yyyy'
					labelText={label}
					id={`${tableId}-${column.id}-datestart`}
				/>
				{range && (
					<DatePickerInput
						size='sm'
						labelText=' '
						placeholder='mm/dd/yyyy'
						id={`${tableId}-${column.id}-dateend`}
					/>
				)}
			</DatePicker>
			<Toggle
				className='absolute top-0 right-0 -translate-y-1/2'
				size='sm'
				labelA='Single'
				labelB='Range'
				toggled={range}
				onToggle={t => setRange(t)}
				id={`toggle-${column.id}`}
				aria-label='single-range'
			/>
		</div>
	);
};

export default DateFilter;
