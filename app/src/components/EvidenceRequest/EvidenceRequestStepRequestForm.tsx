import { Form, Button, TextArea, Layer } from '@carbon/react';
import ConfirmCloseStepUploadModal from '@components/Modals/ConfirmCloseStepUploadModal';
import TipTapEditor from '@components/tiptap/TiptapEditor';
import UploaderS3 from '@components/util/UploaderS3';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

export interface StepRequestForm {
	text: string;
	publicComment: string;
	privateComment: string;
}

interface EvidenceReqStepRequestFormProps {
	step: EvidenceRequestStep;
	erId: string;
	path: string;
}

const EvidenceRequestStepRequestForm = ({
	step,
	erId,
	path
}: EvidenceReqStepRequestFormProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals', 'userRevalidation']);
	const [closeUploadInfo, setCloseUploadInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { isDirty }
	} = useForm<StepRequestForm>({
		mode: 'onChange',
		defaultValues: {
			text: step.text,
			publicComment: step.stepInfo?.publicComment,
			privateComment: step.stepInfo?.privateComment
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
		name: 'text'
	});
	const handleCloseUpload = (data: StepRequestForm) => {
		setCloseUploadInfo(old => ({
			...old,
			isOpen: true,
			publicComment: data.publicComment,
			privateComment: data.privateComment,
			requestText: data.text
		}));
	};

	return (
		<Layer>
			<div className='col-span-4 bg-layer-2 p-5'>
				<Form className=' space-y-5'>
					<Layer className='space-y-5 '>
						<p className='text-productive-heading-3'>
							{t('evidenceRequest:request-text')}
						</p>
						<div className='h-max-[400px] mt-6'>
							<TipTapEditor
								content={descriptionValue}
								onChange={onChangeDescription}
								onBlur={onBlurDescription}
								ref={descriptionRef}
								className='max-h-[300px] overflow-y-auto'
							/>
						</div>
						<TextArea
							labelText={t('evidenceRequest:public-comment')}
							className='mt-5'
							{...register('publicComment')}
						/>
						<TextArea
							labelText={t('evidenceRequest:private-comment')}
							className='mt-5'
							{...register('privateComment')}
						/>
						<UploaderS3
							label={t('userRevalidation:upload-instructions')}
							parentFormDirty={isDirty}
							path={path}
							additionalInfo={{ stepId: `${step.id}` }}
							alreadyUploaded={step.fileLinks}
						/>
					</Layer>
					<div className='space-x-5 text-right'>
						<Button
							kind='tertiary'
							size='md'
							onClick={() => setCloseUploadInfo(old => ({ ...old, saveUpload: true }))}
							disabled={closeUploadInfo.isLoading || !closeUploadInfo.isDirty}
						>
							{t('evidenceRequest:save-upload')}
						</Button>
						<Button
							kind='primary'
							size='md'
							onClick={handleSubmit(handleCloseUpload)}
							disabled={closeUploadInfo.saveUpload}
						>
							{t('evidenceRequest:send-request')}
						</Button>
					</div>
				</Form>
				<ConfirmCloseStepUploadModal erId={erId} step={step} reset={reset} />
			</div>
		</Layer>
	);
};

export default EvidenceRequestStepRequestForm;
