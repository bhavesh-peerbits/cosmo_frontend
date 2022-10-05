import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest';
import { toMap } from '@model/util';

const getAllEvidenceRequest = () => {
	return api.evidenceRequest
		.getAllEvidenceRequest()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-request'], getAllEvidenceRequest);
