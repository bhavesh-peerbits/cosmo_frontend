import { useMutation } from 'react-query';
import { CampaignDtoTypeApi } from 'cosmo-api/src';
import api from '@api';

export function getCampaignTemplate(type: CampaignDtoTypeApi) {
	return api.analystCampaignApi
		.getCampaignTemplate({ templateType: type })
		.then(({ data }) => data);
}

export default () =>
	useMutation(({ type }: { type: CampaignDtoTypeApi }) => getCampaignTemplate(type));
