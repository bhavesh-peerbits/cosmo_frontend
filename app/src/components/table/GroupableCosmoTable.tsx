import {
	Layer,
	OverflowMenu,
	OverflowMenuItem,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableExpandHeader,
	TableExpandRow,
	TableHead,
	TableHeader,
	TableRow,
	TableSelectAll,
	TableSelectRow
} from '@carbon/react';

import {
	AggregationFn,
	ColumnDef,
	ColumnSort,
	createTable,
	ExpandedState,
	getCoreRowModel,
	getExpandedRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	Table as TableType,
	TableGenerics,
	useTableInstance
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	AvailableFileType,
	CellProperties,
	CosmoTableToolbarProps,
	ExportProperties,
	TB
} from '@components/table/types';
import useExportTablePlugin from '@hooks/useExportTablePlugin';
import CosmoTableToolbar from './CosmoTableToolbar';

declare module '@tanstack/react-table' {
	interface AggregationFns {
		myCustomAggregation: AggregationFn<TableGenerics>;
	}
}

type HeaderFunction<T extends object> = GroupableTableProps<T>['createHeaders'];

interface GroupableTableProps<D extends object> {
	tableId: string;
	createHeaders: (table: TableType<TB<D>>) => Array<ColumnDef<TB<D>>>;
	data: D[];
	noDataMessage?: string;
	exportFileName?: (param: {
		fileType: AvailableFileType;
		all: boolean | 'selection';
	}) => string;
	toolbar?:
		| Pick<CosmoTableToolbarProps<D>, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
	isSelectable?: boolean;
	disableExport?: boolean;
}

const GroupableCosmoTable = <D extends object>({
	tableId,
	createHeaders,
	data,
	noDataMessage,
	exportFileName,
	disableExport,
	toolbar,
	isSelectable
}: GroupableTableProps<D>) => {
	const { t } = useTranslation('table');
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [grouping, setGrouping] = useState<string[]>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<ColumnSort[]>([]);

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});
	const table = createTable().setColumnMetaType<ExportProperties>().setRowType<D>();
	const columns = useMemo(() => createHeaders(table), [createHeaders, table]);
	const instance = useTableInstance(table, {
		data,
		columns,
		autoResetPageIndex: false,
		state: {
			pagination,
			sorting,
			grouping,
			rowSelection,
			expanded
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGroupingChange: setGrouping,
		onRowSelectionChange: setRowSelection,
		onExpandedChange: setExpanded,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
	const {
		getRowModel,
		getHeaderGroups,
		setPageIndex,
		setPageSize,
		getSelectedRowModel,
		toggleAllRowsSelected,
		getIsAllRowsSelected,
		getIsSomeRowsSelected,
		getToggleAllRowsSelectedHandler,
		resetRowSelection
	} = instance;
	const { exportData } = useExportTablePlugin(instance, exportFileName, disableExport);
	const renderBody = () => {
		const { rows } = getRowModel();
		return rows.length ? (
			rows.map(row => {
				return row.getCanExpand() ? (
					<TableExpandRow
						key={row.id + tableId}
						isExpanded={row.getIsExpanded()}
						ariaLabel=''
						onClick={row.getToggleExpandedHandler()}
						onExpand={() => null}
					>
						{isSelectable && (
							<TableSelectRow
								checked={row.getIsSelected()}
								ariaLabel='Select'
								id={row.id + tableId}
								name={row.id + tableId}
								onSelect={row.getToggleSelectedHandler()}
								onChange={undefined}
							/>
						)}
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id}>
								{cell.getIsGrouped() && (
									<>
										{cell.renderCell()} ({row.subRows.length})
									</>
								)}
							</TableCell>
						))}
					</TableExpandRow>
				) : (
					<TableRow className='w-full' key={row.id + tableId}>
						{isSelectable && (
							<TableSelectRow
								checked={row.getIsSelected()}
								ariaLabel='Select'
								id={row.id + tableId}
								name={row.id + tableId}
								onSelect={row.getToggleSelectedHandler()}
								onChange={undefined}
							/>
						)}
						<TableCell />
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id}>
								{(cell.getIsGrouped() && (
									<>
										{cell.renderCell()} ({row.subRows.length})
									</>
								)) ||
									(cell.getIsAggregated() && cell.renderAggregatedCell()) ||
									(!cell.getIsPlaceholder() && cell.renderCell())}
							</TableCell>
						))}
					</TableRow>
				);
			})
		) : (
			<TableRow>
				<TableCell colSpan={columns.length + 2}>
					<p className='flex justify-center'>{noDataMessage || t('no-data')}</p>
				</TableCell>
			</TableRow>
		);
	};

	return (
		<TableContainer>
			{toolbar ? (
				<CosmoTableToolbar<D>
					onExportClick={exportData}
					selectionIds={
						getSelectedRowModel()
							.flatRows.map(row => row.original)
							.filter(r => r) as D[]
					}
					onCancel={() => toggleAllRowsSelected(false)}
					toolbarBatchActions={toolbar?.toolbarBatchActions}
					toolbarContent={toolbar?.toolbarContent}
					disableExport={data.length === 0}
					onSuccess={resetRowSelection}
				/>
			) : (
				<CosmoTableToolbar<D>
					onExportClick={exportData}
					disableExport={grouping.length > 0 || data.length === 0}
				/>
			)}
			<Layer level={1}>
				<Table>
					<TableHead>
						{getHeaderGroups().map(headerGroup => {
							return (
								<TableRow key={headerGroup.id}>
									{isSelectable && (
										<th className='relative text-center'>
											<TableSelectAll
												ariaLabel='SelectAll'
												id={`${headerGroup.id}__${tableId}`}
												name={headerGroup.id + tableId}
												className='absolute top-1/2 left-0 -translate-y-1/2'
												checked={getIsAllRowsSelected()}
												indeterminate={getIsSomeRowsSelected()}
												onSelect={getToggleAllRowsSelectedHandler()}
												onChange={undefined}
											/>
										</th>
									)}
									<TableExpandHeader />
									{headerGroup.headers.map(header => {
										return (
											<TableHeader
												key={header.id}
												colSpan={header.colSpan}
												sortDirection={
													header.column.getIsSorted() === 'desc' ? 'DESC' : 'ASC'
												}
												scope=''
												isSortable={header.column.getCanSort()}
												isSortHeader={
													header.column.getCanSort() && !!header.column.getIsSorted()
												}
											>
												<div className='flex items-center justify-between'>
													{!header.isPlaceholder && header.renderHeader()}

													<OverflowMenu ariaLabel='Overflow Menu' iconDescription='Menu'>
														<OverflowMenuItem
															itemText={
																(header.column.getNextSortingOrder() === 'desc' &&
																	t('sort-descending')) ||
																(header.column.getNextSortingOrder() === 'asc' &&
																	t('sort-ascending')) ||
																t('original-sort')
															}
															onClick={header.column.getToggleSortingHandler()}
														/>

														{header.column.getCanGroup() && (
															<OverflowMenuItem
																hasDivider
																itemText={
																	header.column.getIsGrouped()
																		? t('remove-group')
																		: t('group-by')
																}
																onClick={header.column.getToggleGroupingHandler()}
															/>
														)}
													</OverflowMenu>
												</div>
											</TableHeader>
										);
									})}
								</TableRow>
							);
						})}
					</TableHead>
					<TableBody>{renderBody()}</TableBody>
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
export default GroupableCosmoTable;
