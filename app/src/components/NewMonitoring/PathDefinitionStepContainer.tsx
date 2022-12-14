import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

const PathDefinitionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	return (
		<FullWidthColumn>
			<Toggle
				aria-label='Path toggle'
				id='path-toggle'
				labelA={t('different')}
				labelB={t('same')}
				labelText={
					<div className='flex space-x-3'>
						<p className='text-label-1'>{t('asset-setup-toggle')}</p>
						<Tooltip align='top' label='Inserisci descrizione'>
							<button type='button' onClick={e => e.preventDefault()}>
								<Information />
							</button>
						</Tooltip>
					</div>
				}
			/>
		</FullWidthColumn>
	);
};
export default PathDefinitionStepContainer;
