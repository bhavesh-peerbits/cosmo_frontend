/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import Procedure from '@model/Procedure';
import { GetRecoilType } from '@store/util';

type Filters = {
	query: string | undefined;
};

const proceduresFilters = atom<Filters>({
	key: 'proceduresFilters',
	default: {
		query: ''
	}
});

const proceduresList = atom<Procedure[]>({
	key: 'procedures',
	default: []
});

const applyFilters = (
	procedures: GetRecoilType<typeof proceduresList>,
	filters: GetRecoilType<typeof proceduresFilters>
) => {
	const filteredProcedures = procedures
		// filter by query term string
		.filter(procedure =>
			filters.query
				? procedure.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toString().toLowerCase().trim())
				: true
		);
	return filteredProcedures;
};

const filteredProcedures = selector({
	key: 'filteredProcedures',
	get: ({ get }) => {
		const filters = get(proceduresFilters);
		const procedures = get(proceduresList);
		return {
			procedures: applyFilters(procedures, filters)
		};
	}
});

export { proceduresFilters, proceduresList, filteredProcedures };
