import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import { Button } from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OSScriptTileContent = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { t } = useTranslation('changeMonitoring');
	return (
		<div className='space-y-5'>
			<span className='text-productive-heading-3'>Script title</span>
			<div className='flex items-end justify-between space-x-5'>
				<span
					className={`${!isExpanded && ' h-[36px] line-clamp-2'} text-text-secondary `}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation. Lorem ipsum dolor sit amet , consectetur adipiscing elit,
					sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation.
				</span>
				<Button
					kind='ghost'
					size='sm'
					hasIconOnly
					iconDescription={t('show-more')}
					renderIcon={isExpanded ? ChevronUp : ChevronDown}
					onClick={e => {
						e.preventDefault();
						setIsExpanded(!isExpanded);
					}}
				/>
			</div>
		</div>
	);
};
export default OSScriptTileContent;
