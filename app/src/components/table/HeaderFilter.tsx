import { Column, Table } from '@tanstack/react-table';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { NumberInput, TextInput } from '@carbon/react';

const HeaderFilter = <T extends object>({
	column,
	table
}: {
	column: Column<T>;
	table: Table<T>;
}) => {
	const firstValue = useRef(
		table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
	).current;
	const columnFilterValue = column.getFilterValue();
	const facetUniqueValues = column.getFacetedUniqueValues().keys();

	const sortedUniqueValues = useMemo(
		() => (typeof firstValue === 'number' ? [] : Array.from(facetUniqueValues).sort()),
		[facetUniqueValues, firstValue]
	);

	const [inputState, setInputState] = useState((columnFilterValue as string) ?? '');

	return typeof firstValue === 'number' ? (
		<div>
			<div className='flex space-x-2'>
				<NumberInput
					type='number'
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '0')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? Number.MAX_VALUE)}
					value={(columnFilterValue as [number, number])?.[0]}
					onChange={(e, { value }) =>
						column.setFilterValue((old: [number, number]) => [value, old?.[1]])
					}
					placeholder={`Min ${
						column.getFacetedMinMaxValues()?.[0]
							? `(${column.getFacetedMinMaxValues()?.[0]})`
							: ''
					}`}
					id={`${column.id}min`}
				/>
				<NumberInput
					type='number'
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '0')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? Number.MAX_VALUE)}
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					value={(columnFilterValue as [number, number])?.[1]}
					onChange={(e, { value }) =>
						column.setFilterValue((old: [number, number]) => [old?.[0], value])
					}
					placeholder={`Max ${
						column.getFacetedMinMaxValues()?.[1]
							? `(${column.getFacetedMinMaxValues()?.[1]})`
							: ''
					}`}
					id={`${column.id}max`}
				/>
			</div>
			<div className='h-1' />
		</div>
	) : (
		<>
			<datalist id={`${column.id}list`}>
				{sortedUniqueValues.slice(0, 5000).map((value: any) => (
					// eslint-disable-next-line jsx-a11y/control-has-associated-label
					<option value={value} key={value} />
				))}
			</datalist>
			<TextInput
				type='text'
				value={inputState}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setInputState(e.target.value);
					column.setFilterValue(e.target.value);
				}}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
				className='w-36 border rounded shadow'
				list={`${column.id}list`}
				id={column.id}
				labelText=''
			/>
			<div className='h-1' />
		</>
	);
};

export default HeaderFilter;
