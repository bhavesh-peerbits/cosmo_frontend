import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';
import { toMap } from '@model/util';

const getAllEvidenceRequestDraft = () => {
	return api.evidenceRequest
		.getAllDraft()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestDraftApi) : []))
		.then(toMap);
};

export default () => useQuery(['evidence-request-draft'], getAllEvidenceRequestDraft);
