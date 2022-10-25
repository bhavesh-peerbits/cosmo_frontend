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
		isTile: boolean | undefined;
	}>({
		q: undefined,
		action: undefined,
		tab: undefined,
		isTile: undefined
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
			isTile: urlFilters.isTile
		});
	}, [urlFilters, setFilters]);

	return { requests, filters, setFilters: setUrlFilters };
};

export default useEvidenceRequestAction;
