import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Collaborate, Send, TrashCan } from '@carbon/react/icons';
import { Grid, Column, UnorderedList, ListItem } from '@carbon/react';
import { useState } from 'react';
import MultiAddSelect from '@components/MultiAddSelect';
import User from '@model/common/User';
import NewMonitoringStepsContainer from '@pages/ChangeMonitoring/MonitoringDraftDetails/Containers/NewMonitoringStepsContainer';
import { useParams } from 'react-router-dom';
import useGetMonitoringDraftById from '@api/change-monitoring-analyst/useGetMonitoringDraftById';
import useGetUsersByRoles from '@api/user/useGetUsersByRoles';
import useSetMonitoringCollaborator from '@api/change-monitoring-analyst/useSetMonitoringCollaborators';
import GetSchedulingDisplayInfo from '@i18n/common/displaySchedulingInfo';
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
				id: `${draft?.id}`,
				usersId
			},
			{ onSuccess: () => setIsCollaboratorsOpen(false) }
		);
	};

	if (!draft) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={draft.name || ''}
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
					icon: Send,
					disabled:
						!draft.instance ||
						!draft.monitoringAssets ||
						draft.monitoringAssets?.some(el => el.paths.length === 0) ||
						!draft.focalPoint ||
						!draft.script ||
						!draft.scheduling
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
				<MultiAddSelect
					selectedItems={{
						entries: draft.collaborators ? draft.collaborators.map(userMapper) : []
					}}
					items={{
						entries: possibleCollab ? possibleCollab.map(userMapper) : []
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={t('modals:save')}
					onSubmit={selectedItems => addCollaborators(selectedItems)}
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

				<MonitoringDraftRecapModal
					isOpen={isSendDraftOpen}
					setIsOpen={setIsSendDraftOpen}
					shouldStart
					draft={draft}
				/>
				<DeleteMonitoringDraftModal
					isOpen={isDeleteOpen}
					setIsOpen={setIsDeleteOpen}
					draft={draft}
				/>
				<Grid fullWidth narrow className='p-container-1 pl-8'>
					<Column sm={4} md={8} lg={3} className='space-y-5'>
						<div className='flex flex-col'>
							<span className='text-heading-2'>
								{t('changeMonitoring:monitoring-type')}
							</span>
							<span className='text-text-secondary text-body-short-1'>
								{draft?.type === 'AUTOMATIC'
									? t('changeMonitoring:automatic')
									: t('changeMonitoring:manual')}
							</span>
						</div>
						{!!draft?.monitoringAssets?.length && (
							<div className='flex flex-col'>
								<span className='text-heading-2'>Assets</span>
								<UnorderedList nested className='ml-4'>
									{draft.monitoringAssets.map(ma => (
										<ListItem className='break-words'>{ma.asset.hostname}</ListItem>
									))}
								</UnorderedList>
							</div>
						)}
						{draft.frameworkName === 'FREE' && (
							<div className='flex flex-col'>
								<span className='text-heading-2'>Framework</span>
								<span className='text-text-secondary text-body-short-1'>
									{draft.frameworkName}
								</span>
							</div>
						)}
						{draft?.frameworkLeafsCodes && (
							<div className='flex flex-col'>
								<span className='text-heading-2'>
									{t('evidenceRequest:framework-code')}
								</span>
								<UnorderedList nested className='ml-4'>
									{draft.frameworkLeafsCodes.split('-').map(code => (
										<ListItem className='break-words'>{code}</ListItem>
									))}
								</UnorderedList>
							</div>
						)}
						{draft?.frameworkLeafsName && (
							<div className='flex flex-col'>
								<span className='text-heading-2'>
									{t('evidenceRequest:framework-name')}
								</span>
								<UnorderedList nested className='ml-4'>
									{draft.frameworkLeafsName.split('//').map(name => (
										<ListItem className='break-words'>{name}</ListItem>
									))}
								</UnorderedList>
							</div>
						)}
						{draft?.script && (
							<div className='flex flex-col'>
								<span className='text-heading-2'>Script</span>
								<span className='text-text-secondary text-body-short-1'>
									{draft.script.name}
								</span>
							</div>
						)}

						<div
							className={`${
								draft.scheduling ? 'flex flex-col' : 'flex flex-col  opacity-0'
							}`}
						>
							<span className='text-heading-2'>{t('changeMonitoring:scheduling')}</span>
							<span className='text-text-secondary text-body-short-1'>
								{GetSchedulingDisplayInfo(
									draft.scheduling || { frequency: 'ONDEMAND', startDate: new Date() }
								)}
							</span>
						</div>
					</Column>
					<Column sm={4} md={8} lg={13}>
						<NewMonitoringStepsContainer draft={draft} />
					</Column>
				</Grid>
			</>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
