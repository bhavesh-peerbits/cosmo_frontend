import {
	Layer,
	Link,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableExpandHeader,
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
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	AvailableFileType,
	CellProperties,
	ExportProperties,
	CosmoTableToolbarProps,
	TB
} from '@components/table/types';
import useExportTablePlugin from '@hooks/useExportTablePlugin';
import CosmoTableToolbar from './CosmoTableToolbar';

type HeaderFunction<T extends object> = GroupedTableProps<T>['createHeaders'];

interface GroupedTableProps<D extends object> {
	createHeaders: (table: TableType<TB<D>>) => Array<ColumnDef<TB<D>>>;
	data: D[];
	noDataMessage?: string;
	exportFileName?: (param: { fileType: AvailableFileType }) => string;
	disableExport?: boolean;
	toolbar?:
		| Pick<CosmoTableToolbarProps<D>, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
}

const GroupedCosmoTable = <D extends object>({
	createHeaders,
	data,
	noDataMessage,
	exportFileName,
	disableExport,
	toolbar
}: GroupedTableProps<D>) => {
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
	const { getRowModel, getHeaderGroups, setPageIndex, setPageSize } = instance;
	const { exportData } = useExportTablePlugin(instance, exportFileName, disableExport);
	const renderBody = () => {
		const { rows } = getRowModel();
		return rows.length ? (
			rows.map(row => {
				return (
					<TableRow className='w-full' key={row.id}>
						<TableCell />
						<TableCell>
							<Link href='/campaign-name'>{row.getVisibleCells()[0].renderCell()}</Link>
						</TableCell>
						{row
							.getVisibleCells()
							.slice(1)
							.map(cell => (
								<TableCell key={cell.id}>
									{(cell.getIsGrouped() && (
										<Link href='/campaign-name'>{cell.id}</Link>
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
												onClick={header.column.getToggleSortingHandler()}
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
export default GroupedCosmoTable;
