import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest';

const useGetEvidenceRequestById = (requestId: string) => {
	return api.evidenceRequest
		.getEvidenceRequestById({ id: +requestId })
		.then(({ data }) => fromEvidenceRequestApi(data));
};

export default (requestId: string) =>
	useQuery(['evidence-request', requestId], () => useGetEvidenceRequestById(requestId));
