import PageHeader from '@components/PageHeader';
import { UserFollow, Exit } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TabList, Tab, TabPanels, TabPanel, Stack } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { memo, useCallback, useMemo, useState } from 'react';
import CloseCampaignModal from '@components/Modals/CloseCampaignModal';
import MultiAddSelect from '@components/MultiAddSelect';
import CampaignDetailsContainer from '@components/UserRevalidation/CampaignDetailsContainer';
import { useParams } from 'react-router-dom';
import useGetCampaignApplications from '@api/user-revalidation/useGetCampaignApplications';
import CampaignApplication from '@model/CampaignApplication';
import { MeterChart } from '@carbon/charts-react';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import useGetCampaign from '@api/user-revalidation/useGetCampaign';
import Campaign from '@model/Campaign';
import useGetCampaignStatus from '@api/user-revalidation/useGetCampaignStatus';
import useGetPossibleContributors from '@api/user-revalidation/useGetPossibleContributors';
import User from '@model/User';
import useAddContributorsToCampaign from '@api/user-revalidation/useAddContributorsToCampaign';
import useUiStore from '@hooks/useUiStore';
import { interfaces } from '@carbon/charts';
import { useQueryClient } from 'react-query';

const CampaignStatus = memo(({ campaign }: { campaign: Campaign }) => {
	const { id, type, layer, startDate, dueDate } = campaign;
	const { data: status = 0 } = useGetCampaignStatus(id);
	const { theme } = useUiStore();
	const meterData = useMemo(
		() => ({
			data: [
				{
					group: 'Percentage of completion campaign',
					value: (status * 100).toFixed(2)
				}
			],
			options: {
				title: ' ',
				toolbar: {
					enabled: false
				},
				meter: {
					peak: 100
				},
				height: '100px',
				color: {
					scale: {
						'Percentage of completion campaign': 'blue'
					}
				},
				theme: theme as interfaces.ChartTheme
			}
		}),
		[status, theme]
	);
	const statusData = useMemo(
		() => [
			{
				id: 'revalidation',
				label: 'Revalidation Type:',
				value: mapCampaignTypeToCampaignDisplayType(type)
			},
			{
				id: 'layer',
				label: 'Layer:',
				value: layer
			},
			{
				id: 'start-date',
				label: 'Start Date:',
				value: startDate ? startDate.toLocaleDateString('it-IT') : undefined
			},
			{
				id: 'due-date',
				label: 'Due Date:',
				value: dueDate ? dueDate.toLocaleDateString('it-IT') : undefined
			}
		],
		[dueDate, layer, startDate, type]
	);
	return (
		<>
			<h2 className='text-heading-3'>Status</h2>
			<MeterChart options={meterData.options} data={meterData.data} />
			<Stack gap={5}>
				{statusData.map(({ id: statusId, label, value }) => (
					<div key={statusId} className='flex w-full'>
						<span className='mr-2 font-bold'>{label}</span>
						<span>{value?.toString()}</span>
					</div>
				))}
			</Stack>
		</>
	);
});

const CampaignDetail = () => {
	const { t } = useTranslation(['modals', 'userRevalidation', 'userSelect']);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: campaign } = useGetCampaign(campaignId);
	const { data: users = [] } = useGetPossibleContributors(campaignId);
	const { data: applications = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId);
	const { mutateAsync: mutateContributors } = useAddContributorsToCampaign();
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
	const queryClient = useQueryClient();

	const addContributors = useCallback(
		(userSelected: string[]) => {
			return mutateContributors({
				campaignId,
				users: userSelected
			}).then(() => setIsCollaboratorsOpen(false));
		},
		[campaignId, mutateContributors]
	);

	if (!campaign) {
		return null;
	}

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

	const CLOSED_CAMPAIGN =
		campaign.status === 'COMPLETED' ||
		campaign.status === 'ANNULLED' ||
		campaign.status === 'COMPLETED_WITH_PARTIAL_ANSWERS';

	return (
		<PageHeader
			pageTitle={`${campaign.name} (${campaign.type})`}
			intermediateRoutes={[
				{ name: 'Revalidations Ongoing', to: '/revalidations-ongoing' }
			]}
			actions={[
				{
					name: t('userRevalidation:collaborators'),
					icon: UserFollow,
					disabled: CLOSED_CAMPAIGN,
					onClick: () => {
						setIsCollaboratorsOpen(true);
					}
				},
				// {
				// 	name: 'Download',
				// 	icon: Download,
				// 	onClick: () => {}, // TODO complete later
				// 	disabled: true
				// },
				{
					name: t('userRevalidation:close-campaign'),
					icon: Exit,
					disabled: CLOSED_CAMPAIGN,
					onClick: () => {
						queryClient.invalidateQueries(['campaigns', campaign.id]);
						setIsCloseModalOpen(true);
					}
				}
			]}
		>
			<>
				<StickyTabs>
					<TabList
						className='sticky z-10 bg-background'
						contained
						aria-label='List of tabs'
					>
						{[...applications.values()].map(application => (
							<Tab key={application.id}>{application.application.name}</Tab>
						))}
					</TabList>
					<TabPanels>
						{[...applications.values()].map(application => (
							<TabPanel key={application.id}>
								<div>
									<CampaignDetailsContainer
										reviewId={application.id}
										application={application.application}
										campaign={campaign}
									>
										<CampaignStatus campaign={campaign} />
									</CampaignDetailsContainer>
								</div>
							</TabPanel>
						))}
					</TabPanels>
				</StickyTabs>
				<CloseCampaignModal
					campaign={campaign}
					isOpen={isCloseModalOpen}
					setIsOpen={setIsCloseModalOpen}
				/>
				<MultiAddSelect
					selectedItems={{
						entries: campaign.contributors.map(userMapper)
					}}
					items={{
						entries: users.map(userMapper)
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={t('modals:save')}
					onSubmit={selection => addContributors(selection)}
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
			</>
		</PageHeader>
	);
};
export default CampaignDetail;
