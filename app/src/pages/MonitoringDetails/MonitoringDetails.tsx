import PageHeader from '@components/PageHeader';
import { CloseOutline, Collaborate, Group } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MultiAddSelect from '@components/MultiAddSelect';
import useGetUsers from '@api/user/useGetUsers';
import User from '@model/User';
import CloseMonitoringModal from './Modals/CloseMonitoringModal';
import EditFocalPointModal from './Modals/EditFocalPointModal';

const MonitoringDetails = () => {
	const { t } = useTranslation(['evidenceRequest', 'userSelect', 'modals']);
	const { monitoringId = '' } = useParams();
	const [modalToOpen, setModalToOpen] = useState<string>();

	// TODO Add selected user and change get users fn for collaborators
	const { data: users = [] } = useGetUsers();

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

	return (
		<PageHeader
			pageTitle='Monitoring Name'
			actions={[
				{
					name: t('evidenceRequest:collaborators'),
					onClick: () => {
						setModalToOpen('collaborators');
					},
					icon: Collaborate
				},
				{
					name: 'Focal Point',
					onClick: () => {
						setModalToOpen('focalPoint');
					},
					icon: Group
				},
				{
					name: t('evidenceRequest:close'),
					onClick: () => {
						setModalToOpen('close');
					},
					icon: CloseOutline
				}
			]}
		>
			<>
				<CloseMonitoringModal
					isOpen={modalToOpen === 'close'}
					setIsOpen={setModalToOpen}
					id={monitoringId}
				/>
				<EditFocalPointModal
					isOpen={modalToOpen === 'focalPoint'}
					setIsOpen={setModalToOpen}
				/>
				<MultiAddSelect
					items={{
						entries: users.map(userMapper)
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={modalToOpen === 'collaborators'}
					onSubmitButtonText={t('modals:save')}
					onCloseButtonText={t('modals:cancel')}
					onClose={() => setModalToOpen('')}
					onSubmit={() => {}}
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
			</>
		</PageHeader>
	);
};
export default MonitoringDetails;
