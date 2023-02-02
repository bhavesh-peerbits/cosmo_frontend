import { CellContext } from '@tanstack/react-table';
import { Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';

interface TooltipCellProps {
	info: CellContext<any, unknown>;
	description?: string;
}

const TooltipCell = ({ info, description }: TooltipCellProps) => {
	const value = info.getValue() as string;
	return (
		<div className='flex items-center space-x-2'>
			<span>{value}</span>
			<span>
				<Tooltip
					description={description ?? 'no description'}
					align='top'
					className='mt-2'
				>
					<button type='button'>
						<Information />
					</button>
				</Tooltip>
			</span>
		</div>
	);
};
export default TooltipCell;
