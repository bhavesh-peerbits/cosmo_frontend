import { Form, Button, TextArea } from '@carbon/react';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
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
	const { register, handleSubmit } = useForm<StepUploadForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: step.stepInfo?.publicComment
		}
	});
	const handleSaveUpload = () => {};
	const handleCloseUpload = () => {};

	return (
		<div className='col-span-4'>
			<Form className=' space-y-5'>
				<TextArea labelText={t('public-comment')} {...register('publicComment')} />
				<p>UPLOAD FILE PLACEHOLDER</p>
				<div className='space-x-5 text-right'>
					<Button kind='tertiary' size='md' onClick={handleSubmit(handleSaveUpload)}>
						{t('save-upload')}
					</Button>
					<Button kind='primary' size='md' onClick={handleSubmit(handleCloseUpload)}>
						{t('close-upload')}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default EvidenceRequestUploadForm;
