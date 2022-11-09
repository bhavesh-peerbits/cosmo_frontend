import useDeleteFileFromStep from '@api/uploaders3/useDeleteFileFromStep';
import { Modal } from '@carbon/react';
import { useTranslation } from 'react-i18next';

type DeleteFileS3ModalProps = {
	deleteInfo: { isOpen: boolean; fileId: string | undefined; stepId: string | undefined };
	setDeleteInfo: (value: {
		isOpen: boolean;
		fileId: string | undefined;
		stepId: string | undefined;
	}) => void;
};

const DeleteFileS3Modal = ({ deleteInfo, setDeleteInfo }: DeleteFileS3ModalProps) => {
	const { t } = useTranslation('modals');
	const cleanUp = () => {
		setDeleteInfo({ fileId: undefined, isOpen: false, stepId: undefined });
	};
	const { mutate: mutateDelete } = useDeleteFileFromStep();

	const handleDeleteFile = () => {
		deleteInfo.fileId &&
			deleteInfo.stepId &&
			mutateDelete({ fileId: deleteInfo.fileId, stepId: deleteInfo.stepId });
	};

	return (
		<Modal
			open={deleteInfo.isOpen}
			danger
			className='top-[-2rem] z-[9999] flex'
			modalHeading={t('confirm-delete')}
			onRequestClose={cleanUp}
			onRequestSubmit={handleDeleteFile}
			primaryButtonText={t('delete')}
			secondaryButtonText={t('cancel')}
			size='xs'
		/>
	);
};

export default DeleteFileS3Modal;
