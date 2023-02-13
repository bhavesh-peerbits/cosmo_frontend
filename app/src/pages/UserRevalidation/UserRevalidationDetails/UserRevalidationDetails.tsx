import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import { useParams } from 'react-router-dom';
import useGetCampaignReview from '@api/review-campaign/useGetCampaignReview';
import UserRevalidationTabContent from '@pages/UserRevalidation/UserRevalidationDetails/Containers/UserRevalidationTabContent';

const UserRevalidationDetails = () => {
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: campaignWithReview } = useGetCampaignReview(campaignId);

	if (!campaignWithReview?.campaign) {
		return null;
	}

	return (
		<PageHeader
			pageTitle={`${campaignWithReview.campaign.name} (${campaignWithReview.campaign.type}_${campaignWithReview.campaign.layer})`}
			intermediateRoutes={[{ name: 'User Revalidation', to: '/user-revalidation' }]}
		>
			<StickyTabs>
				<TabList
					className='sticky z-10 bg-background'
					contained
					aria-label='List of tabs'
				>
					{campaignWithReview.campaignApplications.map(app => (
						<Tab title={app.application.name} key={app.id}>
							{app.application.name}
						</Tab>
					))}
				</TabList>
				<TabPanels>
					{campaignWithReview.campaignApplications.map(app => (
						<TabPanel className='bg-layer-1 p-6' key={app.id}>
							<UserRevalidationTabContent key={app.id} review={app} />
						</TabPanel>
					))}
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default UserRevalidationDetails;
