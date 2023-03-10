import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequest/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
}

const saveStep = ({ step }: SaveStepParams) => {
	return api.evidenceRequest
		.saveStep({ stepDto: toEvidenceRequestStepApi(step) })
		.then(({ data }) => data.valueOf());
};

const useSaveStep = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStep, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useSaveStep;
