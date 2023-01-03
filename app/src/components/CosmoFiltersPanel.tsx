import { ReactNode, useState } from 'react';
import { Button } from '@carbon/react';
import { Filter } from '@carbon/react/icons';

type CosmoFiltersPanelProps = {
	children: ReactNode;
};
const CosmoFiltersPanel = ({ children }: CosmoFiltersPanelProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='flex justify-end'>
			<Button
				size='md'
				kind='ghost'
				renderIcon={Filter}
				hasIconOnly
				style={
					isOpen
						? {
								boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
						  }
						: {}
				}
				onClick={() => setIsOpen(!isOpen)}
			/>
			{isOpen && (
				<div
					className='absolute z-[999999] mt-[40px] h-fit w-fit bg-layer-1'
					style={{
						boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};
export default CosmoFiltersPanel;
