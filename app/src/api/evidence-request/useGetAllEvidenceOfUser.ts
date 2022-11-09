import api from '@api';
import { useQuery } from 'react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest';
import { toMap } from '@model/util';

const getAllEvidenceOfUser = () => {
	return api.evidenceRequestFocalPointApi
		.getAllEvidenceOfUser()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestApi) : []))
		.then(toMap);
};

export default () => useQuery(['evidence-of-user'], getAllEvidenceOfUser);