import useGetUsers from '@api/user/useGetUsers';
import { HeaderFunction } from '@components/table/CosmoTable';
import Answer from '@model/Answer';
import { useCallback, useState } from 'react';
import { CloudDownload, Email } from '@carbon/react/icons';
import CosmoTableRevalidationUsers from '@components/table/CosmoTableRevalidationUsers';
import { useTranslation } from 'react-i18next';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { User } from '@sentry/react';

const ActionsCell = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')} direction='top'>
			<OverflowMenuItem itemText='prova' />
			<OverflowMenuItem itemText='prova2' />
		</OverflowMenu>
	);
};
const RevalidationUsersTable = () => {
	const { data: users = [] } = useGetUsers();
	const { t } = useTranslation('userRevalidation');
	const [, setAnswerSelected] = useState<User>();
	const fakeData: Answer[] = [
		{
			id: 'provaAnswer',
			userToRevalidate: 'federica.bruno',
			permissions: 'provPermission',
			permissionDescription: 'prova permission description'
		},
		{
			id: 'provaAnswer3',
			userToRevalidate: 'federica.bruno',
			permissions: 'provPermission2',
			permissionDescription: 'prova permission description'
		},
		{
			id: 'provaAnswer2',
			userToRevalidate: 'prova',
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
				row => users.find(user => user.username === row.userToRevalidate)?.displayName,
				{
					id: 'userDisplayName',
					header: 'User'
				}
			),
			table.createDataColumn(row => row.permissions, {
				id: 'permissions',
				header: t('permission')
			}),
			table.createDataColumn(row => row.answerType, {
				id: 'answer',
				header: t('answer')
			})
		],
		[users, t]
	);
	const toolbarBatchActions = [
		{
			id: 'email',
			icon: Email,
			onClick: () => {},
			label: 'prova'
		},
		{
			id: 'cloud',
			icon: CloudDownload,
			onClick: () => {},
			label: 'Narrative'
		}
	];

	return (
		<CosmoTableRevalidationUsers
			data={fakeData}
			createHeaders={columns}
			noDataMessage='No data'
			toolbar={{ toolbarBatchActions }}
			exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
			inlineAction={<ActionsCell />}
			setRowSelected={setAnswerSelected}
		/>
	);
};
export default RevalidationUsersTable;
