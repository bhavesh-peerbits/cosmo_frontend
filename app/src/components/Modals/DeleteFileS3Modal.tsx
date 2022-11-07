import useDeleteFile from '@api/uploaders3/useDeleteFile';
import { Modal } from '@carbon/react';
import { useTranslation } from 'react-i18next';

type DeleteFileS3ModalProps = {
	deleteInfo: { isOpen: boolean; fileId: string | undefined };
	setDeleteInfo: (value: { isOpen: boolean; fileId: string | undefined }) => void;
};

const DeleteFileS3Modal = ({ deleteInfo, setDeleteInfo }: DeleteFileS3ModalProps) => {
	const { t } = useTranslation('modals');
	const cleanUp = () => {
		setDeleteInfo({ fileId: undefined, isOpen: false });
	};
	const { mutate: mutateDelete } = useDeleteFile();

	const handleDeleteFile = () => {
		deleteInfo.fileId && mutateDelete({ fileId: deleteInfo.fileId });
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
		/>
	);
};

export default DeleteFileS3Modal;
