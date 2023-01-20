/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Checkbox } from '@carbon/react';
import cx from 'classnames';
import { Column, flexRender } from '@tanstack/react-table';
import update from 'immutability-helper';
import DraggableElement from '@components/table/columnCustomize/DraggableElement';

export type ColumnType<T extends object> = {
	id: string;
	visible: boolean;
	column: Column<T, unknown>;
};

const getNextIndex = (array: unknown[], currentIndex: number, key: string) => {
	let newIndex = -1;
	if (key === 'ArrowUp') {
		newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : array.length - 1;
	}
	if (key === 'ArrowDown') {
		newIndex = currentIndex + 1 < array.length ? currentIndex + 1 : 0;
	}
	return newIndex;
};

const Columns = <T extends object>({
	visibleColumnsCount,
	filterString,
	columns,
	setColumnsObject,
	onSelectColumn,
	assistiveTextInstructionsLabel,
	assistiveTextDisabledInstructionsLabel,
	selectAllLabel
}: {
	assistiveTextDisabledInstructionsLabel?: string;
	assistiveTextInstructionsLabel?: string;
	columns: ColumnType<T>[];
	filterString: string;
	visibleColumnsCount: number;
	onSelectColumn: (column: ColumnType<T>[], checked: boolean) => void;
	selectAllLabel?: string;
	setColumnsObject: (updated: ColumnType<T>[]) => void;
}) => {
	const [ariaRegionText, setAriaRegionText] = useState('');
	const [focusIndex, setFocusIndex] = useState(-1);
	const moveElement = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragCard = columns[dragIndex];
			// TODO fix
			setColumnsObject(
				update(columns, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard]
					]
				})
			);
		},
		[columns, setColumnsObject]
	);

	return (
		<div className='relative -mx-5 overflow-auto'>
			<DndProvider backend={HTML5Backend}>
				<ol
					className='customize-columns-column-list--focus'
					role='listbox'
					aria-describedby='customize-columns--instructions'
					onKeyDown={e => {
						const nextIndex = getNextIndex(columns, focusIndex, e.key);
						if (nextIndex >= 0) {
							setFocusIndex(nextIndex);
							e.preventDefault();
							e.stopPropagation();
						}
					}}
					tabIndex={0}
					onFocus={e => {
						if (e.target === e.currentTarget) {
							setFocusIndex(0);
						}
					}}
				>
					<span
						aria-live='assertive'
						className='b-0 absolute h-0 w-0 overflow-hidden whitespace-nowrap p-0'
					>
						{ariaRegionText}
					</span>
					<span
						id='customize-columns--instructions'
						className='b-0 absolute h-0 w-0 overflow-hidden whitespace-nowrap p-0'
					>
						{filterString.length === 0
							? assistiveTextInstructionsLabel
							: assistiveTextDisabledInstructionsLabel}
					</span>
					<div
						id='customize-columns-select-all'
						className={cx(
							'flex h-9 border-b-[1px] border-solid border-layer-active-1 pl-8 hover:bg-layer-selected-1',
							{
								'bg-layer-selected-1 hover:bg-layer-selected-hover-1':
									visibleColumnsCount > 0
							}
						)}
					>
						<Checkbox
							className='justify-center'
							checked={visibleColumnsCount === columns.length}
							indeterminate={
								visibleColumnsCount < columns.length && visibleColumnsCount > 0
							}
							onChange={() => {
								onSelectColumn(columns, visibleColumnsCount !== columns.length);
							}}
							id='customization-column-select-all'
							labelText={selectAllLabel}
						/>
					</div>
					{columns.map((colDef, i) => (
						<DraggableElement
							key={colDef.id}
							index={i}
							listDataLength={columns.length}
							id={`dnd-datagrid-columns-${colDef.id}`}
							type='column-customization'
							disabled={filterString.length > 0}
							ariaLabel={colDef.id}
							onGrab={setAriaRegionText}
							isFocused={focusIndex === i}
							moveElement={moveElement}
							onArrowKeyDown={(e, isGrabbed, currentIndex) => {
								if (isGrabbed) {
									const nextIndex = getNextIndex(columns, currentIndex, e.key);
									e.preventDefault();
									e.stopPropagation();
									if (nextIndex >= 0) {
										setFocusIndex(nextIndex);
										moveElement(currentIndex, nextIndex);
										(e.target as Element).scrollIntoView({
											block: 'center'
										});
									}
								}
							}}
							selected={colDef.visible}
						>
							<Checkbox
								className={cx(
									`__customize-columns-checkbox-wrapper`,
									`$__customize-columns-checkbox`
								)}
								checked={colDef.visible}
								onChange={(_, { checked }) => onSelectColumn([colDef], checked)}
								id={`__customization-column-${colDef.id}`}
								labelText={flexRender(colDef.column.columnDef.header, {
									// @ts-ignore
									header: { column: colDef.column }
								})}
								title={colDef.id}
							/>
						</DraggableElement>
					))}
				</ol>
			</DndProvider>
		</div>
	);
};
export default Columns;
