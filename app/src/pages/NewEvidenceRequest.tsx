import PageHeader from '@components/PageHeader';
import { TrashCan, Send } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SendRequestModal from '@components/Modals/SendRequestModal';
import DeleteRequestDraftModal from '@components/Modals/DeleteRequestDraftModal';
import NewEvidenceRequestContent from '@components/NewEvidenceRequest/NewEvidenceRequestContent';
import { useParams } from 'react-router-dom';
import useGetDraftById from '@api/evidence-request/useGetDraftById';
import { useRecoilState } from 'recoil';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';

const NewEvidenceRequest = () => {
	const { t } = useTranslation('evidenceRequest');
	const [confirmSendInfo, setConfirmSendInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { requestId = '' } = useParams<'requestId'>();
	const { data: request } = useGetDraftById(requestId);
	const [requestDraft, setRequestDraft] = useRecoilState(evidenceRequestDraftStore);

	useEffect(() => {
		request && setRequestDraft(request);
	}, [request, setRequestDraft]);
	const isRequestDraftCompleted =
		!!requestDraft?.requests?.filter(req => req.selected).length &&
		!!requestDraft.requests?.filter(req => req.selected).length &&
		requestDraft.requests
			?.filter(req => req.selected)
			.map(req => req.steps.filter(step => step.type !== 'REQUEST'))
			.flat()
			.every(step => !!step.approvers?.length || step.reviewer) &&
		requestDraft.text !== null;

	if (!request || !requestDraft) {
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
						setConfirmSendInfo(old => ({ ...old, isOpen: true, uploadSuccess: false }));
					},
					kind: 'primary',
					disabled: !isRequestDraftCompleted
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
				{confirmSendInfo.isOpen && <SendRequestModal request={requestDraft} />}
				{isDeleteModalOpen && (
					<DeleteRequestDraftModal
						isOpen={isDeleteModalOpen}
						setIsOpen={setIsDeleteModalOpen}
						draftId={requestId}
					/>
				)}
				<NewEvidenceRequestContent />
			</>
		</PageHeader>
	);
};
export default NewEvidenceRequest;
