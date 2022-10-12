import useGetAllEvidenceRequest from '@api/evidence-request/useGetAllEvidenceRequest';
import useUrlState from '@hooks/useUrlState';
import {
	evidenceRequests,
	evidenceRequestsFilters,
	filteredEvidenceRequests
} from '@store/evidence-request/evidenceRequestsFilter';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useEvidenceRequests = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		minDueDate: string | undefined;
		maxDueDate: string | undefined;
		minCompDate: string | undefined;
		maxCompDate: string | undefined;
		status: string[];
		creator: string[];
		q: string | undefined;
		currentStep: number[] | undefined;
		tab: number | undefined;
	}>({
		minDueDate: undefined,
		maxDueDate: undefined,
		minCompDate: undefined,
		maxCompDate: undefined,
		status: [],
		creator: [],
		q: undefined,
		currentStep: [],
		tab: undefined
	});
	const [filters, setFilters] = useRecoilState(evidenceRequestsFilters);
	const setReqs = useSetRecoilState(evidenceRequests);
	const {
		status,
		maxCompDate,
		minCompDate,
		minDueDate,
		maxDueDate,
		requests,
		creator,
		currentStep
	} = useRecoilValue(filteredEvidenceRequests);
	const { data = new Map() } = useGetAllEvidenceRequest();

	useEffect(() => {
		setReqs([...data.values()]);
	}, [data, setReqs]);

	useEffect(() => {
		setFilters({
			minDueDate: urlFilters.minDueDate,
			maxDueDate: urlFilters.maxDueDate,
			minCompDate: urlFilters.minCompDate,
			maxCompDate: urlFilters.maxCompDate,
			status: urlFilters.status || [],
			creator: urlFilters.creator || [],
			query: urlFilters.q,
			currentStep: urlFilters.currentStep || [],
			tab: urlFilters.tab
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		minDueDate,
		maxDueDate,
		minCompDate,
		maxCompDate,
		status,
		requests,
		creator,
		currentStep
	};
	return { requests, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useEvidenceRequests;
