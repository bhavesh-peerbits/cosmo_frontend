import EvidenceRequest from '@model/EvidenceRequest';
import { GetRecoilType } from '@store/util';
import { atom, selector } from 'recoil';

type Filters = {
	query: string | undefined;
	action: string | undefined;
	tab: number | undefined;
	isTile: boolean | undefined;
};

const evidenceRequestsActionFilters = atom<Filters>({
	key: 'evidenceRequestActionFilters',
	default: {
		query: undefined,
		action: undefined,
		tab: undefined,
		isTile: undefined
	}
});

const evidenceRequestsAction = atom<EvidenceRequest[]>({
	key: 'evidenceRequestsAction',
	default: []
});

const applyFilters = (
	requests: GetRecoilType<typeof evidenceRequestsAction>,
	filters: GetRecoilType<typeof evidenceRequestsActionFilters>
) => {
	const filteredRequest = requests
		// filter by query term string
		.filter(request =>
			filters.query
				? request.code
						?.toLowerCase()
						?.trim()
						?.includes(`${filters.query}`.toLowerCase().trim()) ||
				  request.application.codeName
						.toLowerCase()
						.trim()
						.includes(`${filters.query}`.toLowerCase().trim())
				: true
		)
		.filter(request =>
			!filters.tab
				? request.status === 'IN_PROGRESS'
				: request.status !== 'DRAFT' && request.status !== 'IN_PROGRESS'
		)

		.filter(request =>
			filters.action
				? request.steps.filter(st => st.stepOrder === request.currentStep)[0].type ===
				  filters.action
				: true
		);

	return filteredRequest;
};

const filteredEvidenceRequestsAction = selector({
	key: 'filteredEvidenceRequestsAction',
	get: ({ get }) => {
		const filters = get(evidenceRequestsActionFilters);
		const requests = get(evidenceRequestsAction);
		return {
			requests: applyFilters(requests, filters)
		};
	}
});

export {
	evidenceRequestsActionFilters,
	evidenceRequestsAction,
	filteredEvidenceRequestsAction
};
