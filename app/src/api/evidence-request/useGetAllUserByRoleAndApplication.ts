import api from '@api';
import { useQuery } from 'react-query';

interface GetUserProps {
	role: string;
	appId: string;
}

const getAllUserByRoleAndApplication = ({ role, appId }: GetUserProps) => {
	return api.userApi
		.getAllUserByRoleAndApplication({ role, appId: +appId })
		.then(({ data }) => Array.from(data));
};

const useGetAllUserByRoleAndApplication = ({ role, appId }: GetUserProps) =>
	useQuery(['possible-collaborators'], () =>
		getAllUserByRoleAndApplication({ role, appId })
	);

export default useGetAllUserByRoleAndApplication;
