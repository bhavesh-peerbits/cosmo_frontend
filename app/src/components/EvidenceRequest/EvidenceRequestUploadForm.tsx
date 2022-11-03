import { Form, Button, TextArea } from '@carbon/react';
import UploaderS3 from '@components/util/UploaderS3';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface StepUploadForm {
	publicComment: string;
}

interface EvidenceReqUploadFormProps {
	step: EvidenceRequestStep;
}

const EvidenceRequestUploadForm = ({ step }: EvidenceReqUploadFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const [saveUpload, setSaveUpload] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { isDirty }
	} = useForm<StepUploadForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: step.stepInfo?.publicComment
		}
	});
	const handleCloseUpload = () => {};

	return (
		<div className='col-span-4'>
			<Form className=' space-y-5'>
				<TextArea labelText={t('public-comment')} {...register('publicComment')} />
				<UploaderS3 label='Drop' parentFormDirty={isDirty} />
				<div className='space-x-5 text-right'>
					<Button kind='tertiary' size='md' onClick={() => setSaveUpload(!saveUpload)}>
						{t('save-upload')}
					</Button>
					<Button
						kind='primary'
						size='md'
						onClick={handleSubmit(handleCloseUpload)}
						disabled={saveUpload}
					>
						{t('close-upload')}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default EvidenceRequestUploadForm;
