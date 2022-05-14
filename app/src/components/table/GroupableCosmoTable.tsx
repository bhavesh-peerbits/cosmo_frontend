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
	Overwrite,
	PaginationState,
	Render,
	Table as TableType,
	useTableInstance
} from '@tanstack/react-table';
import { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CellProperties } from '@components/table/types';

type HeaderFunction<T extends object> = ApplicationsTableProps<T>['createHeaders'];

interface ApplicationsTableProps<D extends object> {
	createHeaders: (
		table: TableType<
			Overwrite<
				{ Renderer: Render; Rendered: ReactNode | JSX.Element; Row: unknown },
				{ Row: D }
			>
		>
	) => Array<
		ColumnDef<
			Overwrite<
				{ Renderer: Render; Rendered: ReactNode | JSX.Element; Row: unknown },
				{ Row: D }
			>
		>
	>;
	data: D[];
	noDataMessage?: string;
}

const GroupableCosmoTable = <D extends object>({
	createHeaders,
	data,
	noDataMessage
}: ApplicationsTableProps<D>) => {
	const { t } = useTranslation('table');
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [grouping, setGrouping] = useState<string[]>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<ColumnSort[]>([]);

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
		pageCount: undefined // allows the table to calculate the page count for us via instance.getPageCount()
	});

	const table = createTable().setRowType<D>();
	const columns = useMemo(() => createHeaders(table), [createHeaders, table]);
	const { getRowModel, getHeaderGroups, setPageIndex, setPageSize } = useTableInstance(
		table,
		{
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
		}
	);

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
															iconDescription='action'
														>
															<OverflowMenuItem
																itemText={
																	(header.column.getIsSorted() === 'desc' &&
																		'Original sort') ||
																	(header.column.getIsSorted() === 'asc' &&
																		'Sord Descending') ||
																	'Sord Ascending'
																}
																onClick={() => header.column.toggleSorting()}
															/>

															<OverflowMenuItem
																hasDivider
																itemText={
																	header.column.getIsGrouped()
																		? 'Remove Group'
																		: 'Group by'
																}
																onClick={() => header.column.toggleGrouping()}
															/>
														</OverflowMenu>
													)}
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
