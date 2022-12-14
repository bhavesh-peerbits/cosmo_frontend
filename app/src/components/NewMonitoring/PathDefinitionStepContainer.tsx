import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Layer, Button, TextInput } from '@carbon/react';
import { Information, Add, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const PathDefinitionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const [totalInput, setTotalInput] = useState<number[]>([0]);

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
			{sameSetup && (
				<FullWidthColumn className='space-y-5'>
					{totalInput.map((a, number) => (
						<Layer className='flex items-end space-x-5'>
							<TextInput id={`path-${number}`} labelText='Path' />
							<div className='space-x-3'>
								<Button
									hasIconOnly
									renderIcon={Add}
									size='md'
									iconDescription={t('add-path')}
									onClick={() => setTotalInput(old => [...old, old[old.length - 1] + 1])}
								/>
								<Button
									hasIconOnly
									renderIcon={TrashCan}
									kind='danger'
									size='md'
									iconDescription={t('remove-path')}
									onClick={() => setTotalInput(old => old.slice(0, old.length - 1))}
								/>
							</div>
						</Layer>
					))}
				</FullWidthColumn>
			)}
		</>
	);
};
export default PathDefinitionStepContainer;
