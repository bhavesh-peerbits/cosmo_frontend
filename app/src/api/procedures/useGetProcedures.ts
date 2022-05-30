import api from '@api';
import { fromProcedureApi } from '@model/Procedure';
import { useQuery } from 'react-query';
import { toMap } from '@model/util';

const getProcedures = () => {
	return api.procedureApi
		.getAllProcedure()
		.then(({ data }) => (data ? data.map(fromProcedureApi) : []))
		.then(toMap);
};

export default () => useQuery(['procedures'], getProcedures);
