import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Collaborate, Send, TrashCan } from '@carbon/react/icons';
import { Grid, Column } from '@carbon/react';
import { useState } from 'react';
import MultiAddSelect from '@components/MultiAddSelect';
import useGetUsers from '@api/user/useGetUsers';
import User from '@model/User';
import NewMonitoringStepsContainer from '@pages/MonitoringDraftDetails/Containers/NewMonitoringStepsContainer';
import { useParams } from 'react-router-dom';
import useGetMonitoringDraftById from '@api/change-monitoring/useGetMonitoringDraftById';
import DeleteMonitoringDraftModal from './Modals/DeleteMonitoringDraftModal';
import MonitoringDraftRecapModal from './Modals/MonitoringDraftRecapModal';

const MonitoringDraftDetails = () => {
	const { t } = useTranslation([
		'evidenceRequest',
		'changeMonitoring',
		'modals',
		'userSelect'
	]);
	const [isSendDraftOpen, setIsSendDraftOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);

	const { monitoringDraftId = '' } = useParams();
	const { data: draft } = useGetMonitoringDraftById(monitoringDraftId);

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
					icon: Collaborate
				},
				{
					name: t('changeMonitoring:start-monitoring'),
					onClick: () => {
						setIsSendDraftOpen(true);
					},
					icon: Send
				},
				{
					name: t('modals:delete'),
					onClick: () => {
						setIsDeleteOpen(true);
					},
					icon: TrashCan
				}
			]}
		>
			<>
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

				<MonitoringDraftRecapModal
					isOpen={isSendDraftOpen}
					setIsOpen={setIsSendDraftOpen}
					shouldStart
				/>
				<DeleteMonitoringDraftModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
				<Grid fullWidth narrow className='p-container-1 pl-8'>
					<Column sm={4} md={8} lg={3} className='space-y-5'>
						<div className='flex flex-col'>
							<span className='text-heading-2'>
								{t('changeMonitoring:monitoring-type')}
							</span>
							<span className='text-text-secondary text-body-short-1'>
								{draft?.type
									? t('changeMonitoring:automatic')
									: t('changeMonitoring:manual')}
							</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>Assets</span>
							<span className='text-text-secondary text-body-short-1'>
								{draft?.monitoringAssets.map(asset => asset.asset.hostname)}
							</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>
								{t('changeMonitoring:framework-leafs')}
							</span>
							<span className='text-text-secondary text-body-short-1'>
								{draft?.frameworkLeafs}
							</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-heading-2'>{t('changeMonitoring:scheduling')}</span>
							<span className='text-text-secondary text-body-short-1'>
								ADD SCHEDULING INFO
							</span>
						</div>
					</Column>
					<Column sm={4} md={8} lg={13}>
						<NewMonitoringStepsContainer />
					</Column>
				</Grid>
			</>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
