import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';

const useGetDraftById = (draftId: string) => {
	return api.evidenceRequest
		.getDraftById({ id: +draftId })
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

export default (draftId: string) =>
	useQuery(['draft', draftId], () => useGetDraftById(draftId), {
		cacheTime: Infinity
	});
