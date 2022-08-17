import { CampaignDtoTypeEnum } from 'cosmo-api/src/v1';

export type CampaignType = CampaignDtoTypeEnum;
export const CampaignTypeEnum = CampaignDtoTypeEnum;

export type CampaignDisplayType = 'Firefight' | 'SUID' | 'User Access Review';

export const mapCampaignTypeToCampaignDisplayType = (
	campaignType: CampaignType
): CampaignDisplayType => {
	switch (campaignType) {
		case CampaignDtoTypeEnum.Firefight:
			return 'Firefight';
		case CampaignDtoTypeEnum.Suid:
			return 'SUID';
		default:
			return 'User Access Review';
	}
};
