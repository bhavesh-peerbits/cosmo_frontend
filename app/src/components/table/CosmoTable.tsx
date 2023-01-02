import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@carbon/react';
import {
	ColumnDef,
	ColumnOrderState,
	ExpandedState,
	FilterFn,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	RowSelectionState,
	useReactTable,
	VisibilityState
} from '@tanstack/react-table';
import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import cx from 'classnames';
import { useBoolean, useDebounce, useMount, useUnmount, useUpdateEffect } from 'ahooks';
import { rankItem } from '@tanstack/match-sorter-utils';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import useExportTablePlugin from '@hooks/useExportTablePlugin';
// import { TearsheetNarrow } from '@carbon/ibm-products';
import TablePagination from './TablePagination';
import CosmoTableToolbarAction from './types/CosmoTableToolbarAction';
import CosmoTableToolbarMenu from './types/CosmoTableToolbarMenu';
import AvailableFileType from './types/FileType';
import TableSize from './types/TableSize';
import TableHeaders from './TableHeaders';
import TableInnerBody from './TableInnerBody';
import TableBodySkeleton from './TableBodySkeleton';
import CosmoTableToolbar from './CosmoTableToolbar';
import TableFormTearsheet from './TableFormTearsheet';

interface ToolbarProps<T extends object> {
	searchBar?: boolean;
	toolbarBatchActions: CosmoTableToolbarAction<T>[];
	toolbarTableMenus: CosmoTableToolbarMenu[];
	primaryButton?: {
		label: ReactNode;
		onClick: () => void;
	};
}

type SubRows<T> = object & {
	subRows?: T[];
};

interface CosmoTableProps<T extends SubRows<T>> {
	columns: ColumnDef<T>[];
	data: T[];
	tableId: string;
	isSelectable?: boolean | 'radio';
	isExpandable?: boolean;
	isColumnOrderingEnabled?: boolean;
	// isInlineAdd?: boolean;
	exportFileName?: (param: {
		fileType: AvailableFileType;
		all: boolean | 'selection';
	}) => string;
	disableExport?: boolean;
	noDataMessage?: string;
	toolbar?: ToolbarProps<T>;
	title?: string;
	description?: string;
	serverSidePagination?: boolean;
	subComponent?: FC<{ row: Row<T> }>;
	onRowSelection?: (selectedRows: Row<T>[]) => void;
	size?: TableSize;
	showSizeOption?: boolean;
	defaultSelectedRows?: RowSelectionState;
	canAdd?: boolean;
	canEdit?: boolean;
	canDelete?: boolean;
	// modalContent?: FC<{ row: Row<T> | undefined; closeModal: () => void; edit: boolean }>;
	onDelete?: (rows: Row<T>[]) => void;
}

const tableSizes: Record<TableSize, { value: number; label: string }> = {
	xs: {
		value: 24,
		label: 'Extra small'
	},
	sm: {
		value: 32,
		label: 'Small'
	},
	md: {
		value: 40,
		label: 'Medium'
	},
	lg: {
		value: 48,
		label: 'Large'
	},
	xl: {
		value: 64,
		label: 'Extra large'
	}
};

const CosmoTable = <T extends SubRows<T>>({
	columns,
	data: tableData,
	isSelectable,
	isExpandable,
	isColumnOrderingEnabled,
	canAdd = false,
	// isInlineAdd = false,
	canEdit = false,
	canDelete = false,
	// modalContent,
	noDataMessage,
	exportFileName,
	disableExport,
	title,
	description,
	tableId,
	serverSidePagination,
	toolbar = {} as ToolbarProps<T>,
	subComponent,
	onRowSelection,
	defaultSelectedRows,
	size = 'md',
	showSizeOption,
	onDelete
}: CosmoTableProps<T>) => {
	const data = useMemo(() => tableData, [tableData]);

	const tableContainerRef = useRef<HTMLDivElement>(null);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [tableSize, setTableSize] = useState<TableSize>(size);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	// const [addingInline, setAddingInline] = useState(false);

	const {
		pagination,
		sorting,
		status,
		setPagination,
		setSorting,
		resetPagination,
		setColumnFilters,
		columnFiltersState
	} = usePaginationStore(tableId);

	useUpdateEffect(() => setRowSelection({}), [isSelectable]);
	useUnmount(() => {
		resetPagination();
	});

	// FILTER
	const [showFilter, { toggle: toggleShowFilter }] = useBoolean(false);
	const fuzzyFilter: FilterFn<T> = useCallback((row, columnId, value, addMeta) => {
		// Rank the item
		const itemRank = rankItem(row.getValue(columnId), value);

		// Store the itemRank info
		addMeta({
			itemRank
		});

		// Return if the item should be filtered in/out
		return itemRank.passed;
	}, []);

	const [globalFilterState, setGlobalFilter] = useState('');
	const globalFilter = useDebounce(globalFilterState, { wait: 500 });
	const columnFilters = useDebounce(columnFiltersState, { wait: 500 });

	const table = useReactTable({
		data,
		columns,
		autoResetPageIndex: false,
		manualPagination: Boolean(serverSidePagination),
		manualFiltering: Boolean(serverSidePagination),
		columnResizeMode: 'onChange',
		enableMultiRowSelection: isSelectable !== 'radio',
		filterFns: {
			fuzzy: fuzzyFilter
		},
		globalFilterFn: fuzzyFilter,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		state: {
			columnFilters,
			globalFilter,
			pagination,
			sorting,
			rowSelection,
			columnVisibility,
			columnOrder,
			expanded
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onRowSelectionChange: setRowSelection,
		onExpandedChange: setExpanded,
		getSubRows: row => row.subRows,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getExpandedRowModel: getExpandedRowModel()
	});
	const { exportData } = useExportTablePlugin(table, exportFileName, disableExport);
	const { rows } = table.getRowModel();
	const headerGroups = table.getHeaderGroups();
	const allLeafColumns = table.getAllLeafColumns();

	const rowVirtualizer = useVirtualizer({
		getScrollElement: () => tableContainerRef.current,
		count: rows.length,
		overscan: 20,
		estimateSize: () => tableSizes[tableSize].value
	});

	const { getVirtualItems, getTotalSize } = rowVirtualizer;
	const virtualRows = getVirtualItems();
	const totalSize = getTotalSize();
	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;
	const selectedRows = table.getSelectedRowModel().flatRows;
	useEffect(() => {
		onRowSelection?.(selectedRows);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRows]);

	// const ModalContent = modalContent;

	useMount(() => {
		table.setColumnVisibility(
			Object.fromEntries(
				allLeafColumns.map(c => [c.id, c.columnDef.meta?.initialVisible ?? true])
			)
		);
	});

	useEffect(() => {
		setRowSelection(defaultSelectedRows || {});
	}, [defaultSelectedRows]);

	return (
		<>
			<TableContainer title={title} description={description}>
				<CosmoTableToolbar
					disableExport={disableExport}
					searchBar={toolbar?.searchBar}
					onExportClick={exportData}
					onSearch={value => setGlobalFilter(value)}
					selectionRows={selectedRows}
					onCancel={() => table.toggleAllRowsSelected(false)}
					toolbarTableMenus={toolbar?.toolbarTableMenus}
					toolbarBatchActions={toolbar?.toolbarBatchActions}
					primaryButton={toolbar?.primaryButton}
					allColumns={allLeafColumns}
					isColumnOrderingEnabled={isColumnOrderingEnabled}
					selectedSize={tableSize}
					sizeOptions={showSizeOption ? tableSizes : undefined}
					changeTableSize={setTableSize}
					onFilterClick={toggleShowFilter}
					setIsModalOpen={setIsModalOpen}
					// isAddingInline={isInlineAdd}
					// addingInline={addingInline}
					// setAddingInline={setAddingInline}
					canAdd={canAdd}
					canEdit={canEdit}
					canDelete={canDelete}
					onDelete={onDelete}
					setColumnOrder={table.setColumnOrder}
					setColumnVisibility={table.setColumnVisibility}
				/>
				<div className='relative overflow-hidden'>
					<div
						ref={tableContainerRef}
						className='max-h-[70vh] overflow-auto bg-transparent'
					>
						<Table
							size={tableSize}
							className={cx('relative z-[2]', {
								invisible: status?.isLoading
							})}
						>
							<TableHead className='sticky top-0 z-[2]'>
								<TableHeaders
									getIsAllRowsSelected={table.getIsAllRowsSelected}
									getIsSomeRowsSelected={table.getIsSomeRowsSelected}
									getToggleAllRowsSelectedHandler={table.getToggleAllRowsSelectedHandler()}
									getToggleAllPageRowsSelectedHandler={table.getToggleAllPageRowsSelectedHandler()}
									getIsAllPageRowsSelected={table.getIsAllPageRowsSelected}
									isSelectable={isSelectable}
									headerGroups={headerGroups}
									isExpandable={isExpandable && Boolean(subComponent)}
									table={table}
									showFilter={showFilter}
								/>
							</TableHead>
							<TableBody>
								{paddingTop > 0 && (
									<TableRow>
										<TableCell style={{ height: `${paddingTop}px` }} />
									</TableRow>
								)}
								<TableInnerBody
									// addingInline={addingInline}
									// setAddingInline={setAddingInline}
									// columns={columns}
									// isInlineAdd={isInlineAdd}
									rows={virtualRows.map(v => rows[v.index])}
									isSelectable={isSelectable}
									tableId={tableId}
									colSize={allLeafColumns.length}
									noDataMessage={noDataMessage}
									isExpandable={isExpandable}
									SubComponent={subComponent}
								/>
								{paddingBottom > 0 && (
									<TableRow>
										<TableCell style={{ height: `${paddingBottom}px` }} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div
						className={cx('absolute top-0 left-0 bottom-5 right-5 overflow-hidden', {
							'z-[1]': !status?.isLoading
						})}
					>
						<TableBodySkeleton
							tableSize={tableSize}
							isSelectable={isSelectable === true}
							isExpandable={isExpandable}
							headerGroups={headerGroups}
							allLeafColumns={allLeafColumns}
						/>
					</div>
				</div>
				{data.length > 10 && (
					<TablePagination tableId={tableId} dataLength={status?.total ?? data.length} />
				)}
			</TableContainer>
			<TableFormTearsheet
				isOpen={isModalOpen}
				setIsOpen={() => setIsModalOpen(false)}
				columns={columns}
			/>
			{/* <TearsheetNarrow open={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
			{/* <ComposedModal open={isModalOpen} preventCloseOnClickOutside>
				{ModalContent && (
					<ModalContent
						closeModal={() => setIsModalOpen(false)}
						row={table.getSelectedRowModel().flatRows?.[0]}
						edit={Boolean(table.getSelectedRowModel().flatRows?.[0])}
					/>
				)}
			</ComposedModal> */}
		</>
	);
};

export default CosmoTable;
