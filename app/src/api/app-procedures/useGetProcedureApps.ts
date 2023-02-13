import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromProcedureAppInstanceApi } from '@model/Narrative/ProcedureAppInstance';
import { toMap } from '@model/util';

const getApplicationProcedures = () => {
	return api.procedureApi
		.getAllProcedureApp()
		.then(({ data }) => (data ? data.map(fromProcedureAppInstanceApi) : []))
		.then(toMap);
};
export default () => useQuery(['app-procedures'], getApplicationProcedures);
