import useSaveStepAndGoNext from '@api/evidence-request/useSaveStepAndGoNext';
import { Modal, InlineLoading } from '@carbon/react';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

type ConfirmCloseStepUploadModalProps = {
	erId: string;
	step: EvidenceRequestStep;
};

const ConfirmCloseStepUploadModal = ({
	erId,
	step
}: ConfirmCloseStepUploadModalProps) => {
	const { t } = useTranslation('modals');
	const [confirmCloseInfo, setConfirmCloseInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const cleanUp = useCallback(() => {
		setConfirmCloseInfo(old => ({ ...old, isOpen: false, uploadSuccess: false }));
	}, [setConfirmCloseInfo]);

	const { mutate } = useSaveStepAndGoNext();

	const handleCloseUploadStep = () => {
		setConfirmCloseInfo(old => ({ ...old, saveUpload: true }));
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
			modalHeading={t('confirm-close-upload')}
			onRequestClose={cleanUp}
			onRequestSubmit={handleCloseUploadStep}
			primaryButtonText={
				confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess ? (
					<div>
						{t('uploading')}
						<InlineLoading />
					</div>
				) : (
					t('close')
				)
			}
			primaryButtonDisabled={
				confirmCloseInfo.saveUpload && !confirmCloseInfo.uploadSuccess
			}
			secondaryButtonText={t('cancel')}
			size='sm'
		/>
	);
};

export default ConfirmCloseStepUploadModal;
