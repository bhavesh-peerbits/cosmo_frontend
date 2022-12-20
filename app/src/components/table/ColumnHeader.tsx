import { flexRender, Header, Table } from '@tanstack/react-table';
import { TableHeader, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import HeaderFilter from './HeaderFilter';

interface ColumnHeaderProps<T> {
	header: Header<T, unknown>;
	table?: Table<T>;
	showFilter?: boolean;
}

const ColumnHeader = <T extends object>({
	header,
	table,
	showFilter
}: ColumnHeaderProps<T>) => {
	const { t } = useTranslation('table');
	return (
		<TableHeader
			key={header.id}
			className={cx('apply-border relative', {
				'is-nobutton': !header.column.getCanSort()
			})}
			colSpan={header.colSpan}
			sortDirection={header.column.getIsSorted() === 'desc' ? 'DESC' : 'ASC'}
			onClick={header.column.getToggleSortingHandler()}
			scope='col'
			isSortable={header.column.getCanSort()}
			isSortHeader={header.column.getCanSort() && !!header.column.getIsSorted()}
		>
			<div className='h-full overflow-hidden ' style={{ width: header.getSize() }}>
				<div className='flex items-center justify-between'>
					<div className='text-ellipsis whitespace-nowrap leading-normal'>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</div>
					<div className='mr-3'>
						<OverflowMenu ariaLabel='Overflow Menu' iconDescription='Menu'>
							<OverflowMenuItem
								itemText={
									(header.column.getNextSortingOrder() === 'desc' &&
										t('sort-descending')) ||
									(header.column.getNextSortingOrder() === 'asc' &&
										t('sort-ascending')) ||
									t('original-sort')
								}
								onClick={header.column.getToggleSortingHandler()}
							/>

							{header.column.getCanGroup() && (
								<OverflowMenuItem
									hasDivider
									itemText={
										header.column.getIsGrouped() ? t('remove-group') : t('group-by')
									}
									onClick={header.column.getToggleGroupingHandler()}
								/>
							)}
						</OverflowMenu>
					</div>
				</div>
			</div>

			<div
				aria-label='Draggable'
				onMouseDown={header.getResizeHandler()}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				onKeyDown={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				role='button'
				tabIndex={0}
				onTouchStart={header.getResizeHandler()}
				className='display-block absolute top-0 right-0 z-10 h-full w-2 cursor-col-resize bg-transparent'
				style={{
					transform: 'translateX(50%)'
				}}
			/>
			{header.column.getCanFilter() && table && showFilter && (
				<HeaderFilter column={header.column} table={table} />
			)}
		</TableHeader>
	);
};
export default ColumnHeader;
