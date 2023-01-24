import PageHeader from '@components/PageHeader';
import { CloseOutline, Collaborate, Group } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MultiAddSelect from '@components/MultiAddSelect';
import User from '@model/User';
import useGetUsersByRoles from '@api/user/useGetUsersByRoles';
import useSetMonitoringCollaborator from '@api/change-monitoring/useSetMonitoringCollaborators';
import Monitoring from '@model/Monitoring';
import { UseQueryResult } from '@tanstack/react-query/build/lib/types';
import useGetMonitoringById from '@api/change-monitoring/useGetMonitoringById';
import CloseMonitoringModal from './Modals/CloseMonitoringModal';
import EditFocalPointModal from './Modals/EditFocalPointModal';
import MonitoringDetailsContent from './Containers/MonitoringDetailsContent';

type MonitoringDetailsProps = {
	isFocalPoint?: boolean;
	getMonitoringFn?: (monitoringId: string) => UseQueryResult<Monitoring, unknown>;
};
const MonitoringDetails = ({
	isFocalPoint,
	getMonitoringFn = useGetMonitoringById
}: MonitoringDetailsProps) => {
	const { t } = useTranslation(['evidenceRequest', 'userSelect', 'modals']);
	const [modalToOpen, setModalToOpen] = useState<string>();
	const { monitoringId = '' } = useParams();
	const { data: monitoring } = getMonitoringFn(monitoringId);
	const { data: possibleCollab } = useGetUsersByRoles(
		'MONITORING_ANALYST',
		'MONITORING_ADMIN'
	);
	const { mutate } = useSetMonitoringCollaborator();

	const userMapper = (u: User) => ({
		id: u.id,
		title: u.displayName,
		tagInfo: u.principalRole,
		subtitle: u.email || t('userSelect:no-email'),
		role: u.principalRole,
		avatar: {
			imageDescription: u.username,
			initials: u.displayName
		}
	});

	const addCollaborators = (usersId: string[]) => {
		return mutate(
			{
				id: `${monitoring?.id}`,
				usersId
			},
			{ onSuccess: () => setModalToOpen('') }
		);
	};

	if (!monitoring) return null;

	return (
		<PageHeader
			pageTitle={monitoring?.name || ''}
			intermediateRoutes={[
				{ name: 'Change Monitoring Dashboard', to: '/monitoring-dashboard' }
			]}
			actions={
				!isFocalPoint
					? [
							{
								name: t('evidenceRequest:collaborators'),
								disabled: monitoring.status === 'TERMINATED',
								onClick: () => {
									setModalToOpen('collaborators');
								},
								icon: Collaborate
							},
							{
								name: 'Focal Point',
								disabled: monitoring.status === 'TERMINATED',
								onClick: () => {
									setModalToOpen('focalPoint');
								},
								icon: Group
							},
							{
								name: t('evidenceRequest:close'),
								disabled: monitoring.status === 'TERMINATED',
								onClick: () => {
									setModalToOpen('close');
								},
								icon: CloseOutline
							}
					  ]
					: []
			}
		>
			<>
				<CloseMonitoringModal
					isOpen={modalToOpen === 'close'}
					setIsOpen={setModalToOpen}
					monitoring={monitoring}
				/>
				<EditFocalPointModal
					monitoring={monitoring}
					isOpen={modalToOpen === 'focalPoint'}
					setIsOpen={setModalToOpen}
				/>
				<MultiAddSelect
					items={{
						entries: possibleCollab?.length ? possibleCollab.map(userMapper) : []
					}}
					selectedItems={{
						entries: monitoring?.collaborators
							? monitoring?.collaborators.map(userMapper)
							: []
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={modalToOpen === 'collaborators'}
					onSubmitButtonText={t('modals:save')}
					onCloseButtonText={t('modals:cancel')}
					onClose={() => setModalToOpen('')}
					onSubmit={selectedItems => addCollaborators(selectedItems)}
					globalSearchLabel={t('userSelect:username-email')}
					globalSearchPlaceholder={t('userSelect:find-user')}
					globalFilters={[
						{
							id: 'role',
							label: t('userSelect:role')
						}
					]}
					globalFiltersIconDescription={t('userSelect:filters')}
					globalFiltersPlaceholderText={t('userSelect:choose-option')}
					globalFiltersPrimaryButtonText={t('userSelect:apply')}
					globalFiltersSecondaryButtonText={t('userSelect:reset')}
					clearFiltersText={t('userSelect:clear-filters')}
					influencerItemTitle={t('userSelect:name')}
					influencerItemSubtitle='email'
					noResultsTitle={t('userSelect:no-results')}
					noResultsDescription={t('userSelect:different-keywords')}
				/>
				<MonitoringDetailsContent monitoring={monitoring} />
			</>
		</PageHeader>
	);
};
export default MonitoringDetails;
