import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	return useMutation(createDraft, {
		onSuccess: data => {
			queryClient.invalidateQueries(['all-request-draft']);
			navigate(`/new-evidence-request/${data.name}`);
		}
	});
};

export default useCreateDraft;
