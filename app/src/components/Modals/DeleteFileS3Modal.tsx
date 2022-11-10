import useDeleteFileFromDraft from '@api/uploaders3/useDeleteFileFromDraft';
import useDeleteFileFromStep from '@api/uploaders3/useDeleteFileFromStep';
import { Modal, InlineLoading } from '@carbon/react';
import FileLink from '@model/FileLink';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';

type DeleteInfoType = {
	isOpen: boolean;
	fileId: string | undefined;
	stepId: string | undefined;
	draftId: string | undefined;
	files: FileLink[] | undefined;
};

type DeleteFileS3ModalProps = {
	deleteInfo: DeleteInfoType;
	setDeleteInfo: Dispatch<SetStateAction<DeleteInfoType>>;
};

const DeleteFileS3Modal = ({ deleteInfo, setDeleteInfo }: DeleteFileS3ModalProps) => {
	const { t } = useTranslation('modals');
	const setRequestDraft = useSetRecoilState(evidenceRequestDraftStore);
	const cleanUp = () => {
		setDeleteInfo(old => ({
			...old,
			fileId: undefined,
			isOpen: false,
			stepId: undefined,
			draftId: undefined
		}));
	};
	const { mutate: mutateDelete, isLoading } = useDeleteFileFromStep();
	const { mutate: mutateDeleteDraft, isLoading: isLoadingDraft } =
		useDeleteFileFromDraft();

	const handleDeleteFile = () => {
		deleteInfo.fileId
			? (deleteInfo.stepId &&
					mutateDelete(
						{ fileId: deleteInfo.fileId, stepId: deleteInfo.stepId },
						{
							onSuccess: () =>
								setDeleteInfo({
									files: deleteInfo.files
										? deleteInfo.files.filter(f => f.id !== deleteInfo.fileId)
										: deleteInfo.files,
									fileId: undefined,
									isOpen: false,
									stepId: undefined,
									draftId: undefined
								})
						}
					)) ||
			  (deleteInfo.draftId &&
					mutateDeleteDraft(
						{ fileId: deleteInfo.fileId, draftId: deleteInfo.draftId },
						{
							onSuccess: () => {
								setDeleteInfo({
									files: deleteInfo.files
										? deleteInfo.files.filter(f => `${f.id}` !== `${deleteInfo.fileId}`)
										: deleteInfo.files,
									fileId: undefined,
									isOpen: false,
									stepId: undefined,
									draftId: undefined
								});
								setRequestDraft(old => ({
									...old,
									fileLinks: deleteInfo.files
										? deleteInfo.files.filter(f => `${f.id}` !== `${deleteInfo.fileId}`)
										: deleteInfo.files
								}));
							}
						}
					))
			: null;
	};

	return (
		<Modal
			open={deleteInfo.isOpen}
			danger
			className='top-[-2rem] z-[9999] flex'
			modalHeading={t('confirm-delete')}
			onRequestClose={cleanUp}
			onRequestSubmit={handleDeleteFile}
			primaryButtonText={
				isLoading || isLoadingDraft ? (
					<div className=' flex w-full '>
						<span className='self-center'>{t('delete')}</span>
						<InlineLoading className='justify-end' />
					</div>
				) : (
					t('delete')
				)
			}
			secondaryButtonText={t('cancel')}
			primaryButtonDisabled={isLoading || isLoadingDraft}
			size='xs'
		/>
	);
};

export default DeleteFileS3Modal;
