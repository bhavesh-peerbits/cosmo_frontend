import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest/EvidenceRequest';

const useGetEvidenceRequestById = (requestId: string) => {
	return api.evidenceRequest
		.getEvidenceRequestById1({ id: +requestId })
		.then(({ data }) => fromEvidenceRequestApi(data));
};

export default (requestId: string) =>
	useQuery(['evidence-request', requestId], () => useGetEvidenceRequestById(requestId));
