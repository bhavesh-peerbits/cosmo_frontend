import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Layer, Button, TextInput } from '@carbon/react';
import { Information, Add, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AccordionAssetPathInput from './AccordionAssetPathInput';

const PathDefinitionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const [totalInput, setTotalInput] = useState<{ id: number; text: string }[]>([
		{ id: 1, text: '' }
	]);

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
			{sameSetup ? (
				<FullWidthColumn className='space-y-7'>
					{totalInput.map(el => (
						<Layer className='flex items-end space-x-5'>
							<TextInput
								id={`path-${el.id}`}
								labelText='Path'
								value={el.text || ''}
								onChange={e =>
									setTotalInput(old =>
										old.map(item => {
											if (item.id === el.id) {
												return {
													id: el.id,
													text: (e.target as HTMLInputElement).value || ''
												};
											}
											return item;
										})
									)
								}
							/>
							<div className='space-x-3'>
								{el.id === totalInput[totalInput.length - 1].id && (
									<Button
										hasIconOnly
										renderIcon={Add}
										size='md'
										kind='tertiary'
										iconDescription={t('add-path')}
										onClick={() =>
											setTotalInput(old => [
												...old,
												{ id: old[old.length - 1].id + 1, text: '' }
											])
										}
									/>
								)}
								{totalInput.length > 1 && (
									<Button
										hasIconOnly
										renderIcon={TrashCan}
										kind='danger'
										size='md'
										iconDescription={t('remove-path')}
										onClick={() =>
											setTotalInput(old => old.filter(element => element.id !== el.id))
										}
									/>
								)}
							</div>
						</Layer>
					))}
				</FullWidthColumn>
			) : (
				<FullWidthColumn>
					<AccordionAssetPathInput />
				</FullWidthColumn>
			)}
		</>
	);
};
export default PathDefinitionStepContainer;
