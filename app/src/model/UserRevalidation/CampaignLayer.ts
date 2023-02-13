import { CampaignDtoLayerApi, CampaignDtoLayerApiEnum } from 'cosmo-api/src';

export type CampaignLayer = CampaignDtoLayerApi;

export const mapCampaignLayerToCampaignDisplayLayer = (
	campaignLayer: CampaignDtoLayerApi
) => {
	switch (campaignLayer) {
		case CampaignDtoLayerApiEnum.Os:
			return 'OS-Operating System';
		case CampaignDtoLayerApiEnum.Db:
			return 'DB-Database';
		case CampaignDtoLayerApiEnum.Sw:
			return 'SW-Software';
		default:
			return 'OS-Operating System';
	}
};
