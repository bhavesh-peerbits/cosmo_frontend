import { Tile } from '@carbon/react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import { ReactNode, useState } from 'react';

type AssetExpandableTileProps = {
	children: ReactNode;
	title: ReactNode;
};
const AssetExpandableTile = ({ children, title }: AssetExpandableTileProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<Tile
			className={`flex items-center border-b-1 border-solid border-border-subtle-1 bg-layer-3 py-0 ${
				!isExpanded && 'hover:bg-layer-hover-3'
			}`}
			onClick={e => e.stopPropagation()}
		>
			<div className='w-full space-y-3'>
				<div className='flex h-[64px] w-full items-center space-x-5'>
					{isExpanded ? (
						<ChevronUp
							className='hover:cursor-pointer'
							onClick={() => setIsExpanded(!isExpanded)}
						/>
					) : (
						<ChevronDown
							className='hover:cursor-pointer'
							onClick={() => setIsExpanded(!isExpanded)}
						/>
					)}

					<div className='w-full'>
						<span className='w-full text-heading-1'>{title}</span>
					</div>
				</div>
				{isExpanded && <div className='pb-6 pl-7'>{children}</div>}
			</div>
		</Tile>
	);
};
export default AssetExpandableTile;
