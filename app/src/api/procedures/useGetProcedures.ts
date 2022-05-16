import api from '@api';
import { fromProcedureApi } from '@model/Procedure';
import { useQuery } from 'react-query';

const getProcedures = () => {
	return api.procedureApi
		.getAllProcedure()
		.then(({ data }) => (data ? data.map(fromProcedureApi) : []));
};

export default () => useQuery(['procedures'], getProcedures);
