import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
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
		.createDraft({ setUpDraftDto: draftData })
		.then(({ data }) => data.valueOf());
};

const useCreateDraft = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(createDraft, {
		onSuccess: data => {
			queryClient.invalidateQueries(['all-request-draft']);
			navigate(`/new-evidence-request/${data}`);
		}
	});
};

export default useCreateDraft;
