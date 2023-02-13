import api from '@api';
import { fromProcedureApi } from '@model/Narrative/Procedure';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/common/util';

const getProcedures = () => {
	return api.procedureApi
		.getAllProcedure1()
		.then(({ data }) => (data ? data.map(fromProcedureApi) : []))
		.then(toMap);
};

export default () => useQuery(['procedures'], getProcedures);
