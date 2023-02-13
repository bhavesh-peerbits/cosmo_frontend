import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromEvidenceRequestApi } from '@model/EvidenceRequest/EvidenceRequest';
import { toMap } from '@model/common/util';

const getAllEvidenceOfUser = () => {
	return api.evidenceRequestFocalPointApi
		.getAllEvidenceOfUser()
		.then(({ data }) => (data ? data.map(fromEvidenceRequestApi) : []))
		.then(toMap);
};

export default () => useQuery(['evidence-of-user'], getAllEvidenceOfUser);
