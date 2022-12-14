import { Accordion, AccordionItem, TextInput, Button } from '@carbon/react';
import { Add, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AccordionAssetPathInput = () => {
	const { t } = useTranslation('changeMonitoring');
	const [totalInput, setTotalInput] = useState<{ id: number; text: string }[]>([
		{ id: 1, text: '' }
	]);

	return (
		<Accordion className='bg-layer-1'>
			<AccordionItem>
				{totalInput.map(el => (
					<div className='flex items-end space-x-5'>
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
					</div>
				))}
			</AccordionItem>
		</Accordion>
	);
};
export default AccordionAssetPathInput;
