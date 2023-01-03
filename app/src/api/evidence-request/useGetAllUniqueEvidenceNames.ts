import api from '@api';
import { useQuery } from '@tanstack/react-query';

const getAllUniqueEvidenceNames = () => {
	return api.evidenceRequest
		.getAllUniqueEvidenceNames()
		.then(({ data }) => Array.from(data));
};

export default () => useQuery(['unique-names'], getAllUniqueEvidenceNames);
