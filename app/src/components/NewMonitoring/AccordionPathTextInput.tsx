import { TextInput, Button, Layer, Checkbox } from '@carbon/react';
import { Edit, Checkmark, Reset } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PathTextInput from './PathTextInput';

type AccordionPathTextInputProps = {
	sameSetup?: boolean;
	assetPaths: string[];
};
const AccordionPathTextInput = ({
	sameSetup,
	assetPaths
}: AccordionPathTextInputProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const [pathToEdit, setPathToEdit] = useState<string>();

	return (
		<div className='space-y-5'>
			{sameSetup && <PathTextInput />}
			{assetPaths.map(path => (
				<Layer className='flex items-end space-x-5'>
					<div className='flex items-center space-x-5'>
						<Checkbox id={path} labelText='' hideLabel />
						<TextInput
							id={path}
							labelText='Path'
							hideLabel
							defaultValue={path}
							readOnly={pathToEdit !== path}
						/>
					</div>
					<div className='space-x-3'>
						<Button
							hasIconOnly
							renderIcon={pathToEdit !== path ? Edit : Checkmark}
							size='md'
							kind={pathToEdit !== path ? 'tertiary' : 'primary'}
							iconDescription={t('modals:edit')}
							onClick={() => {
								setPathToEdit(path);
								document.getElementById(path)?.focus();
							}}
						/>
						{pathToEdit === path && (
							<Button
								hasIconOnly
								renderIcon={Reset}
								size='md'
								kind='secondary'
								iconDescription={t('evidenceRequest:reset')}
								onClick={() => {
									setPathToEdit(path);
									document.getElementById(path)?.focus();
								}}
							/>
						)}
					</div>
				</Layer>
			))}
		</div>
	);
};
export default AccordionPathTextInput;
