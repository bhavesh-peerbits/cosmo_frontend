/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Button,
	RadioButton,
	TableBatchAction,
	TableBatchActions,
	TableToolbar,
	TableToolbarAction,
	TableToolbarContent,
	TableToolbarMenu,
	TableToolbarSearch
} from '@carbon/react';
import {
	Column,
	ColumnOrderState,
	Row,
	RowData,
	VisibilityState
} from '@tanstack/react-table';
import { ReactNode, useMemo } from 'react';
import {
	Add,
	Csv,
	DocumentPdf,
	Column as ColumnIcon,
	Edit,
	FilterEdit,
	TableBuilt,
	TableSplit,
	TrashCan,
	Xls
} from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useBoolean } from 'ahooks';
import CosmoTableToolbarAction from './types/CosmoTableToolbarAction';
import CosmoTableToolbarMenu from './types/CosmoTableToolbarMenu';
import TableSize from './types/TableSize';
import ExportSelectionAction from './ExportSelectionAction';
import AvailableFileType from './types/FileType';
import CustomizeColumnsModal from './columnCustomize/CustomizeColumnsModal';
import TableFilters from './filter/TableFilters';

interface CosmoTableToolbarProps<T extends object> {
	selectionRows: Row<T>[];
	onCancel: () => void;
	toolbarBatchActions: CosmoTableToolbarAction<T>[] | undefined;
	toolbarTableMenus: CosmoTableToolbarMenu[] | undefined;
	primaryButton?: {
		label: ReactNode;
		onClick: () => void;
	};
	disableToolbarBatchAction?: boolean;
	allColumns: Column<T, RowData>[];
	onExportClick: (fileType: AvailableFileType, all?: boolean | 'selection') => void;
	disableExport?: boolean;
	searchBar: boolean | undefined;
	isColumnOrderingEnabled: boolean | undefined;
	selectedSize: TableSize;
	sizeOptions: Record<TableSize, { value: number; label: string }> | undefined;
	changeTableSize: (size: TableSize) => void;
	setIsModalOpen: (isModalOpen: boolean) => void;
	canAdd?: boolean;
	// addingInline: boolean;
	// setAddingInline: (addingInline: boolean) => void;
	// isAddingInline?: boolean;
	canEdit?: boolean;
	canDelete?: boolean;
	onDelete?: (rows: Row<T>[]) => void;
	onSearch: (value: string) => void;
	setColumnOrder: (columnOrder: ColumnOrderState) => void;
	setColumnVisibility: (visibilityState: VisibilityState) => void;
	tableId: string;
}

const CosmoTableToolbar = <T extends object>({
	selectionRows,
	onCancel,
	searchBar,
	// setAddingInline,
	// isAddingInline,
	// addingInline,
	allColumns,
	onExportClick,
	isColumnOrderingEnabled,
	disableExport,
	selectedSize,
	sizeOptions,
	changeTableSize,
	onSearch,
	primaryButton,
	disableToolbarBatchAction,
	toolbarBatchActions = [],
	toolbarTableMenus = [],
	setIsModalOpen,
	canAdd,
	canEdit,
	canDelete,
	onDelete,
	setColumnOrder,
	setColumnVisibility,
	tableId
}: CosmoTableToolbarProps<T>) => {
	const { t } = useTranslation('table');
	const [openModal, { toggle: toggleOpen }] = useBoolean(false);
	const [openFilter, { toggle: toggleFilter, setFalse: filterFalse }] = useBoolean(false);
	const selectionElements = useMemo(
		() => selectionRows.map(row => row.original).filter(r => r),
		[selectionRows]
	);

	const toolbarBatchActionsWithEditAndDelete = [
		...toolbarBatchActions,
		...(canEdit && selectionRows.length === 1
			? [
					{
						id: 'edit',
						label: 'Edit',
						onClick: () => {
							setIsModalOpen(true);
						},
						icon: Edit
					}
			  ]
			: []),
		...(canDelete
			? [
					{
						id: 'delete',
						label: 'Delete',
						onClick: () => onDelete && onDelete(selectionRows),
						icon: TrashCan
					}
			  ]
			: [])
	];

	const actions = useMemo(
		() => [
			{
				id: 'export-all',
				menuLabel: t('download-all'),
				menuIcon: <TableBuilt />,
				actions: [
					{
						id: 'export-all-pdf',
						label: t('download-pdf'),
						icon: <DocumentPdf />,
						onClick: () => onExportClick('pdf', true)
					},
					{
						id: 'export-all-xls',
						label: t('download-xlsx'),
						icon: <Xls />,
						onClick: () => onExportClick('xlsx', true)
					},
					{
						id: 'export-all-csv',
						label: t('download-csv'),
						icon: <Csv />,
						onClick: () => onExportClick('csv', true)
					}
				]
			},
			{
				id: 'export-current',
				menuLabel: t('download-current'),
				menuIcon: <TableSplit />,
				actions: [
					{
						id: 'export-current-pdf',
						label: t('download-pdf'),
						icon: <DocumentPdf />,
						onClick: () => onExportClick('pdf')
					},
					{
						id: 'export-current-xls',
						label: t('download-xlsx'),
						icon: <Xls />,
						onClick: () => onExportClick('xlsx')
					},
					{
						id: 'export-current-csv',
						label: t('download-csv'),
						icon: <Csv />,
						onClick: () => onExportClick('csv')
					}
				]
			}
		],
		[onExportClick, t]
	);

	return (
		<TableToolbar>
			<TableBatchActions
				onCancel={onCancel}
				totalSelected={selectionElements.length}
				shouldShowBatchActions={
					selectionElements.length > 0 && !disableToolbarBatchAction
				}
				translateWithId={t}
			>
				{toolbarBatchActionsWithEditAndDelete.map(action => (
					<TableBatchAction
						key={action.id}
						renderIcon={action.icon as JSX.Element}
						onClick={() => {
							action.onClick(selectionElements);
							onCancel();
						}}
						disabled={action.disabled}
					>
						{action.label}
					</TableBatchAction>
				))}
				<ExportSelectionAction exportFn={onExportClick} />
			</TableBatchActions>
			<TableToolbarContent>
				{searchBar && (
					<TableToolbarSearch
						size='lg'
						placeholder='Search'
						id='search'
						expanded
						onChange={e => onSearch(e.currentTarget?.value)}
					/>
				)}

				{actions.map(action => (
					<TableToolbarMenu
						key={action.id}
						iconDescription={action.menuLabel}
						renderIcon={() => action.menuIcon}
						ariaLabel={action.menuLabel}
						disabled={disableExport}
					>
						{action.actions.map(subAction => (
							<TableToolbarAction
								key={subAction.id}
								onClick={subAction.onClick}
								itemText={
									<div className='flex items-center justify-between space-x-5'>
										<div>{subAction.icon}</div>
										<span>{subAction.label}</span>
									</div>
								}
							/>
						))}
					</TableToolbarMenu>
				))}
				{toolbarTableMenus.map(menu => (
					<TableToolbarMenu
						key={menu.id}
						renderIcon={menu.icon}
						iconDescription='Table toolbar menu'
						ariaLabel='Table toolbar menu'
						disabled={menu.disabled}
					>
						{menu.tableToolbarActions.map(action => (
							<TableToolbarAction
								key={action.id}
								onClick={action.onClick}
								itemText={action.label}
								disabled={action.disabled}
							/>
						))}
					</TableToolbarMenu>
				))}

				{isColumnOrderingEnabled && (
					<TableToolbarMenu
						onClick={() => toggleOpen()}
						open={openModal}
						renderIcon={() => <ColumnIcon />}
						iconDescription='Show filters'
						ariaLabel='Show Filters'
					>
						{null}
					</TableToolbarMenu>
				)}

				{sizeOptions && (
					<TableToolbarMenu iconDescription='Table size' ariaLabel='Table size option'>
						<div className='mb-3 flex w-full flex-col justify-center px-5 pt-5'>
							<span className='text-helper typography-label-1'>Row height</span>
						</div>
						{Object.entries(sizeOptions).map(([size, { label }]) => (
							<TableToolbarAction
								key={size}
								itemText={
									<RadioButton
										id={size}
										labelText={label}
										value={size}
										defaultChecked={selectedSize === size}
									/>
								}
								onClick={() => changeTableSize(size as TableSize)}
							/>
						))}
					</TableToolbarMenu>
				)}
				<TableToolbarMenu
					onClick={() => toggleFilter()}
					open={openFilter}
					onClose={filterFalse}
					renderIcon={() => <FilterEdit />}
					iconDescription='Show filters'
					ariaLabel='Show Filters'
				>
					<TableFilters
						tableId={tableId}
						onApplyFilters={filterFalse}
						allColumns={allColumns}
					/>
				</TableToolbarMenu>
				{canAdd && (
					<Button
						kind='primary'
						renderIcon={Add}
						iconDescription='Add'
						onClick={() => setIsModalOpen(true)}
					>
						{t('add-new')}
					</Button>
				)}
				{/* {canAdd && !addingInline ? (
					<Button
						kind='primary'
						renderIcon={Add}
						iconDescription='Add'
						onClick={() => {
							isAddingInline ? setAddingInline(true) : setIsModalOpen(true);
						}}
					>
						Add New
					</Button>
				) : (
					<>
						<Button hasIconOnly renderIcon={Checkmark} />
						<Button
							hasIconOnly
							renderIcon={TrashCan}
							kind='danger--ghost'
							onClick={() => setAddingInline(false)}
						/>
					</>
				)} */}
				{primaryButton && (
					<Button onClick={primaryButton.onClick}>{primaryButton.label}</Button>
				)}
			</TableToolbarContent>
			{isColumnOrderingEnabled && openModal && (
				<CustomizeColumnsModal
					isOpen={openModal}
					setIsModalOpen={() => toggleOpen()}
					onSaveColumnPrefs={newCol => {
						setColumnVisibility(
							newCol.reduce(
								(prev, curr) => ({
									...prev,
									[curr.id]: curr.visible
								}),
								{}
							)
						);
						setColumnOrder(newCol.map(col => col.id));
					}}
					columnDefinitions={allColumns}
				/>
			)}
		</TableToolbar>
	);
};

export default CosmoTableToolbar;
