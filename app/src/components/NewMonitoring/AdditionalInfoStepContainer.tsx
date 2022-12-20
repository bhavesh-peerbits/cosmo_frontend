import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Accordion, AccordionItem } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AdditionalInfoStepContent from './AdditionalInfoStepContent';

const AdditionalInfoStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);

	return (
		<FullWidthColumn className='space-y-7'>
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
							<Tooltip align='top' label='Inserisci descrizione'>
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
				<Accordion>
					<AccordionItem>
						<AdditionalInfoStepContent inAccordion />
					</AccordionItem>
				</Accordion>
			)}
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContainer;
