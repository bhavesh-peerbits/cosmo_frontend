import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest';

const useGetEvidenceRequestByIdFocalPoint = (requestId: string) => {
	return api.evidenceRequestFocalPointApi
		.getEvidenceRequestById({ id: +requestId })
		.then(({ data }) => fromEvidenceRequestApi(data));
};

export default (requestId: string) =>
	useQuery(['evidence-request', requestId], () =>
		useGetEvidenceRequestByIdFocalPoint(requestId)
	);
