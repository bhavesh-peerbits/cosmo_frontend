import {
	Checkbox,
	TableCell,
	TableRow,
	TableSelectRow,
	OverflowMenu,
	OverflowMenuItem
} from '@carbon/react';
import { flexRender, Row } from '@tanstack/react-table';
import { NoDataEmptyState } from '@carbon/ibm-products';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Centered from '../Centered';
import ExpandableRow from './ExpandableRow';
import ExpandableButton from './ExpandableButton';
import { InlineActions } from './types/InlineActionType';

interface TableInnerBodyProps<T> {
	rows: Row<T>[];
	// columns: ColumnDef<T>[];
	// addingInline: boolean;
	// isInlineAdd?: boolean;
	// setAddingInline: (addingInline: boolean) => void;
	tableId: string;
	colSize: number;
	isSelectable: boolean | undefined | 'radio';
	noDataMessage: string | undefined;
	noDataMessageSubtitle?: string;
	isExpandable: boolean | undefined;
	SubComponent?: FC<{ row: Row<T> }>;
	inlineActions?: InlineActions<T>[];
}

const TableInnerBody = <T extends object>({
	rows,
	tableId,
	colSize,
	isSelectable,
	noDataMessage,
	isExpandable,
	SubComponent,
	noDataMessageSubtitle,
	inlineActions
}: // columns,
// addingInline,
// setAddingInline,
// isInlineAdd
TableInnerBodyProps<T>) => {
	const { t } = useTranslation('table');
	return rows.length ? (
		<>
			{/* {addingInline && isInlineAdd && (
				<RowInlineAdd columns={columns} setAddingInline={setAddingInline} />
			)} */}

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
							if (inlineActions?.length && index === visibleCells.length - 1) return null;
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
										{cell.getIsGrouped() && <>({row.subRows.length})</>}
									</div>
								</TableCell>
							);
						})}
						{inlineActions && (
							<TableCell key='action'>
								<div
									className='flex h-full w-full items-center'
									style={{
										paddingLeft: `${row.depth * 2}rem`
									}}
								>
									<OverflowMenu
										ariaLabel='Actions'
										iconDescription={t('actions')}
										direction='top'
										flipped
									>
										{inlineActions.map(action => (
											<OverflowMenuItem
												itemText={
													<div className='flex space-x-3'>
														{action.icon && action.icon}
														<div>{action.label}</div>
													</div>
												}
												onClick={() => action.onClick(row)}
											/>
										))}
									</OverflowMenu>
								</div>
							</TableCell>
						)}
					</ExpandableRow>
				);
			})}
		</>
	) : (
		<TableRow>
			<TableCell colSpan={colSize + 1}>
				<Centered>
					<NoDataEmptyState
						subtitle={
							noDataMessageSubtitle ||
							'No data found for this table, try changing your filters or try again later.'
						}
						title={noDataMessage || 'No data'}
					/>
					{/* <NoDataMessage className="p-5" title={noDataMessage} /> */}
				</Centered>
			</TableCell>
		</TableRow>
	);
};

export default TableInnerBody;
