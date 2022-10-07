import PageHeader from '@components/PageHeader';
import { TrashCan, Send } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SendRequestModal from '@components/Modals/SendRequestModal';
import DeleteRequestDraftModal from '@components/Modals/DeleteRequestDraftModal';
import NewEvidenceRequestContent from '@components/NewEvidenceRequest/NewEvidenceRequestContent';
import { useParams } from 'react-router-dom';
import useGetDraftById from '@api/evidence-request/useGetDraftById';

const NewEvidenceRequest = () => {
	const { t } = useTranslation('evidenceRequest');
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { requestId = '' } = useParams<'requestId'>();
	const { data: request } = useGetDraftById(requestId);

	if (!request) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={request?.name || 'Nome'}
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
					<DeleteRequestDraftModal
						isOpen={isDeleteModalOpen}
						setIsOpen={setIsDeleteModalOpen}
						draftId={requestId}
					/>
				)}
				<NewEvidenceRequestContent request={request} />
			</>
		</PageHeader>
	);
};
export default NewEvidenceRequest;
