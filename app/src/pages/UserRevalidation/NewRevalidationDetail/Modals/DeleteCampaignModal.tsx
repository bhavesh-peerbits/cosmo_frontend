import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Campaign from '@model/UserRevalidation/Campaign';
import { useTranslation } from 'react-i18next';
import useDeleteCampaign from '@api/user-revalidation/useDeleteCampaign';
import ApiError from '@api/ApiError';
import { useNavigate } from 'react-router-dom';

type DeleteModalProps = {
	campaign: Campaign;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DeleteCampaignModal = ({ isOpen, setIsOpen, campaign }: DeleteModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate, isLoading, isError, error } = useDeleteCampaign();
	const navigate = useNavigate();

	const cleanUp = () => {
		setIsOpen(false);
	};

	const deleteCampaign = () => {
		mutate(
			{ campaignId: campaign.id },
			{
				onSuccess: () => {
					cleanUp();
					navigate('/new-revalidation');
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('userRevalidation:confirm-delete', { campaign: campaign.name })}</span>
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
				<Button kind='danger' disabled={isLoading} onClick={deleteCampaign}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteCampaignModal;
