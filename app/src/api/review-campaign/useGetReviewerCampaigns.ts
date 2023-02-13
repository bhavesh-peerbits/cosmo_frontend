import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromApplicationWithCampaignsApi } from '@model/UserRevalidation/ApplicationWithCampaigns';

const getAllReviewCampaigns = () => {
	return api.revalidationApi
		.getAllApplicationsWithCampaign()
		.then(({ data }) => data.map(fromApplicationWithCampaignsApi));
};

export default () => useQuery(['campaigns-reviewer'], getAllReviewCampaigns);
