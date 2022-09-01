import PageHeader from '@components/PageHeader';
import { UserFollow, Download } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useState } from 'react';
import CloseCampaignModal from '@components/Modals/CloseCampaignModal';
import useGetUsers from '@api/user/useGetUsers';
import MultiAddSelect from '@components/MultiAddSelect';
import CampaignDetailsContainer from '@components/UserRevalidation/CampaignDetailsContainer';
import useGetCampaign from '@api/user-revalidation/useGetCampaign';
import { useParams } from 'react-router-dom';
import useGetCampaignApplications from '@api/user-revalidation/useGetCampaignApplications';
import CampaignApplication from '@model/CampaignApplication';

const CampaignDetail = () => {
	const { t } = useTranslation(['modals', 'userRevalidation', 'userSelect']);
	const { data: users = [] } = useGetUsers();
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: campaign } = useGetCampaign(campaignId);
	const { data: applications = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId);
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);

	if (!campaign) {
		return null;
	}

	return (
		<PageHeader
			pageTitle={campaign.name}
			intermediateRoutes={[
				{ name: 'Revalidations Ongoing', to: '/revalidations-ongoing' }
			]}
			actions={[
				{
					name: t('userRevalidation:collaborators'),
					icon: UserFollow,
					onClick: () => {
						setIsCollaboratorsOpen(true);
					}
				},
				{
					name: 'Download',
					icon: Download,
					onClick: () => {}
				},
				{
					name: t('userRevalidation:close-campaign'),
					onClick: () => {
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
										reviewId={application.id} // TODO fix parameter
										application={application.application}
										campaign={campaign}
									/>
								</div>
							</TabPanel>
						))}
					</TabPanels>
				</StickyTabs>
				<CloseCampaignModal isOpen={isCloseModalOpen} setIsOpen={setIsCloseModalOpen} />
				<MultiAddSelect
					items={{
						entries: users.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || t('userSelect:no-email'),
							role: u.principalRole,
							avatar: {
								imageDescription: u.username,
								initials: u.displayName
							}
						}))
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={t('modals:save')}
					onSubmit={() => setIsCollaboratorsOpen(false)}
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
					// TODO Add selected items
				/>
			</>
		</PageHeader>
	);
};
export default CampaignDetail;
