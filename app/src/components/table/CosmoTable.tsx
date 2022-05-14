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
	ColumnDef,
	ColumnSort,
	createTable,
	getCoreRowModel,
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
import { CellProperties, CosmoTableToolbarProps } from '@components/table/types';
import NoDataMessage from '@components/NoDataMessage';
import Centered from '@components/Centered';
import CosmoTableToolbar from './CosmoTableToolbar';

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
	toolbar?:
		| Pick<CosmoTableToolbarProps<D>, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
	noDataMessage?: string;
	isSelectable?: boolean;
}

const CosmoTable = <D extends object>({
	createHeaders,
	data,
	toolbar,
	noDataMessage,
	isSelectable
}: ApplicationsTableProps<D>) => {
	const { t } = useTranslation('table');
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<ColumnSort[]>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
		pageCount: undefined //  allows the table to calculate the page count for us via instance.getPageCount()
	});

	const table = createTable().setRowType<D>();
	const columns = useMemo(() => createHeaders(table), [createHeaders, table]);
	const {
		toggleAllRowsSelected,
		getSelectedRowModel,
		getIsAllRowsSelected,
		getIsSomeRowsSelected,
		getToggleAllRowsSelectedHandler,
		getRowModel,
		getHeaderGroups,
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
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	const renderBody = () => {
		const { rows } = getRowModel();
		return rows.length ? (
			rows.map(row => {
				return (
					<TableRow key={row.id}>
						{isSelectable && (
							<TableSelectRow
								checked={row.getIsSelected()}
								ariaLabel='Select'
								id={row.id}
								name={row.id}
								onSelect={row.getToggleSelectedHandler()}
								onChange={undefined}
							/>
						)}
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id}>{cell.renderCell()}</TableCell>
						))}
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
			{toolbar && (
				<CosmoTableToolbar<D>
					selectionIds={
						getSelectedRowModel()
							.flatRows.map(row => row.original)
							.filter(r => r) as D[]
					}
					onCancel={() => toggleAllRowsSelected(false)}
					toolbarBatchActions={toolbar.toolbarBatchActions}
					toolbarContent={toolbar.toolbarContent}
				/>
			)}
			<Layer level={1}>
				<Table>
					<TableHead>
						{getHeaderGroups().map(headerGroup => {
							return (
								<TableRow key={headerGroup.id}>
									{isSelectable && (
										<th className='relative'>
											<TableSelectAll
												ariaLabel='SelectAll'
												id='selectAll'
												className='absolute top-1/2 left-0 -translate-y-1/2'
												name='selectAll'
												checked={getIsAllRowsSelected()}
												indeterminate={getIsSomeRowsSelected()}
												onSelect={getToggleAllRowsSelectedHandler()}
												onChange={undefined}
											/>
										</th>
									)}
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
export default CosmoTable;
