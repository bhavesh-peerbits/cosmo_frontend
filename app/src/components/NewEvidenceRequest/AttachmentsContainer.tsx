import { Grid } from '@carbon/react';
import CosmoFileUploader from '@components/CosmoFileUploader';
import FullWidthColumn from '@components/FullWidthColumn';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormData = {
	file: File[];
};
const AttachmentsContainer = () => {
	const { t } = useTranslation('evidenceRequest');
	const { control } = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});
	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('attachments')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>{t('attachments-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<CosmoFileUploader
					label='Prova'
					name='file'
					rules={{
						required: true
					}}
					control={control}
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default AttachmentsContainer;
