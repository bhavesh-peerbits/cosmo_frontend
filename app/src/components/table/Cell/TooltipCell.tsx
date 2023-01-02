import { CellContext } from '@tanstack/react-table';
import { Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';

const TooltipCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as { content: string; description?: string };
	return (
		<div className='flex items-center space-x-2'>
			<span>{value.content}</span>
			<span>
				<Tooltip
					description={value.description ?? 'no description'}
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
