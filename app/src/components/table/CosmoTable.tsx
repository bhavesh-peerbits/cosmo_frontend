import {
	Layer,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableSelectAll,
	TableSelectRow
} from '@carbon/react';
import {
	ColumnSort,
	createTable,
	getCoreRowModelSync,
	getPaginationRowModel,
	getSortedRowModelSync,
	PaginationState,
	useTableInstance
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	CellProperties,
	CosmoTableToolbarProps,
	HeaderFunction
} from '@components/table/types';
import CosmoTableToolbar from './CosmoTableToolbar';

interface ApplicationsTableProps<D extends object> {
	createHeaders: HeaderFunction<D>;
	data: D[];
	toolbar:
		| Pick<CosmoTableToolbarProps, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
	noDataMessage?: string;
}

const CosmoTable = <D extends object>({
	createHeaders,
	data,
	toolbar,
	noDataMessage
}: ApplicationsTableProps<D>) => {
	const { t } = useTranslation('table');
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<ColumnSort[]>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
		pageCount: -1 // -1 allows the table to calculate the page count for us via instance.getPageCount()
	});

	const table = createTable().setRowType<D>();
	const columns = useMemo(
		() => table.createColumns(createHeaders(table)),
		[createHeaders, table]
	);
	const {
		toggleAllRowsSelected,
		getTableProps,
		getTableBodyProps,
		getRowModel,
		getHeaderGroups,
		getToggleAllRowsSelectedProps,
		...other
	} = useTableInstance(table, {
		data,
		columns,
		state: {
			pagination,
			sorting,
			rowSelection
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModelSync(),
		getSortedRowModel: getSortedRowModelSync(),
		getPaginationRowModel: getPaginationRowModel()
	});

	const renderBody = () => {
		const { rows } = getRowModel();
		return rows.length ? (
			rows.map(row => {
				const properties = row.getToggleSelectedProps();
				return (
					<TableRow {...row.getRowProps()}>
						<TableSelectRow
							{...properties}
							ariaLabel='Select'
							id={row.id}
							name={row.id}
							onSelect={properties?.onChange}
							onChange={undefined}
						/>
						{row.getVisibleCells().map(cell => (
							<TableCell {...cell.getCellProps()}>{cell.renderCell()}</TableCell>
						))}
					</TableRow>
				);
			})
		) : (
			<TableRow>
				<TableCell colSpan={columns.length + 1}>
					<p className='flex justify-center'>{noDataMessage || t('no-data')}</p>
				</TableCell>
			</TableRow>
		);
	};

	return (
		<TableContainer>
			{toolbar && (
				<CosmoTableToolbar
					selectionIds={Object.keys(rowSelection).length}
					onCancel={() => toggleAllRowsSelected(false)}
					toolbarBatchActions={toolbar.toolbarBatchActions}
					toolbarContent={toolbar.toolbarContent}
				/>
			)}
			<Layer level={1}>
				<Table {...getTableProps()}>
					<TableHead>
						{getHeaderGroups().map(headerGroup => {
							const properties = getToggleAllRowsSelectedProps();
							return (
								<TableRow {...headerGroup.getHeaderGroupProps()}>
									<TableSelectAll
										{...properties}
										ariaLabel='SelectAll'
										id='selectAll'
										name='selectAll'
										onSelect={properties?.onChange}
										onChange={undefined}
									/>
									{headerGroup.headers.map(header => {
										return (
											<TableHeader
												{...header.getHeaderProps()}
												sortDirection={
													header.column.getIsSorted() === 'desc' ? 'DESC' : 'ASC'
												}
												onClick={() => header.column.toggleSorting()}
												scope=''
												isSortable
												isSortHeader={
													header.column.getCanSort() && !!header.column.getIsSorted()
												}
											>
												{!header.isPlaceholder && header.renderHeader()}
											</TableHeader>
										);
									})}
								</TableRow>
							);
						})}
					</TableHead>
					<TableBody {...getTableBodyProps()}>{renderBody()}</TableBody>
				</Table>
			</Layer>

			{other.getOverallProgress() < 1 ? (
				<div className='p-2'>
					<div>Loading data...</div>
					<div>
						<progress value={other.getOverallProgress()} />
					</div>
				</div>
			) : null}
			<div className='h-2' />
			<div className='flex items-center gap-2'>
				<button
					type='button'
					className='rounded border p-1'
					onClick={() => other.setPageIndex(0)}
					disabled={!other.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					type='button'
					className='rounded border p-1'
					onClick={() => other.previousPage()}
					disabled={!other.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					type='button'
					className='rounded border p-1'
					onClick={() => other.nextPage()}
					disabled={!other.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					type='button'
					className='rounded border p-1'
					onClick={() => other.setPageIndex(other.getPageCount() - 1)}
					disabled={!other.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						{other.getState().pagination.pageIndex + 1} of {other.getPageCount()}
					</strong>
				</span>
				<span className='flex items-center gap-1'>
					| Go to page:
					<input
						type='number'
						defaultValue={other.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							other.setPageIndex(page);
						}}
						className='w-16 rounded border p-1'
					/>
				</span>
				<select
					value={other.getState().pagination.pageSize}
					onChange={e => {
						other.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{getRowModel().rows.length} Rows</div>
		</TableContainer>
	);
};

export type { HeaderFunction, CellProperties };
export default CosmoTable;
