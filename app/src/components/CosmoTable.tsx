import {
	Layer,
	Table,
	TableBatchAction,
	TableBatchActions,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableSelectAll,
	TableSelectRow,
	TableToolbar,
	TableToolbarContent
} from '@carbon/react';
import { Column, useRowSelect, useSortBy, useTable } from 'react-table';
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface CosmoTableToolbarProps {
	selectionIds: number;
	onCancel: () => void;
	toolbarBatchActions: Array<{
		id: string;
		icon: (() => ReactElement) | ReactElement;
		label: string;
		onClick: () => void;
	}>;
	toolbarContent?: ReactNode;
}
const CosmoTableToolbar = ({
	selectionIds,
	onCancel,
	toolbarBatchActions,
	toolbarContent
}: CosmoTableToolbarProps) => {
	const { t } = useTranslation('table');
	return (
		<TableToolbar>
			<TableBatchActions
				onCancel={onCancel}
				totalSelected={selectionIds}
				shouldShowBatchActions={selectionIds > 0}
				translateWithId={t}
			>
				{toolbarBatchActions.map(action => (
					<TableBatchAction
						key={action.id}
						renderIcon={action.icon}
						onClick={action.onClick}
					>
						{action.label}
					</TableBatchAction>
				))}
			</TableBatchActions>
			{toolbarContent && <TableToolbarContent>{toolbarContent}</TableToolbarContent>}
		</TableToolbar>
	);
};

interface ApplicationsTableProps<D extends object> {
	columns: Column<D>[];
	data: D[];
	toolbar:
		| Pick<CosmoTableToolbarProps, 'toolbarContent' | 'toolbarBatchActions'>
		| undefined;
	noDataMessage?: string;
}

const CosmoTable = <D extends object>({
	columns,
	data,
	toolbar,
	noDataMessage
}: ApplicationsTableProps<D>) => {
	const { t } = useTranslation('table');
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		getToggleAllRowsSelectedProps,
		toggleAllRowsSelected,
		state: { selectedRowIds }
	} = useTable(
		{
			columns,
			data
		},
		useSortBy,
		useRowSelect
	);

	return (
		<TableContainer>
			{toolbar && (
				<CosmoTableToolbar
					selectionIds={Object.keys(selectedRowIds).length}
					onCancel={() => toggleAllRowsSelected(false)}
					toolbarBatchActions={toolbar.toolbarBatchActions}
					toolbarContent={toolbar.toolbarContent}
				/>
			)}
			<Layer level={1}>
				<Table {...getTableProps()}>
					<TableHead>
						{headerGroups.map(headerGroup => {
							const properties = getToggleAllRowsSelectedProps();
							return (
								<TableRow {...headerGroup.getHeaderGroupProps()}>
									<TableSelectAll
										{...properties}
										ariaLabel='SelectAll'
										id='selectAll'
										name='selectAll'
										onSelect={properties.onChange}
										onChange={undefined}
									/>
									{headerGroup.headers.map(column =>
										column.id === 'selection' ? (
											<>{column.render('Header')}</>
										) : (
											<TableHeader
												{...column.getHeaderProps(column.getSortByToggleProps())}
												sortDirection={column.isSortedDesc ? 'DESC' : 'ASC'}
												scope=''
												isSortable
												isSortHeader={column.isSorted}
											>
												{column.render('Header')}
											</TableHeader>
										)
									)}
								</TableRow>
							);
						})}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{rows.length === 0 && (
							<TableRow>
								<TableCell colSpan={columns.length + 1}>
									<p className='flex justify-center'>{noDataMessage || t('no-data')}</p>
								</TableCell>
							</TableRow>
						)}
						{rows.map(row => {
							prepareRow(row);
							const properties = row.getToggleRowSelectedProps();
							return (
								<TableRow {...row.getRowProps()}>
									<TableSelectRow
										{...properties}
										ariaLabel='Select'
										id={row.id}
										name={row.id}
										onSelect={properties.onChange}
										onChange={undefined}
									/>
									{row.cells.map(cell =>
										cell.column.id === 'selection' ? (
											<>{cell.render('Cell')}</>
										) : (
											<TableCell {...cell.getCellProps()}>
												{cell.render('Cell')}
											</TableCell>
										)
									)}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Layer>
		</TableContainer>
	);
};
export default CosmoTable;
