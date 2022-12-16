import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
	erId: string;
	stepToReturn: number;
}

const saveStepAndReturn = ({ step, erId, stepToReturn }: SaveStepParams) => {
	return api.evidenceRequestFocalPointApi
		.saveStepAndReturn({
			erId: +erId,
			stepDto: toEvidenceRequestStepApi(step),
			returnStep: stepToReturn
		})
		.then(({ data }) => data.valueOf());
};

const useSaveStepAndReturn = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStepAndReturn, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-of-user']);
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useSaveStepAndReturn;
