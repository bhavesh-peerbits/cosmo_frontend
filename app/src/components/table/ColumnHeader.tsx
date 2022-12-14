import cx from 'classnames';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { TableHeader } from '@carbon/react';
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
			<div
				className='h-full overflow-hidden text-ellipsis whitespace-nowrap leading-normal'
				style={{ width: header.getSize() }}
			>
				<span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
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
