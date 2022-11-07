import useGetAllEvidenceOfUser from '@api/evidence-request/useGetAllEvidenceOfUser';
import useUrlState from '@hooks/useUrlState';
import {
	evidenceRequestsAction,
	evidenceRequestsActionFilters,
	filteredEvidenceRequestsAction
} from '@store/evidence-request/evidenceRequestActionFilter';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useEvidenceRequestAction = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
		action: string | undefined;
		tab: number | undefined;
		isTable: boolean | undefined;
	}>({
		q: undefined,
		action: undefined,
		tab: undefined,
		isTable: undefined
	});
	const [filters, setFilters] = useRecoilState(evidenceRequestsActionFilters);
	const setReqs = useSetRecoilState(evidenceRequestsAction);
	const { requests } = useRecoilValue(filteredEvidenceRequestsAction);
	const { data = new Map() } = useGetAllEvidenceOfUser();

	useEffect(() => {
		setReqs([...data.values()]);
	}, [data, setReqs]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q,
			tab: urlFilters.tab,
			action: urlFilters.action,
			isTable: urlFilters.isTable
		});
	}, [urlFilters, setFilters]);

	return { requests, filters, setFilters: setUrlFilters };
};

export default useEvidenceRequestAction;
