import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';

const getAllEvidenceRequestDraft = () => {
	return api.evidenceRequest
		.testGetDraftDto()
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

export default () => useQuery(['evidence-request-draft'], getAllEvidenceRequestDraft);
