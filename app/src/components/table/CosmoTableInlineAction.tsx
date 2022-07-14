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
	TableRow
} from '@carbon/react';
import {
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
	useTableInstance
} from '@tanstack/react-table';
import { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	AvailableFileType,
	CellProperties,
	ExportProperties,
	TB,
	CosmoTableToolbarProps
} from '@components/table/types';
import useExportTablePlugin from '@hooks/useExportTablePlugin';
import CosmoTableToolbar from './CosmoTableToolbar';

type HeaderFunction<T extends object> = TableInlineActionProps<T>['createHeaders'];
interface TableInlineActionProps<D extends object> {
	createHeaders: (table: TableType<TB<D>>) => Array<ColumnDef<TB<D>>>;
	data: D[];
	toolbar?:
		| Pick<CosmoTableToolbarProps<D>, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
	noDataMessage?: string;
	exportFileName?: (param: {
		fileType: AvailableFileType;
		all: boolean | 'selection';
	}) => string;
	disableExport?: boolean;
	inlineAction: ReactNode;
	setRowSelected: (val: string[]) => void;
}

const CosmoTableInlineAction = <D extends object>({
	createHeaders,
	data,
	noDataMessage,
	exportFileName,
	disableExport,
	inlineAction,
	setRowSelected,
	toolbar
}: TableInlineActionProps<D>) => {
	const { t } = useTranslation('table');
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [grouping, setGrouping] = useState<string[]>([]);
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

			expanded
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGroupingChange: setGrouping,
		onExpandedChange: setExpanded,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
	const { getRowModel, getHeaderGroups, setPageIndex, setPageSize } = instance;
	const { exportData } = useExportTablePlugin(instance, exportFileName, disableExport);
	const renderBody = () => {
		const { rows } = getRowModel();
		return rows.length ? (
			rows.map(row => {
				return row.getCanExpand() ? (
					<TableExpandRow
						key={row.id}
						isExpanded={row.getIsExpanded()}
						ariaLabel=''
						onClick={row.getToggleExpandedHandler()}
						onExpand={() => null}
					>
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id}>
								{cell.getIsGrouped() && (
									<>
										{cell.renderCell()} ({row.subRows.length})
									</>
								)}
							</TableCell>
						))}
						<TableCell />
					</TableExpandRow>
				) : (
					<TableRow className='w-full'>
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
						<TableCell
							onClickCapture={() =>
								setRowSelected(
									row.getVisibleCells().map(cell => cell.getValue() as string)
								)
							}
						>
							{inlineAction}
						</TableCell>
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
			<CosmoTableToolbar<D>
				onExportClick={exportData}
				disableExport={grouping.length > 0 || data.length === 0}
				toolbarContent={toolbar?.toolbarContent}
			/>
			<Layer level={1}>
				<Table>
					<TableHead>
						{getHeaderGroups().map(headerGroup => {
							return (
								<TableRow key={headerGroup.id}>
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
												isSortable
												isSortHeader={
													header.column.getCanSort() && !!header.column.getIsSorted()
												}
											>
												<div className='flex items-center justify-between'>
													{!header.isPlaceholder && header.renderHeader()}
													{header.column.getCanGroup() && (
														<OverflowMenu
															ariaLabel='Overflow Menu'
															iconDescription='Menu'
														>
															<OverflowMenuItem
																itemText={
																	(header.column.getIsSorted() === 'desc' &&
																		t('original-sort')) ||
																	(header.column.getIsSorted() === 'asc' &&
																		t('sort-descending')) ||
																	t('sort-ascending')
																}
																onClick={header.column.getToggleSortingHandler()}
															/>

															<OverflowMenuItem
																hasDivider
																itemText={
																	header.column.getIsGrouped()
																		? t('remove-group')
																		: t('group-by')
																}
																onClick={header.column.getToggleGroupingHandler()}
															/>
														</OverflowMenu>
													)}
												</div>
											</TableHeader>
										);
									})}
									<TableRow />
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
export default CosmoTableInlineAction;
