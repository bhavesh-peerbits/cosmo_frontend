/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';

type Filters = {
	query: string | undefined;
};

const evidenceRequestDraftsFilters = atom<Filters>({
	key: 'evidenceRequestDraftsFilters',
	default: {
		query: ''
	}
});

const evidenceRequestDrafts = atom<EvidenceRequestDraft[]>({
	key: 'evidenceRequestDrafts',
	default: []
});

const applyFilters = (
	drafts: GetRecoilType<typeof evidenceRequestDrafts>,
	filters: GetRecoilType<typeof evidenceRequestDraftsFilters>
) => {
	const filteredDrafts = drafts
		// filter by query term string
		.filter(draft =>
			filters.query
				? draft.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toString().toLowerCase().trim())
				: true
		);

	return filteredDrafts;
};

const filteredEvidenceRequestDrafts = selector({
	key: 'filteredEvidenceRequestDrafts',
	get: ({ get }) => {
		const filters = get(evidenceRequestDraftsFilters);
		const drafts = get(evidenceRequestDrafts);
		return {
			drafts: applyFilters(drafts, filters)
		};
	}
});

export {
	evidenceRequestDraftsFilters,
	evidenceRequestDrafts,
	filteredEvidenceRequestDrafts
};
