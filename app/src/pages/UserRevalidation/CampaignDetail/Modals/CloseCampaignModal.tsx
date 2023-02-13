import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Campaign from '@model/UserRevalidation/Campaign';
import useCloseCampaign from '@api/user-revalidation/useCloseCampaign';
import ModalError from '@components/Modals/ModalError';
import ApiError from '@api/ApiError';
import { useNavigate } from 'react-router-dom';

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaign: Campaign;
};

const CloseCampaignModal = ({ isOpen, setIsOpen, campaign }: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate: closeMutate, isError, error } = useCloseCampaign();
	const navigate = useNavigate();
	const cleanUp = () => {
		setIsOpen(false);
	};

	const closeCampaign = () => {
		return closeMutate(
			{
				campaignId: campaign.id
			},
			{
				onSuccess: () => {
					cleanUp();
					navigate('/revalidations-ongoing');
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('userRevalidation:close-campaign')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('userRevalidation:confirm-close', { campaign: campaign.name })}</span>
				<ModalError isError={isError} error={error as ApiError} />
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger' onClick={() => closeCampaign()}>
					{t('userRevalidation:close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CloseCampaignModal;
