import Campaign from './Campaign';
import CampaignApplication from './CampaignApplication';

interface CampaignReview {
	campaign: Campaign;
	reviews: CampaignApplication[];
}

export default CampaignReview;
