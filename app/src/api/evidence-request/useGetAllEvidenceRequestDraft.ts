import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromEvidenceRequestDraftApi } from '@model/EvidenceRequestDraft';
import { toMap } from '@model/util';

const getAllEvidenceRequestDraft = () => {
	return api.evidenceRequest
		.getAllDraft()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestDraftApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-request-draft'], getAllEvidenceRequestDraft);
