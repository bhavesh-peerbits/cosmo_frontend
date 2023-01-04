import { ReactNode, useState } from 'react';
import { Button } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TooltipPosition } from '@carbon/react/typings/shared';

type CosmoFiltersPanelProps = {
	children: ReactNode;
	iconDescription?: string;
	tooltipPosition?: TooltipPosition;
};
const CosmoFiltersPanel = ({
	children,
	iconDescription,
	tooltipPosition
}: CosmoFiltersPanelProps) => {
	const { t } = useTranslation('userSelect');
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
				tooltipPosition={tooltipPosition}
				iconDescription={iconDescription || t('filters')}
			/>
			{isOpen && (
				<div
					className='absolute z-[999999] mt-[40px] h-fit w-fit bg-layer-1 p-4'
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
