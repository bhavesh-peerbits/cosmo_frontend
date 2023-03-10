import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequest/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
	erId: string;
}

const saveStepAndGoNext = ({ step, erId }: SaveStepParams) => {
	return api.evidenceRequestFocalPointApi
		.saveStepAndGoNext({ erId: +erId, stepDto: toEvidenceRequestStepApi(step) })
		.then(({ data }) => data.valueOf());
};

const useSaveStepAndGoNext = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStepAndGoNext, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
			queryClient.invalidateQueries(['evidence-of-user']);
		}
	});
};

export default useSaveStepAndGoNext;
