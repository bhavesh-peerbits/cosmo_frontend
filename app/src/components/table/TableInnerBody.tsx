import { Checkbox, TableCell, TableRow, TableSelectRow } from '@carbon/react';
import { flexRender, Row } from '@tanstack/react-table';
import { NoDataEmptyState } from '@carbon/ibm-products';
import { FC } from 'react';
import Centered from '../Centered';
import ExpandableRow from './ExpandableRow';
import ExpandableButton from './ExpandableButton';

interface TableInnerBodyProps<T> {
	rows: Row<T>[];
	tableId: string;
	colSize: number;
	isSelectable: boolean | undefined | 'radio';
	noDataMessage: string | undefined;
	isExpandable: boolean | undefined;
	SubComponent?: FC<{ row: Row<T> }>;
}

const TableInnerBody = <T extends object>({
	rows,
	tableId,
	colSize,
	isSelectable,
	noDataMessage,
	isExpandable,
	SubComponent
}: TableInnerBodyProps<T>) => {
	return rows.length ? (
		<>
			{rows.map(row => {
				const visibleCells = row.getVisibleCells();

				return (
					<ExpandableRow
						isExpandable={isExpandable}
						key={row.id + tableId}
						row={row}
						colSpan={visibleCells.length + 1}
						SubComponent={SubComponent}
					>
						{isSelectable &&
							(row.subRows.length > 0 ? (
								<TableCell>
									{isSelectable !== 'radio' && (
										<Checkbox
											checked={row.getIsSelected()}
											id={row.id + tableId}
											indeterminate={row.getIsSomeSelected()}
											name={row.id + tableId}
											onClick={row.getToggleSelectedHandler()}
											labelText=''
										/>
									)}
								</TableCell>
							) : (
								<TableSelectRow
									ariaLabel='Select'
									id={row.id + tableId}
									name={row.id + tableId}
									onSelect={row.getToggleSelectedHandler()}
									checked={row.getIsSelected()}
									radio={isSelectable === 'radio'}
								/>
							))}

						{visibleCells.map((cell, index) => {
							return (
								<TableCell key={cell.id}>
									<div
										className='flex h-full w-full items-center'
										style={{
											paddingLeft: `${row.depth * 2}rem`
										}}
									>
										{index === 0 && (
											<ExpandableButton
												canExpand={isExpandable && index === 0 && row.getCanExpand()}
												row={row}
											/>
										)}
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								</TableCell>
							);
						})}
					</ExpandableRow>
				);
			})}
		</>
	) : (
		<TableRow>
			<TableCell colSpan={colSize + 1}>
				<Centered>
					<NoDataEmptyState
						subtitle='No data found for this table, try changing your filters or try again later.'
						title={noDataMessage || 'No data'}
					/>
					{/* <NoDataMessage className="p-5" title={noDataMessage} /> */}
				</Centered>
			</TableCell>
		</TableRow>
	);
};

export default TableInnerBody;
