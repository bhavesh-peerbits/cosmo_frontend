import PageHeader from '@components/PageHeader';
import { TrashCan, Send } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SendRequestModal from '@components/Modals/SendRequestModal';
import DeleteRequestModal from '@components/Modals/DeleteRequestModal';
import NewEvidenceRequestContent from '@components/NewEvidenceRequest/NewEvidenceRequestContent';
import { useParams } from 'react-router-dom';
import useGetAllEvidenceRequestDraft from '@api/evidence-request/useGetAllEvidenceRequestDraft';

const NewEvidenceRequest = () => {
	const { requestName } = useParams<'requestName'>();
	const { t } = useTranslation('evidenceRequest');
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const { data: request } = useGetAllEvidenceRequestDraft(); // TODO Remove and get request by url

	return (
		<PageHeader
			pageTitle={requestName || 'Nome'}
			intermediateRoutes={[{ name: 'New evidence request', to: '/new-evidence-request' }]}
			actions={[
				{
					name: t('send-request'),
					icon: Send,
					onClick: () => {
						setIsSendModalOpen(true);
					},
					kind: 'primary'
				},
				{
					name: t('delete-request'),
					icon: TrashCan,
					onClick: () => {
						setIsDeleteModalOpen(true);
					},
					kind: 'danger'
				}
			]}
		>
			<>
				{isSendModalOpen && (
					<SendRequestModal isOpen={isSendModalOpen} setIsOpen={setIsSendModalOpen} />
				)}
				{isDeleteModalOpen && (
					<DeleteRequestModal
						isOpen={isDeleteModalOpen}
						setIsOpen={setIsDeleteModalOpen}
					/>
				)}
				<NewEvidenceRequestContent request={request} />
			</>
		</PageHeader>
	);
};
export default NewEvidenceRequest;
