import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	filteredProcedures,
	proceduresFilters,
	proceduresList
} from '@store/admin-panel/proceduresFilters';
import useGetProcedures from '@api/procedures/useGetProcedures';

const useAdminProcedures = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
	}>({
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(proceduresFilters);
	const setProcedures = useSetRecoilState(proceduresList);
	const { procedures } = useRecoilValue(filteredProcedures);
	const { data = new Map() } = useGetProcedures();

	useEffect(() => {
		setProcedures([...data.values()]);
	}, [data, setProcedures]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { procedures, filters, setFilters: setUrlFilters };
};

export default useAdminProcedures;
