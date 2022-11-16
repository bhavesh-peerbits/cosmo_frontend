import useSaveStepAndGoNext from '@api/evidence-request/useSaveStepAndGoNext';
import useSaveStepAndGoNextAnalyst from '@api/evidence-request/useSaveStepAndGoNextAnalyst';
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
	const { mutate: mutateAnalyst, isLoading: isLoadaingAnalyst } =
		useSaveStepAndGoNextAnalyst();
	const { type } = step;
	const handleCloseUploadStep = () => {
		if (confirmCloseInfo.isDirty) {
			setConfirmCloseInfo(old => ({ ...old, saveUpload: true }));
		} else {
			const stepMutate = step;
			stepMutate.text = confirmCloseInfo.requestText || '';
			stepMutate.stepInfo = {
				publicComment: confirmCloseInfo.publicComment,
				privateComment: confirmCloseInfo.privateComment
			};
			step.type === 'REQUEST'
				? mutateAnalyst({ erId, step: stepMutate }, { onSuccess: cleanUp })
				: mutate({ erId, step: stepMutate }, { onSuccess: cleanUp });
		}
	};

	useEffect(() => {
		if (confirmCloseInfo.uploadSuccess) {
			const stepMutate = step;
			stepMutate.text = confirmCloseInfo.requestText || '';
			stepMutate.stepInfo = {
				publicComment: confirmCloseInfo.publicComment,
				privateComment: confirmCloseInfo.privateComment
			};
			setConfirmCloseInfo(old => ({ ...old, uploadSuccess: false }));
			step.type === 'REQUEST'
				? mutateAnalyst({ erId, step: stepMutate }, { onSuccess: cleanUp })
				: mutate({ erId, step: stepMutate }, { onSuccess: cleanUp });
		}
	}, [
		erId,
		mutate,
		step,
		confirmCloseInfo.uploadSuccess,
		cleanUp,
		confirmCloseInfo.publicComment,
		confirmCloseInfo.requestText,
		confirmCloseInfo.privateComment,
		setConfirmCloseInfo,
		mutateAnalyst
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
				isLoadaingAnalyst ||
				isLoading ||
				(confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess) ? (
					<div>
						{type === 'UPLOAD' ? t('uploading') : t('save')}
						<InlineLoading />
					</div>
				) : (
					t('close')
				)
			}
			primaryButtonDisabled={
				isLoadaingAnalyst ||
				isLoading ||
				(confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess)
			}
			secondaryButtonText={t('cancel')}
			size='sm'
		/>
	);
};

export default ConfirmCloseStepUploadModal;
