import {
	Layer,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableExpandHeader,
	TableHead,
	TableHeader,
	TableRow,
	TableSelectRow
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
import NoDataMessage from '@components/NoDataMessage';
import Centered from '@components/Centered';
import CosmoTableToolbar from './CosmoTableToolbar';

type HeaderFunction<T extends object> =
	CosmoTableRevalidationUsersProps<T>['createHeaders'];
interface CosmoTableRevalidationUsersProps<D extends object> {
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
	setRowSelected: (val: D) => void;
}

const CosmoTableRevalidationUsers = <D extends object>({
	createHeaders,
	data,
	noDataMessage,
	exportFileName,
	disableExport,
	inlineAction,
	setRowSelected,
	toolbar
}: CosmoTableRevalidationUsersProps<D>) => {
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
				return (
					<TableRow key={row.id}>
						<TableSelectRow
							checked={row.getIsSelected()}
							ariaLabel='Select'
							id={row.id}
							name={row.id}
							onSelect={row.getToggleSelectedHandler()}
							onChange={undefined}
						/>
						<TableCell />
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id}>{cell.renderCell()}</TableCell>
						))}
						<TableCell
							onClickCapture={() => row.original && setRowSelected(row.original)}
						>
							{inlineAction}
						</TableCell>
					</TableRow>
				);
			})
		) : (
			<TableRow>
				<TableCell colSpan={columns.length + 1}>
					<Centered>
						<NoDataMessage className='p-5' title={noDataMessage} />
					</Centered>
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
									<TableExpandHeader className='w-[40px]' />
									<TableExpandHeader className='w-[40px]' />
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
export default CosmoTableRevalidationUsers;
