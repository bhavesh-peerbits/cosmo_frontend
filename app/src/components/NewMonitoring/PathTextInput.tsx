import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput, Button, Layer } from '@carbon/react';
import { Add, TrashCan } from '@carbon/react/icons';

type PathTextInputProps = {
	inAccordion?: boolean;
};
const PathTextInput = ({ inAccordion }: PathTextInputProps) => {
	const { t } = useTranslation('changeMonitoring');

	const { control, register } = useForm();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'paths'
	});

	useEffect(() => {
		if (fields.length === 0) {
			append({});
		}
	}, [append, fields.length]);

	return (
		<div className='space-y-5'>
			{fields.map((field, index) => (
				<Layer>
					<div
						className={`flex items-end ${
							inAccordion ? 'space-y-5' : 'space-y-7'
						} space-x-5`}
					>
						<TextInput
							id={`path-${field.id}`}
							labelText='Path'
							key={field.id}
							{...register(`paths.${index}.value`)}
						/>
						<div className='space-x-3'>
							<Button
								hasIconOnly
								renderIcon={Add}
								size='md'
								kind='ghost'
								iconDescription={t('add-path')}
								onClick={() => append({})}
							/>

							<Button
								hasIconOnly
								renderIcon={TrashCan}
								kind='ghost'
								size='md'
								iconDescription={t('remove-path')}
								onClick={() => remove(index)}
							/>
						</div>
					</div>
				</Layer>
			))}
		</div>
	);
};
export default PathTextInput;
