import {
	OverflowMenu,
	TableBatchAction,
	TableBatchActions,
	TableToolbar,
	TableToolbarAction,
	TableToolbarContent,
	TableToolbarMenu
} from '@carbon/react';
import { Csv, DocumentPdf, TableBuilt, TableSplit, Xls } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { AvailableFileType, CosmoTableToolbarProps } from '@components/table/types';
import { TableGenerics } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useBoolean } from 'ahooks';

const ExportSelectionAction = ({
	exportFn
}: {
	exportFn: (fileType: AvailableFileType, all: 'selection') => void;
}) => {
	const [val, { setTrue, setFalse }] = useBoolean(false);
	const actions = [
		{
			id: 'pdf',
			label: 'Download as PDF',
			onClick: () => {
				exportFn('pdf', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		},
		{
			id: 'xlsx',
			label: 'Download as XLSX',
			onClick: () => {
				exportFn('xlsx', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		},
		{
			id: 'csv',
			label: 'Download as CSV',
			onClick: () => {
				exportFn('csv', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		}
	];
	return (
		<TableBatchAction renderIcon={TableSplit} onClick={() => setTimeout(() => setTrue())}>
			Export
			<OverflowMenu
				menuOffsetFlip={{ top: 20, left: -50 }}
				open={val}
				onClose={() => setFalse()}
				className='h-0 w-0 opacity-0'
				iconDescription=''
				ariaLabel=''
				flipped
			>
				{actions.map(action => (
					<li key={action.id}>
						<TableBatchAction
							className='z-[1] -mt-1 w-full outline outline-1'
							renderIcon={action.icon}
							onClick={action.onClick}
						>
							{action.label}
						</TableBatchAction>
					</li>
				))}
			</OverflowMenu>
		</TableBatchAction>
	);
};

const CosmoTableToolbar = <T extends TableGenerics>({
	selectionIds,
	onCancel,
	toolbarBatchActions,
	toolbarContent,
	onExportClick,
	disableExport
}: CosmoTableToolbarProps<T>) => {
	const { t } = useTranslation('table');
	const actions = useMemo(
		() => [
			{
				id: 'export-all',
				menuLabel: 'Download all data',
				menuIcon: <TableBuilt />,
				actions: [
					{
						id: 'export-all-pdf',
						label: 'Download as PDF',
						icon: <DocumentPdf />,
						onClick: () => onExportClick('pdf', true)
					},
					{
						id: 'export-all-xls',
						label: 'Download as XLSX',
						icon: <Xls />,
						onClick: () => onExportClick('xlsx', true)
					},
					{
						id: 'export-all-csv',
						label: 'Download as CSV',
						icon: <Csv />,
						onClick: () => onExportClick('csv', true)
					}
				]
			},
			{
				id: 'export-current',
				menuLabel: 'Download current view',
				menuIcon: <TableSplit />,
				actions: [
					{
						id: 'export-current-pdf',
						label: 'Download as PDF',
						icon: <DocumentPdf />,
						onClick: () => onExportClick('pdf')
					},
					{
						id: 'export-current-xls',
						label: 'Download as XLSX',
						icon: <Xls />,
						onClick: () => onExportClick('xlsx')
					},
					{
						id: 'export-current-csv',
						label: 'Download as CSV',
						icon: <Csv />,
						onClick: () => onExportClick('csv')
					}
				]
			}
		],
		[onExportClick]
	);

	return onCancel && selectionIds && toolbarBatchActions && toolbarContent ? (
		<TableToolbar>
			<TableBatchActions
				onCancel={onCancel}
				totalSelected={selectionIds.length}
				shouldShowBatchActions={selectionIds.length > 0}
				translateWithId={t}
			>
				{toolbarBatchActions.map(action => (
					<TableBatchAction
						key={action.id}
						renderIcon={action.icon}
						onClick={() => action.onClick(selectionIds)}
					>
						{action.label}
					</TableBatchAction>
				))}
				<ExportSelectionAction exportFn={onExportClick} />
			</TableBatchActions>
			{toolbarContent && (
				<TableToolbarContent>
					{toolbarContent}
					{actions.map(action => (
						<TableToolbarMenu
							key={action.id}
							iconDescription={action.menuLabel}
							renderIcon={() => action.menuIcon}
							ariaLabel={action.menuLabel}
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
				</TableToolbarContent>
			)}
		</TableToolbar>
	) : (
		<TableToolbarContent>
			{actions.map(
				action =>
					action.id === 'export-all' && (
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
					)
			)}
		</TableToolbarContent>
	);
};

export default CosmoTableToolbar;
