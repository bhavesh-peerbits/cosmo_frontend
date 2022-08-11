import {
	ApplicationApi,
	CampaignApi,
	CampaignApplicationApi,
	CampaignApplicationStatusApi
} from 'cosmo-api/src';
import Campaign, { fromCampaignApi } from '@model/Campaign';
import Application, { fromApplicationApi } from '@model/Application';

interface CampaignApplication {
	id: string;
	campaign: Campaign;
	application: Application;
	status: CampaignApplicationStatusApi;
}

export const fromCampaignApplicationApi = (
	campaignApplication: CampaignApplicationApi
): CampaignApplication => {
	return {
		id: `${campaignApplication.id}`,
		campaign: fromCampaignApi(<CampaignApi>campaignApplication.campaign),
		application: fromApplicationApi(<ApplicationApi>campaignApplication.application),
		status: <CampaignApplicationStatusApi>campaignApplication.status
	};
};

export default CampaignApplication;
