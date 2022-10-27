import EvidenceRequest from '@model/EvidenceRequest';
import authStore from '@store/auth/authStore';
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
	filters: GetRecoilType<typeof evidenceRequestsActionFilters>,
	auth: GetRecoilType<typeof authStore>
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
		.filter(request => {
			const currStep = request.steps.filter(
				st => st.stepOrder === request.currentStep
			)[0];
			const idUserInStep = auth?.user?.id
				? (currStep && currStep.approvers?.map(us => us.id).includes(auth.user.id)) ||
				  (currStep && currStep.delegates?.map(us => us.id).includes(auth.user.id)) ||
				  (currStep && currStep.reviewer?.id === auth.user.id)
				: false;
			return !filters.tab
				? request.status === 'IN_PROGRESS' && idUserInStep
				: request.status !== 'DRAFT' && !idUserInStep;
		})

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
		const auth = get(authStore);
		const filters = get(evidenceRequestsActionFilters);
		const requests = get(evidenceRequestsAction);
		return {
			requests: applyFilters(requests, filters, auth)
		};
	}
});

export {
	evidenceRequestsActionFilters,
	evidenceRequestsAction,
	filteredEvidenceRequestsAction
};
