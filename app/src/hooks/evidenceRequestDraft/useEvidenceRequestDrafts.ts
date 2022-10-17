import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import useGetAllEvidenceRequestDraft from '@api/evidence-request/useGetAllEvidenceRequestDraft';
import {
	evidenceRequestDraftsFilters,
	evidenceRequestDrafts,
	filteredEvidenceRequestDrafts
} from '@store/evidenceRequestDraft/evidenceRequestDraftsFilters';

const useEvidenceRequestDrafts = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
	}>({
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(evidenceRequestDraftsFilters);
	const setDrafts = useSetRecoilState(evidenceRequestDrafts);
	const { drafts } = useRecoilValue(filteredEvidenceRequestDrafts);
	const { data = new Map() } = useGetAllEvidenceRequestDraft();

	useEffect(() => {
		setDrafts([...data.values()]);
	}, [data, setDrafts]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { drafts, filters, setFilters: setUrlFilters };
};

export default useEvidenceRequestDrafts;
