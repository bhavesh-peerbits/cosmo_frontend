import Application, { fromApplicationApi } from '@model/Narrative/Application';
import Campaign, { fromCampaignApi } from '@model/UserRevalidation/Campaign';
import { ApplicationApi, ApplicationCampaignApi } from 'cosmo-api/src';

interface ApplicationWithCampaigns {
	id: string;
	application: Application;
	campaigns: Campaign[];
}

export const fromApplicationWithCampaignsApi = (
	appWithCampaigns: ApplicationCampaignApi
): ApplicationWithCampaigns => ({
	id: `${appWithCampaigns.application?.id}`,
	application: fromApplicationApi(appWithCampaigns.application as ApplicationApi),
	campaigns: (appWithCampaigns.campaigns || []).map(fromCampaignApi)
});

export default ApplicationWithCampaigns;
