import useSaveStepAndGoNext from '@api/evidence-request/useSaveStepAndGoNext';
import { Modal, InlineLoading } from '@carbon/react';
import { StepUploadForm } from '@components/EvidenceRequest/EvidenceRequestUploadForm';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { useCallback, useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

type ConfirmCloseStepUploadModalProps = {
	erId: string;
	step: EvidenceRequestStep;
	reset: UseFormReset<StepUploadForm>;
};

const ConfirmCloseStepUploadModal = ({
	erId,
	step,
	reset
}: ConfirmCloseStepUploadModalProps) => {
	const { t } = useTranslation('modals');
	const [confirmCloseInfo, setConfirmCloseInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const cleanUp = useCallback(() => {
		setConfirmCloseInfo(old => ({ ...old, isOpen: false, uploadSuccess: false }));
		reset();
	}, [setConfirmCloseInfo, reset]);

	const { mutate, isLoading } = useSaveStepAndGoNext();
	const { type } = step;
	const handleCloseUploadStep = () => {
		if (confirmCloseInfo.isDirty) {
			setConfirmCloseInfo(old => ({ ...old, saveUpload: true }));
		} else {
			const stepMutate = step;
			stepMutate.stepInfo = {
				publicComment: confirmCloseInfo.publicComment,
				privateComment: confirmCloseInfo.privateComment
			};
			mutate({ erId, step }, { onSuccess: cleanUp });
		}
	};

	useEffect(() => {
		if (confirmCloseInfo.uploadSuccess) {
			const stepMutate = step;
			stepMutate.stepInfo = {
				publicComment: confirmCloseInfo.publicComment,
				privateComment: undefined
			};
			mutate({ erId, step }, { onSuccess: cleanUp });
		}
	}, [
		erId,
		mutate,
		step,
		confirmCloseInfo.uploadSuccess,
		cleanUp,
		confirmCloseInfo.publicComment
	]);

	return (
		<Modal
			open={confirmCloseInfo.isOpen}
			danger
			className='z-[9999] flex'
			modalHeading={
				type === 'UPLOAD' ? t('confirm-close-upload') : t('confirm-close-request')
			}
			onRequestClose={cleanUp}
			onRequestSubmit={handleCloseUploadStep}
			primaryButtonText={
				isLoading || (confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess) ? (
					<div>
						{type === 'UPLOAD' ? t('uploading') : t('save')}
						<InlineLoading />
					</div>
				) : (
					t('close')
				)
			}
			primaryButtonDisabled={
				isLoading || (confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess)
			}
			secondaryButtonText={t('cancel')}
			size='sm'
		/>
	);
};

export default ConfirmCloseStepUploadModal;
