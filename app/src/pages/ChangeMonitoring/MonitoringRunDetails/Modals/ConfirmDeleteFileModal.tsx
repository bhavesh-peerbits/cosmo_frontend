import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Layer
} from '@carbon/react';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';
import useDeleteFileFromAllPaths from '@api/change-monitoring-analyst/useDeleteFileFromAllPaths';

type ConfirmModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	assetId: string;
	runId: string;
	fileLinkId: string;
};

const ConfirmDeleteFileModal = ({
	isOpen,
	setIsOpen,
	assetId,
	runId,
	fileLinkId
}: ConfirmModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteFileFromAllPaths();
	const { t } = useTranslation(['modals', 'runDetails']);

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const confirmAction = () => {
		mutate(
			{ runId, assetId, fileLinkId },
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<Layer level={0}>
			<ComposedModal open={isOpen} onClose={cleanUp} size='sm'>
				<ModalHeader title={t('runDetails:confirm-delete-file')} closeModal={cleanUp} />
				<ModalBody>
					<span>{`${t('runDetails:confirm-delete-file-description')}`}</span>
					{isError && (
						<div className='mt-5 flex items-center justify-center'>
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(error as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button kind='danger' disabled={isLoading} onClick={confirmAction}>
						{t('modals:delete')}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Layer>
	);
};
export default ConfirmDeleteFileModal;
