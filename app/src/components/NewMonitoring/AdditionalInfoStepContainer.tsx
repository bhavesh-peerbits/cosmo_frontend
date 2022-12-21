import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AdditionalInfoStepContent from './AdditionalInfoStepContent';
import AssetExpandableTile from './AssetExpandableTile';

const AdditionalInfoStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);

	return (
		<FullWidthColumn className='space-y-7'>
			<FullWidthColumn>
				<Toggle
					aria-label='Additional info toggle'
					id='additional-info-toggle'
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
			{sameSetup ? (
				<AdditionalInfoStepContent />
			) : (
				<div>
					<AssetExpandableTile title='Asset'>
						<AdditionalInfoStepContent inTile />
					</AssetExpandableTile>
					<AssetExpandableTile title='Asset'>
						<AdditionalInfoStepContent inTile />
					</AssetExpandableTile>
				</div>
			)}
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContainer;
