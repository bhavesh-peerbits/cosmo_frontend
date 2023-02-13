import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest/EvidenceRequest';
import { toMap } from '@model/common/util';

const getAllEvidenceRequest = () => {
	return api.evidenceRequest
		.getAllEvidenceRequest()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-request'], getAllEvidenceRequest);
