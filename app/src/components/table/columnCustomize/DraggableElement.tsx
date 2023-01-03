import { Draggable } from '@carbon/react/icons';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import cx from 'classnames';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';

const DRAG_TYPE = 'shared-ui-draggable-element';

const DraggableElement = ({
	id,
	index,
	listDataLength,
	children,
	type,
	disabled,
	ariaLabel,
	onGrab,
	onArrowKeyDown,
	isFocused,
	moveElement,
	selected,
	positionLabel = 'Current position {index} of {total}',
	grabbedLabel = '{itemName} grabbed.',
	droppedLabel = '{itemName} dropped.'
}: {
	ariaLabel: string;
	children: ReactNode;
	disabled?: boolean;
	droppedLabel?: string;
	grabbedLabel?: string;
	id: string;
	index: number;
	isFocused: boolean;
	listDataLength: number;
	moveElement: (dragIndex: number, hoverIndex: number) => void;
	onArrowKeyDown: (
		e: KeyboardEvent<HTMLLIElement>,
		isGrabbed: boolean,
		index: number
	) => void;
	onGrab: (text: string) => void;
	positionLabel?: string;
	selected?: boolean;
	type: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [{ handlerId, isOver }, drop] = useDrop({
		accept: DRAG_TYPE + type,
		collect: monitor => ({
			handlerId: monitor.getHandlerId(),
			isOver: monitor.isOver()
		}),
		drop: (item: { index: number }) => {
			moveElement(item.index, index);
		},
		canDrop: () => !disabled,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveElement(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			// eslint-disable-next-line no-param-reassign
			item.index = hoverIndex;
		}
	});

	const [{ isDragging }, drag] = useDrag({
		type: DRAG_TYPE + type,
		item: { id, index },
		canDrag: () => !disabled,
		collect: monitor => ({
			isDragging: monitor.isDragging(),
			handlerDragId: monitor.getHandlerId()
		})
	});

	useEffect(() => {
		if (isFocused && ref && ref.current) {
			ref.current.focus();
		}
	}, [isFocused]);

	const [isGrabbed, setIsGrabbed] = useState(false);
	drag(drop(ref));
	const content = (
		<>
			<div
				className={cx('mr-3 flex cursor-grab items-center', {
					disabled
				})}
			>
				<Draggable size={16} />
			</div>
			{children}
		</>
	);

	const opacity = isDragging ? 0 : 1;
	return (
		<li
			className={cx('flex h-9 border-b-[1px] border-solid border-layer-active-1 pl-5', {
				'border-1 border-b-1 border-dashed border-focus bg-layer-selected-hover-1':
					!disabled && isOver,
				'bg-highlight hover:bg-layer-selected-hover-1': isGrabbed,
				'bg-layer-selected-1 hover:bg-layer-selected-hover-1': selected && !isGrabbed,
				'hover:bg-layer-selected-1': !selected
			})}
			aria-selected={isFocused}
			role='option'
			tabIndex={isFocused ? 0 : -1}
			onKeyDown={e => {
				if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
					onArrowKeyDown(e, isGrabbed, index);
				}
				if (e.key === ' ' && e.target === e.currentTarget && !disabled) {
					const positionText = positionLabel
						.replace('{index}', `${index + 1}`)
						.replace('{total}', `${listDataLength}`);
					const grabAriaText = (isGrabbed ? droppedLabel : grabbedLabel).replace(
						'{itemName}',
						ariaLabel
					);
					onGrab(grabAriaText + positionText);
					setIsGrabbed(!isGrabbed);
					e.preventDefault();
				}
			}}
		>
			<span className='border-0 absolute h-0 w-0 overflow-hidden whitespace-nowrap'>
				{ariaLabel}
			</span>

			<div
				ref={ref}
				className='flex w-full items-center'
				data-handler-id={handlerId}
				style={{ opacity }}
			>
				{content}
			</div>
		</li>
	);
};

export default DraggableElement;
