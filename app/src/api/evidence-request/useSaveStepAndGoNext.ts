import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
	erId: number;
}

const saveStepAndGoNext = ({ step, erId }: SaveStepParams) => {
	return api.evidenceRequestFocalPointApi
		.saveStepAndGoNext({ erId, stepDto: toEvidenceRequestStepApi(step) })
		.then(({ data }) => data.valueOf());
};

const useSaveStepAndGoNext = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStepAndGoNext, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useSaveStepAndGoNext;
