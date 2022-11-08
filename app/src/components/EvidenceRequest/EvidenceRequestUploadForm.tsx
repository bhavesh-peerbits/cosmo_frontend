import { Form, Button, TextArea } from '@carbon/react';
import ConfirmCloseStepUploadModal from '@components/Modals/ConfirmCloseStepUploadModal';
import UploaderS3 from '@components/util/UploaderS3';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

interface StepUploadForm {
	publicComment: string;
}

interface EvidenceReqUploadFormProps {
	step: EvidenceRequestStep;
	erId: string;
	path: string;
}

const EvidenceRequestUploadForm = ({ step, erId, path }: EvidenceReqUploadFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const [closeUploadInfo, setCloseUploadInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
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
	const handleCloseUpload = (data: StepUploadForm) => {
		setCloseUploadInfo(old => ({
			...old,
			isOpen: true,
			publicComment: data.publicComment
		}));
	};

	return (
		<div className='col-span-4'>
			<Form className=' space-y-5'>
				<TextArea labelText={t('public-comment')} {...register('publicComment')} />
				<UploaderS3
					label='Drop'
					parentFormDirty={isDirty}
					path={path}
					additionalInfo={{ stepId: `${step.id}` }}
					alreadyUploaded={step.fileLinks}
				/>
				<div className='space-x-5 text-right'>
					<Button
						kind='tertiary'
						size='md'
						onClick={() => setCloseUploadInfo(old => ({ ...old, saveUpload: true }))}
					>
						{t('save-upload')}
					</Button>
					<Button
						kind='primary'
						size='md'
						onClick={handleSubmit(handleCloseUpload)}
						disabled={closeUploadInfo.saveUpload}
					>
						{t('close-upload')}
					</Button>
				</div>
			</Form>
			<ConfirmCloseStepUploadModal erId={erId} step={step} />
		</div>
	);
};

export default EvidenceRequestUploadForm;
