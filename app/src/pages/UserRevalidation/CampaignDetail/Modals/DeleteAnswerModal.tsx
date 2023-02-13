import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ApiError from '@api/ApiError';
import useDeleteAnswer from '@api/user-revalidation/useDeleteAnswer';
import Answer from '@model/UserRevalidation/Answer';

type DeleteModalProps = {
	campaignId: string;
	answer?: Answer;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DeleteAnswerModal = ({
	isOpen,
	setIsOpen,
	campaignId,
	answer
}: DeleteModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate, isLoading, isError, error } = useDeleteAnswer();
	if (!answer) return null;
	const cleanUp = () => {
		setIsOpen(false);
	};

	const deleteAnswer = () => {
		mutate(
			{ campaignId, answerId: answer.id },
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>
					{t('userRevalidation:confirm-delete-answer', {
						userDetails: answer.userDetails,
						permissions: answer.permissions
					})}
				</span>
				{isError && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(error as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger' disabled={isLoading} onClick={deleteAnswer}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteAnswerModal;
