import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequest/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
	erId: string;
}

const saveStepAndGoNextAnalyst = ({ step, erId }: SaveStepParams) => {
	return api.evidenceRequest
		.saveStepAndGoNext1({ erId: +erId, stepDto: toEvidenceRequestStepApi(step) })
		.then(({ data }) => data.valueOf());
};

const useSaveStepAndGoNextAnalyst = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStepAndGoNextAnalyst, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
			queryClient.invalidateQueries(['evidence-of-user']);
		}
	});
};

export default useSaveStepAndGoNextAnalyst;
