import api from '@api';
import { useQuery } from 'react-query';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';

const getApplicationProcedures = () => {
	return api.procedureApi
		.getAllProcedureApp()
		.then(({ data }) => (data ? data.map(fromProcedureAppInstanceApi) : []));
};
// TODO check if is necessary to use useQuery hook with cache (see mutations on apps and procedures)
export default () => useQuery(['application-procedures'], getApplicationProcedures);
