import { ChevronDown } from '@carbon/react/icons';
import cx from 'classnames';
import { Row } from '@tanstack/react-table';

interface ExpandableButtonProps<T> {
	canExpand: boolean | undefined;
	row: Row<T>;
}

const ExpandableButton = <T extends object>({
	canExpand,
	row
}: ExpandableButtonProps<T>) => {
	return canExpand ? (
		<button type='button' className='h-7 w-7' onClick={row.getToggleExpandedHandler()}>
			<ChevronDown
				style={{
					transition:
						'transform 150ms cubic-bezier(.2,0,.38,.9),-webkit-transform 150ms cubic-bezier(.2,0,.38,.9)'
				}}
				className={cx({
					'-rotate-180': row.getIsExpanded()
				})}
			/>
		</button>
	) : (
		<div className={cx({ 'h-7 w-7': row.depth !== 0 })} />
	);
};

export default ExpandableButton;
