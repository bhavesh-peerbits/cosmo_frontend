import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Group, Send, Report } from '@carbon/react/icons';
import { useState } from 'react';
import MonitoringDraftRecapModal from '@components/Modals/MonitoringDraftRecapModal';
import MultiAddSelect from '@components/MultiAddSelect';
import useGetUsers from '@api/user/useGetUsers';
import User from '@model/User';

const MonitoringDraftDetails = () => {
	const { t } = useTranslation([
		'evidenceRequest',
		'changeMonitoring',
		'modals',
		'userSelect'
	]);
	const [isRecapOpen, setIsRecapOpen] = useState({ open: false, shouldStart: false });
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);

	const { data } = useGetUsers();

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
			pageTitle='title'
			intermediateRoutes={[{ name: 'New Monitoring', to: '/new-monitoring' }]}
			actions={[
				{
					name: t('evidenceRequest:collaborators'),
					onClick: () => setIsCollaboratorsOpen(true),
					icon: Group
				},
				{
					name: t('changeMonitoring:start-monitoring'),
					onClick: () => {
						setIsRecapOpen({ open: true, shouldStart: true });
					},
					icon: Send
				},
				{
					name: t('changeMonitoring:show-recap'),
					onClick: () => {
						setIsRecapOpen({ open: true, shouldStart: false });
					},
					icon: Report,
					kind: 'secondary'
				}
			]}
		>
			<div>
				{data && (
					<MultiAddSelect
						// selectedItems={} //TODO Add after BE
						items={{
							entries: data.map(userMapper)
						}} // TODO Fix with correct users
						title={t('userSelect:select-user')}
						description={t('userSelect:select-users')}
						open={isCollaboratorsOpen}
						onSubmitButtonText={t('modals:save')}
						onSubmit={() => setIsCollaboratorsOpen(false)} // TODO Fix after BE
						onCloseButtonText={t('modals:cancel')}
						onClose={() => setIsCollaboratorsOpen(false)}
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
				)}

				<MonitoringDraftRecapModal isOpen={isRecapOpen} setIsOpen={setIsRecapOpen} />
			</div>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
