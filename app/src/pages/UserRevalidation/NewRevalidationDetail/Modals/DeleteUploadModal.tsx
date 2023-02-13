import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	InlineNotification
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useDeleteAppFromCampaign from '@api/user-revalidation/useDeleteAppFromCampaign';
import ApiError from '@api/ApiError';
import CampaignApplication from '@model/UserRevalidation/CampaignApplication';

type DeleteUploadModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaignApplication: CampaignApplication;
};

const DeleteUploadModal = ({
	isOpen,
	setIsOpen,
	campaignApplication
}: DeleteUploadModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate, error, isError } = useDeleteAppFromCampaign();
	const cleanUp = () => {
		setIsOpen(false);
	};

	const handleDelete = async () => {
		mutate(
			{
				campaignId: campaignApplication.campaign.id,
				campaignApplicationId: campaignApplication.id
			},
			{
				onSuccess: cleanUp
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>
					{t('userRevalidation:confirm-delete-upload', {
						application: campaignApplication.application.name
					})}
				</span>
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
				<Button onClick={handleDelete} kind='danger'>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteUploadModal;
