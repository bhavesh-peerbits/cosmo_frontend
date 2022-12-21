import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AssetExpandableTile from './AssetExpandableTile';

const PathDefinitionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);

	return (
		<>
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('different')}
					labelB={t('same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('asset-setup-toggle')}</p>
							<Tooltip align='top' label={t('same-setup-additional-info')}>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='space-y-7'>
				{sameSetup && <p>table for same setup goes here</p>}
				<div>
					<AssetExpandableTile title='Asset'>table goes here</AssetExpandableTile>
					<AssetExpandableTile title='Asset'>table goes here</AssetExpandableTile>
				</div>
			</FullWidthColumn>
		</>
	);
};
export default PathDefinitionStepContainer;
