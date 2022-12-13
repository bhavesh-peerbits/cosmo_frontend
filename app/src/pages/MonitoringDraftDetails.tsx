import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Group, Send, Report } from '@carbon/react/icons';
import { Grid, Column } from '@carbon/react';
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
				<Grid fullWidth narrow className='p-container-1 pl-8'>
					<Column sm={4} md={8} lg={3} className='space-y-5'>
						<div className='flex flex-col'>
							<span className='text-heading-2'>
								{t('changeMonitoring:monitoring-type')}
							</span>
							<span className='text-text-secondary text-body-short-1'>Tipo</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>Assets</span>
							<span className='text-text-secondary text-body-short-1'>Assets</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>Framework</span>
							<span className='text-text-secondary text-body-short-1'>Framework</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>{t('changeMonitoring:scheduling')}</span>
							<span className='text-text-secondary text-body-short-1'>Scheduling</span>
						</div>
					</Column>
					<Column sm={4} md={8} lg={13}>
						dcm
					</Column>
				</Grid>
			</div>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
