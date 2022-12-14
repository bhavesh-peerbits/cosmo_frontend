/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableExpandHeader, TableHeader, TableRow } from '@carbon/react';
import { ColumnOrderState, HeaderGroup } from '@tanstack/react-table';
import { useCallback } from 'react';
import ColumnHeader from './ColumnHeader';
import SelectAllHeader from './SelectAllHeader';

interface TableHeadersProps<T> {
	headerGroups: HeaderGroup<T>[];
	columnOrder: ColumnOrderState;
	setColumnOrder: (columnOrder: ColumnOrderState) => void;
	isSelectable: boolean | undefined | 'radio';
	hasColumnsDraggable: boolean | undefined;
	getIsAllRowsSelected: () => boolean;
	getIsSomeRowsSelected: () => boolean;
	getIsAllPageRowsSelected: () => boolean;
	getToggleAllRowsSelectedHandler: (event: unknown) => void;
	getToggleAllPageRowsSelectedHandler: (event: unknown) => void;
	isExpandable: boolean | undefined;
	table: any;
	showFilter: boolean;
}

const TableHeaders = <T extends object>({
	headerGroups,
	isSelectable,
	getIsAllRowsSelected,
	getIsSomeRowsSelected,
	getIsAllPageRowsSelected,
	getToggleAllRowsSelectedHandler,
	getToggleAllPageRowsSelectedHandler,
	isExpandable,
	table,
	showFilter
}: TableHeadersProps<T>) => {
	const isTheLastHeaderGroup = useCallback(
		(index: number) => {
			return index === headerGroups.length - 1;
		},
		[headerGroups]
	);

	return (
		<>
			{headerGroups.map((headerGroup, index) => (
				<TableRow key={headerGroup.id}>
					{isExpandable && <TableExpandHeader />}
					{isSelectable &&
						(isSelectable !== 'radio' && isTheLastHeaderGroup(index) ? (
							<SelectAllHeader
								{...{
									getIsAllRowsSelected,
									getIsSomeRowsSelected,
									getIsAllPageRowsSelected,
									getToggleAllRowsSelectedHandler,
									getToggleAllPageRowsSelectedHandler
								}}
							/>
						) : (
							<TableHeader scope='col' />
						))}
					{headerGroup.headers.map(header =>
						header.isPlaceholder ? (
							<TableHeader key={header.id} scope='col' />
						) : (
							<ColumnHeader
								key={header.id}
								header={header}
								table={table}
								showFilter={showFilter}
							/>
						)
					)}
				</TableRow>
			))}
		</>
	);
};

export default TableHeaders;
