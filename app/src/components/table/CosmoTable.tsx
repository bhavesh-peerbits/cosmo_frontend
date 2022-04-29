import {
	Layer,
	Pagination,
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
		setPageIndex,
		setPageSize
	} = useTableInstance(table, {
		data,
		columns,
		autoResetPageIndex: false,
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

			<Pagination
				backwardText={t('previous-page')}
				forwardText={t('next-page')}
				itemsPerPageText={t('items-per-page')}
				itemRangeText={(min, max, total) => t('item-range', { min, max, total })}
				pageRangeText={(current, total) =>
					t(total > 1 ? 'page-range-plural' : 'page-range', { current, total })
				}
				page={1}
				onChange={({ page, pageSize }) => {
					setPageIndex(page - 1);
					setPageSize(pageSize);
				}}
				pageSize={10}
				pageSizes={[10, 20, 30, 40, 50]}
				size='md'
				totalItems={data.length}
			/>
		</TableContainer>
	);
};

export type { HeaderFunction, CellProperties };
export default CosmoTable;
