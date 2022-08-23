import useGetUsers from '@api/user/useGetUsers';
import { HeaderFunction } from '@components/table/CosmoTable';
import Answer from '@model/Answer';
import { useCallback, useState } from 'react';
import {
	CheckmarkOutline,
	RequestQuote,
	MisuseOutline,
	Error
} from '@carbon/react/icons';
import CosmoTableRevalidationUsers from '@components/table/CosmoTableRevalidationUsers';
import { useTranslation } from 'react-i18next';
import { OverflowMenu, OverflowMenuItem, TableToolbarSearch } from '@carbon/react';
import { User } from '@sentry/react';
import UserRevalidationActionModal from '@components/Modals/UserRevalidationActionModal';

type ActionCellProps = {
	setIsModalOpen: (val: boolean) => void;
	setActionSelected: (val: string) => void;
};

const ActionsCell = ({ setIsModalOpen, setActionSelected }: ActionCellProps) => {
	const { t } = useTranslation(['userAdmin', 'userRevalidation']);
	return (
		<OverflowMenu
			ariaLabel='Actions'
			iconDescription={t('userAdmin:actions')}
			direction='top'
		>
			<OverflowMenuItem
				itemText={
					<div className='flex space-x-3'>
						<CheckmarkOutline />
						<div>{t('userRevalidation:confirm')}</div>
					</div>
				}
				onClick={() => {}}
			/>
			<OverflowMenuItem
				itemText={
					<div className='flex space-x-3'>
						<RequestQuote />
						<div>{t('userRevalidation:change-request')}</div>
					</div>
				}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('Modification');
				}}
			/>
			<OverflowMenuItem
				itemText={
					<div className='flex space-x-3'>
						<MisuseOutline />
						<div>{t('userRevalidation:report-error')}</div>
					</div>
				}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('Error');
				}}
			/>
			<OverflowMenuItem
				itemText={
					<div className='flex space-x-3'>
						<Error />
						<div>{t('userRevalidation:block')}</div>
					</div>
				}
				onClick={() => {}}
			/>
		</OverflowMenu>
	);
};
const RevalidationUsersTable = () => {
	const { data: users = [] } = useGetUsers();
	const { t } = useTranslation([
		'userRevalidation',
		'userAdmin',
		'table',
		'applicationInfo'
	]);
	const [, setAnswerSelected] = useState<User>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [actionSelected, setActionSelected] = useState<string>('');

	const fakeData: Answer[] = [
		{
			id: 'provaAnswer',
			userToRevalidate: 'federica.bruno',
			permissions: 'provPermission',
			permissionDescription: 'prova permission description',
			answerType: 'OK'
		},
		{
			id: 'provaAnswer3',
			userToRevalidate: 'federica.bruno',
			permissions: 'provPermission2',
			permissionDescription: 'prova permission description',
			answerType: 'MODIFY'
		},
		{
			id: 'provaAnswer2',
			userToRevalidate: 'prova',
			permissions: 'provPermission',
			permissionDescription: 'prova permission description',
			answerType: 'LOCK'
		},
		{
			id: 'provaAnswer4',
			userToRevalidate: 'prova',
			permissions: 'provPermission',
			permissionDescription: 'prova permission description',
			answerType: 'REPORT_ERROR'
		}
	];

	const translateAnswer = useCallback(
		(answer?: string) => {
			switch (answer) {
				case 'OK':
					return t('applicationInfo:confirmed');
				case 'LOCK':
					return t('userAdmin:blocked');
				case 'REPORT_ERROR':
					return t('userRevalidation:reported-error');
				case 'MODIFY':
					return t('userRevalidation:change-request');
				default:
					return null;
			}
		},
		[t]
	);

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
				header: t('userRevalidation:permission')
			}),
			table.createDataColumn(row => row.answerType, {
				id: 'answer',
				header: t('userRevalidation:answer'),
				cell: info => translateAnswer(info.getValue())
			})
		],
		[users, t, translateAnswer]
	);
	const toolbarBatchActions = [
		{
			id: 'confirm-selection',
			icon: CheckmarkOutline,
			onClick: () => {},
			label: t('userRevalidation:confirm')
		},
		{
			id: 'change-selection',
			icon: RequestQuote,
			onClick: () => {},
			label: t('userRevalidation:change-request')
		},
		{
			id: 'error-selection',
			icon: MisuseOutline,
			onClick: () => {},
			label: t('userRevalidation:report-error')
		},
		{
			id: 'block-selection',
			icon: Error,
			onClick: () => {},
			label: t('userRevalidation:report-error')
		}
	];

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('userAdmin:search-placeholder')}
			id='search'
		/>
	);
	return (
		<>
			<UserRevalidationActionModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				actionSelected={actionSelected}
			/>
			<CosmoTableRevalidationUsers
				data={fakeData}
				createHeaders={columns}
				noDataMessage={t('table:no-data')}
				toolbar={{ toolbarBatchActions, toolbarContent }}
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
				inlineAction={
					<ActionsCell
						setIsModalOpen={setIsModalOpen}
						setActionSelected={setActionSelected}
					/>
				}
				setRowSelected={setAnswerSelected}
			/>
		</>
	);
};
export default RevalidationUsersTable;
