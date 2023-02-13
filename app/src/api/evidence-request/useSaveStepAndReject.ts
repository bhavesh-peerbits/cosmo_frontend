import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequestStep, {
	toEvidenceRequestStepApi
} from '@model/EvidenceRequest/EvidenceRequestStep';

interface SaveStepParams {
	step: EvidenceRequestStep;
	erId: string;
}

const saveStepAndReject = ({ step, erId }: SaveStepParams) => {
	return api.evidenceRequestFocalPointApi
		.saveStepAndReject({ erId: +erId, stepDto: toEvidenceRequestStepApi(step) })
		.then(({ data }) => data.valueOf());
};

const useSaveStepAndReject = () => {
	const queryClient = useQueryClient();
	return useMutation(saveStepAndReject, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-of-user']);
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useSaveStepAndReject;
