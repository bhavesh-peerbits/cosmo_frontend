import EvidenceRequest from '@model/EvidenceRequest';
import { atom } from 'recoil';

type Filters = {
	query: string | undefined;
	currentStep: number | undefined;
	creator: string | undefined;
	dueDate: number | undefined;
};

const evidenceRequestFilters = atom<Filters>({
	key: 'evidenceRequestFilters',
	default: {
		query: undefined,
		currentStep: undefined,
		creator: undefined,
		dueDate: undefined
	}
});

const evidenceRequests = atom<EvidenceRequest[]>({
	key: 'evidenceRequests',
	default: []
});

export { evidenceRequestFilters, evidenceRequests };
