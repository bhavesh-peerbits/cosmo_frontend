import { flexRender, Header } from '@tanstack/react-table';
import { TableHeader } from '@carbon/react';
import cx from 'classnames';

interface ColumnHeaderProps<T> {
	header: Header<T, unknown>;
}

const ColumnHeader = <T extends object>({ header }: ColumnHeaderProps<T>) => {
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
		</TableHeader>
	);
};
export default ColumnHeader;
