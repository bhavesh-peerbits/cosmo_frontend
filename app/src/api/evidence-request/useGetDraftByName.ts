import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';

const useGetDraftByName = (draftName: string) => {
	return api.evidenceRequest
		.getDraftByName({ name: draftName })
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

export default (draftName: string) =>
	useQuery(['draft', draftName], () => useGetDraftByName(draftName));
