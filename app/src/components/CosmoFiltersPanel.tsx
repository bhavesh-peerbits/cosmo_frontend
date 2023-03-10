import { ReactNode, useState } from 'react';
import { Button } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TooltipPosition } from '@carbon/react/typings/shared';

type CosmoFiltersPanelProps = {
	children: ReactNode;
	iconDescription?: string;
	tooltipPosition?: TooltipPosition;
	flipped?: boolean;
	buttonSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};
const CosmoFiltersPanel = ({
	children,
	iconDescription,
	tooltipPosition,
	flipped,
	buttonSize
}: CosmoFiltersPanelProps) => {
	const { t } = useTranslation('userSelect');
	const [isOpen, setIsOpen] = useState(false);

	// TODO Fix close panel when click outside (resolve DatePicker Calendar)
	// useEffect(() => {
	// 	window.addEventListener('click', e => {
	// 		if (document.getElementById('cosmo-filters-panel')?.contains(e.target as Node)) {
	// 			return null;
	// 		}
	// 		return setIsOpen(false);
	// 	});
	// }, []);
	const getButtonHeight = () => {
		switch (buttonSize) {
			case 'sm':
				return '32px';
			case 'md':
				return '40px';
			case 'lg':
				return '48px';
			default:
				return '48px';
		}
	};

	return (
		<div
			className={`flex ${flipped ? 'justify-start' : 'justify-end'}`}
			id='cosmo-filters-panel'
		>
			<Button
				size={buttonSize}
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
					className='absolute z-[999] inline-block max-h-[calc(67%-2rem)] overflow-auto bg-layer-1 p-3'
					style={{
						boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
						marginTop: getButtonHeight()
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};
export default CosmoFiltersPanel;
