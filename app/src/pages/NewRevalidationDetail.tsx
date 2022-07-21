import PageHeader from '@components/PageHeader';
import { Email, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SendRevalidationModal from '@components/Modals/SendRevalidationModal';
import DeleteCampaignModal from '@components/Modals/DeleteCampaignModal';

const NewRevalidationDetail = () => {
	const { t } = useTranslation('userRevalidation');
	const { t: tModals } = useTranslation('modals');
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	return (
		<PageHeader
			pageTitle='Campagna'
			intermediateRoutes={[{ name: 'New Revalidation', to: '/new-revalidation' }]}
			actions={[
				{
					name: t('send-revalidation'),
					icon: Email,
					kind: 'primary',
					onClick: () => {
						setIsSendModalOpen(true);
					}
				},
				{
					name: tModals('delete'),
					icon: TrashCan,
					kind: 'danger',
					onClick: () => {
						setIsDeleteModalOpen(true);
					}
				}
			]}
		>
			<>
				<SendRevalidationModal isOpen={isSendModalOpen} setIsOpen={setIsSendModalOpen} />
				<DeleteCampaignModal
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
				<div>Content</div>
			</>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
