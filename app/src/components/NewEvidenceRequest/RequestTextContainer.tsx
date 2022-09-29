import { Grid, Toggle } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RequestTextForm {
	requestText: string;
}

const RequestTextContainer = () => {
	const { t } = useTranslation('evidenceRequest');
	const { control } = useForm<RequestTextForm>({
		mode: 'onChange',
		defaultValues: {
			requestText: ''
		}
	});
	const {
		field: {
			onChange: onChangeDescription,
			value: descriptionValue,
			ref: descriptionRef,
			onBlur: onBlurDescription
		}
	} = useController({
		control,
		name: 'requestText'
	});
	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('request-text')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn className='text-text-secondary text-body-long-1'>
				<Toggle
					labelText={t('suggest-text')}
					aria-label='Sugget text toggle'
					id='suggest-toggle'
					labelB={t('yes')}
					labelA={t('no')}
				/>
			</FullWidthColumn>
			<FullWidthColumn>
				<TiptapEditor
					content={descriptionValue}
					onChange={onChangeDescription}
					onBlur={onBlurDescription}
					ref={descriptionRef}
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default RequestTextContainer;
