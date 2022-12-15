import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import OSScriptListContainer from './OSScriptListContainer';

const ScriptSelectionStepContainer = () => {
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
							<Tooltip align='top' label='Inserisci descrizione'>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			<FullWidthColumn>
				<OSScriptListContainer />
			</FullWidthColumn>
		</>
	);
};
export default ScriptSelectionStepContainer;
