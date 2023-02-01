import { Button, ButtonSet, Layer } from '@carbon/react';
import { useCallback, useMemo, useState } from 'react';
import { Column, RowData } from '@tanstack/react-table';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import FilterElement from './FilterElement';

interface TableFiltersProps<T extends object> {
	allColumns: Column<T, RowData>[];
	onApplyFilters: () => void;
	tableId: string;
}

const TableFilters = <T extends object>({
	onApplyFilters,
	allColumns,
	tableId
}: TableFiltersProps<T>) => {
	const { setColumnFilters } = usePaginationStore(tableId);
	/** Renders all filters */
	const filters = useMemo(
		() => allColumns.filter(c => c.columnDef.meta?.filter?.enabled !== false),
		[allColumns]
	);
	const [filterState, setFilterState] = useState(
		new Map(
			filters.map(f => [
				f.id,
				{
					id: f.id,
					column: f,
					value: (f.getFilterValue() ?? '') as unknown
				}
			])
		)
	);
	const onFilterChange = useCallback(
		(f: NonNullable<ReturnType<typeof filterState['get']>>, value: unknown) => {
			setFilterState(oldFilter =>
				new Map(oldFilter).set(f.id, {
					...f,
					value
				})
			);
		},
		[]
	);

	const [filterRef, setFilterRef] = useState<HTMLElement | null>(null);

	return (
		<div>
			<span className='relative w-5' ref={e => setFilterRef(e)}>
				f
			</span>
			<div
				style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)' }}
				className='absolute -top-[2px] right-0 flex w-[400px]  flex-col justify-end bg-layer-1 lg:w-[670px]'
			>
				<div className=' px-5 pt-5 pb-9'>
					<span className='typography-productive-heading-1 mb-6 block'>Filters</span>
					<Layer
						level={1}
						className='grid  grid-cols-[1fr] gap-y-5 gap-x-7  lg:grid-cols-[1fr,1fr]'
					>
						{filterRef &&
							[...filterState.values()].map(f => (
								<FilterElement
									key={f.id}
									column={f.column}
									filterContainerRef={filterRef}
									filteredValue={f.value}
									tableId={tableId}
									onFilterChange={value => onFilterChange(f, value)}
								/>
							))}
					</Layer>
				</div>
				<ButtonSet>
					<Button
						className='max-w-none flex-1'
						kind='secondary'
						size='md'
						onClick={() => {
							setColumnFilters([]);
							onApplyFilters();
						}}
					>
						Reset
					</Button>
					<Button
						className='max-w-none flex-1'
						kind='primary'
						size='md'
						onClick={() => {
							[...filterState.values()].forEach(c => c.column.setFilterValue(c.value));
							onApplyFilters();
						}}
					>
						Apply
					</Button>
				</ButtonSet>
			</div>
		</div>
	);
};

export default TableFilters;
