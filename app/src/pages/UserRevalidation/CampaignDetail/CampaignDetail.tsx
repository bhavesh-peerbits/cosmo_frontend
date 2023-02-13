import PageHeader from '@components/PageHeader';
import { Collaborate, Exit, Reminder } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useCallback, useEffect, useState } from 'react';
import CloseCampaignModal from '@pages/UserRevalidation/CampaignDetail/Modals/CloseCampaignModal';
import MultiAddSelect from '@components/MultiAddSelect';
import CampaignDetailsContainer from '@pages/UserRevalidation/CampaignDetail/Containers/CampaignDetailsContainer';
import { useParams } from 'react-router-dom';
import useGetCampaignApplications from '@api/user-revalidation/useGetCampaignApplications';
import CampaignApplication from '@model/UserRevalidation/CampaignApplication';
import useGetCampaign from '@api/user-revalidation/useGetCampaign';
import useGetPossibleContributors from '@api/user-revalidation/useGetPossibleContributors';
import User from '@model/User';
import useAddContributorsToCampaign from '@api/user-revalidation/useAddContributorsToCampaign';
import { useQueryClient } from '@tanstack/react-query';
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useSetRecoilState } from 'recoil';
import CampaignStatus from './Components/CampaignStatus';
import ReminderTearsheet from './Modals/ReminderTearsheet';

const CampaignDetail = () => {
	const { t } = useTranslation([
		'modals',
		'userRevalidation',
		'userSelect',
		'evidenceRequest'
	]);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: campaign } = useGetCampaign(campaignId);
	const { data: users = [] } = useGetPossibleContributors(campaignId);
	const { data: applications = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId);
	const { mutateAsync: mutateContributors } = useAddContributorsToCampaign();
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
	const queryClient = useQueryClient();
	const setReminderData = useSetRecoilState(RevalidationReminderStore);

	useEffect(() => {
		setReminderData(old => ({
			...old,
			applications: [...applications.values()].map(ap => ap.application)
		}));
	}, [applications, setReminderData]);

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
			pageTitle={`${campaign.name}`}
			intermediateRoutes={[
				{ name: 'Revalidations Ongoing', to: '/revalidations-ongoing' }
			]}
			actions={[
				{
					name: t('userRevalidation:collaborators'),
					icon: Collaborate,
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
					name: t('evidenceRequest:send-reminder'),
					icon: Reminder,
					disabled: CLOSED_CAMPAIGN,
					onClick: () => {
						setReminderData(old => ({ ...old, open: true }));
					}
				},
				{
					name: t('userRevalidation:close-campaign'),
					icon: Exit,
					disabled: CLOSED_CAMPAIGN,
					kind: 'danger',
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
							<Tab key={application.id} title={application.application.name}>
								{application.application.name}
							</Tab>
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
				<ReminderTearsheet />
			</>
		</PageHeader>
	);
};
export default CampaignDetail;
