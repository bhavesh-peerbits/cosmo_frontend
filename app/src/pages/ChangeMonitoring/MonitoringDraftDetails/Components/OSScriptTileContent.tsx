import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import { Button } from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Script from '@model/ChangeMonitoring/Script';

type OSScriptTileContentProps = {
	script: Script;
};
const OSScriptTileContent = ({ script }: OSScriptTileContentProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { t } = useTranslation('changeMonitoring');

	return (
		<div className='space-y-5'>
			<span className='text-productive-heading-3'>{script.name}</span>
			<div className='flex items-end justify-between space-x-5'>
				<span
					id={`description-${script.id}`}
					className={`${!isExpanded && 'h-[36px] line-clamp-2'} text-text-secondary `}
				>
					{script.description}
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
