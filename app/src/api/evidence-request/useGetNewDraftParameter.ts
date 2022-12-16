import api from '@api';
import { fromNewDraftParameterApi } from '@model/NewDraftParameter';
import { useQuery } from '@tanstack/react-query';

const getNewDraftParameter = () => {
	return api.evidenceRequest
		.getNewDraftParameter()
		.then(({ data }) => fromNewDraftParameterApi(data));
};

export default () => useQuery(['draft-parameter'], getNewDraftParameter);
