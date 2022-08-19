import useGetUsers from '@api/user/useGetUsers';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import Answer from '@model/Answer';
import { useCallback } from 'react';

const RevalidationUsersTable = () => {
	const { data: users = [] } = useGetUsers();
	const fakeData: Answer[] = [
		{
			id: 'provaAnswer',
			userToRevalidate: 'federica.bruno',
			permissions: 'provPermission',
			permissionDescription: 'prova permission description'
		}
	];
	const columns: HeaderFunction<Answer> = useCallback(
		table => [
			table.createDataColumn(row => row.userToRevalidate, {
				id: 'user',
				header: 'Username',
				sortUndefined: 1
			}),
			table.createDataColumn(
				row => users.find(user => user.username === row.userToRevalidate)?.id,
				{
					id: 'userId',
					header: 'Id'
				}
			),
			table.createDataColumn(
				row => users.find(user => user.username === row.userToRevalidate)?.displayName,
				{
					id: 'userDisplayName',
					header: 'User'
				}
			),
			table.createDataColumn(row => row.permissions, {
				id: 'permissions',
				header: 'Permission'
			}),
			table.createDataColumn(row => row.answerType, {
				id: 'answer',
				header: 'Answer'
			})
		],
		[users]
	);
	return <CosmoTable level={1} data={fakeData} createHeaders={columns} />;
};
export default RevalidationUsersTable;
