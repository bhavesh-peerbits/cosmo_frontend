import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';

interface CreateDraftParams {
	draftData: {
		name: string;
		workflowname: string;
		requestType: string;
	};
}

const createDraft = ({ draftData }: CreateDraftParams) => {
	return api.evidenceRequest
		.createDraft({ setUpDraftResponseDto: draftData })
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

const useCreateDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(createDraft, {
		onSuccess: () => {
			queryClient.invalidateQueries(['all-request-draft']);
		}
	});
};

export default useCreateDraft;
