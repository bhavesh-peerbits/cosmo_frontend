import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';
import useReturnToUpload from '@api/change-monitoring-analyst/useReturnToUpload';

type ConfirmModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	id: string;
};

const ConfirmReturnUploadModal = ({ isOpen, setIsOpen, id }: ConfirmModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useReturnToUpload();
	const { t } = useTranslation(['modals', 'runDetails']);

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const confirmAction = () => {
		mutate(
			{ runId: +id },
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('runDetails:confirm-return')} closeModal={cleanUp} />
			<ModalBody>
				<span>{`${t('runDetails:confirm-return-description')}`}</span>
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
				<Button disabled={isLoading} onClick={confirmAction}>
					{t('runDetails:confirm')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default ConfirmReturnUploadModal;
