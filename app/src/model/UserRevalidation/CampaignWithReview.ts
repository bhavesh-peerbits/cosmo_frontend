import { CampaignApi, CampaignWithReviewApi } from 'cosmo-api';
import Campaign, { fromCampaignApi } from '@model/UserRevalidation/Campaign';
import CampaignApplication, {
	fromCampaignApplicationApi
} from '@model/UserRevalidation/CampaignApplication';

interface CampaignWithReview {
	id: string;
	campaign: Campaign;
	campaignApplications: CampaignApplication[];
}

export const fromCampaignWithReviewApi = (
	campaign: CampaignWithReviewApi
): CampaignWithReview => {
	return {
		id: `${campaign.campaignDto?.id ?? 0}`,
		campaign: fromCampaignApi(campaign.campaignDto as CampaignApi),
		campaignApplications: campaign.reviewDtos?.map(fromCampaignApplicationApi) || []
	};
};

export default CampaignWithReview;
