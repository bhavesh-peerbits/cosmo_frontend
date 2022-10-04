import PageHeader from '@components/PageHeader';
import { TrashCan, Send } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SendRequestModal from '@components/Modals/SendRequestModal';
import DeleteRequestModal from '@components/Modals/DeleteRequestModal';
import NewEvidenceRequestContent from '@components/NewEvidenceRequest/NewEvidenceRequestContent';
import { useParams } from 'react-router-dom';
import { UserDtoRolesEnum } from 'cosmo-api/src/v1';
import useManagementApps from '@hooks/management/useManagementApps';
import EvidenceRequestStep from '@model/EvidenceRequestStep';

const NewEvidenceRequest = () => {
	const { t } = useTranslation('evidenceRequest');
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { requestName = '' } = useParams<'requestName'>();
	// const { data: request } = useGetDraftByName(requestName);
	const { apps } = useManagementApps();

	const request = {
		requests: [
			{
				application: apps[0],
				steps: [
					{
						approver: [
							{
								username: 'string',
								name: 'string',
								surname: 'string',
								email: 'string',
								inactive: true,
								roles: ['SYS_ADMIN'] as UserDtoRolesEnum[],
								id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
								displayName: 'Approver Surname'
							}
						],
						reviewer: {
							username: 'string',
							name: 'string',
							surname: 'string',
							email: 'string',
							inactive: true,
							roles: ['SYS_ADMIN'] as UserDtoRolesEnum[],
							displayName: 'Reviewer Surname',
							id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
						},
						type: 'REQUEST',
						delegates: [
							{
								username: 'string',
								name: 'string',
								surname: 'string',
								email: 'string',
								inactive: true,
								roles: ['SYS_ADMIN'] as UserDtoRolesEnum[],
								displayName: 'Delegate Surname',
								id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
							}
						],
						text: 'string'
					} as EvidenceRequestStep
				],
				selected: true,
				id: 'string'
			}
		],
		suggestedText: 'string',
		collaborators: [
			{
				username: 'string',
				name: 'string',
				surname: 'string',
				email: 'string',
				inactive: true,
				roles: ['SYS_ADMIN'] as UserDtoRolesEnum[],
				displayName: 'Collaborator Surname',
				id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
			}
		],
		workflowType: 'string',
		type: 'string',
		name: 'string',
		id: 'string'
	};

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
