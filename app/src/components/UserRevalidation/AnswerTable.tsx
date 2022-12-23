import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import User from '@model/User';
import { ColumnDef } from '@tanstack/react-table';
import TooltipCell from '@components/table/Cell/TooltipCell';
import UsersListCell from '@components/table/Cell/UsersListCell';
import CosmoTable from '@components/table/CosmoTable';

interface AnswerTableProp {
	answers: Answer[];
	reviewId: string;
	campaignType: string;
}

const AnswerTable = ({ answers, reviewId, campaignType }: AnswerTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);
	const isFireFighter = campaignType === 'FIREFIGHTER';
	const isSuid = campaignType === 'SUID';

	const columns = useMemo<ColumnDef<Answer>[]>(() => {
		const ArrayCol: ColumnDef<Answer>[] = [
			{
				id: `revalidator${reviewId}`,
				accessorFn: row => row.revalidationUser?.displayName,
				header: t('userRevalidation:revalidators')
			},

			{
				id: `user${reviewId}`,
				header: 'Username',
				accessorFn: row => row.userToRevalidate,
				sortUndefined: 1
			},

			{
				id: `delegated${reviewId}`,
				header: t('userRevalidation:delegates'),
				cell: UsersListCell,
				accessorFn: row => ({ delegates: row.delegated }),
				enableGrouping: false,
				meta: {
					exportableFn: info =>
						(info as { delegates: User[] | undefined }).delegates
							?.map(delegate => delegate.displayName)
							.join(', ') ?? '-'
				}
			},

			{
				id: `userDisplayName${reviewId}`,
				accessorFn: row => row.userDetails,
				header: t('userRevalidation:user-details')
			},

			{
				id: `permissions${reviewId}`,
				header: t('userRevalidation:permission'),
				accessorFn: row => ({
					content: row.permissions,
					description: row.permissionDescription
				}),
				cell: TooltipCell,
				meta: {
					exportableFn: info =>
						(
							info as {
								content: string;
								description?: string;
							}
						).content
				}
			}
		];
		if (isFireFighter) {
			ArrayCol.splice(4, 0, {
				id: `fireFighter${reviewId}`,
				accessorFn: row => row.firefighterID,
				header: t('userRevalidation:fire-fighter')
			});
		}
		if (isFireFighter || isSuid) {
			ArrayCol.splice(
				4,
				0,

				{
					id: `risk${reviewId}`,
					accessorFn: row => ({
						content: row.jsonApplicationData?.risk,
						description: row.jsonApplicationData?.riskDescription
					}),
					header: t('userRevalidation:risk'),
					cell: TooltipCell,
					meta: {
						exportableFn: info =>
							(
								info as {
									content: string;
									description?: string;
								}
							).content
					}
				}
			);
		}
		return ArrayCol;
	}, [isFireFighter, isSuid, reviewId, t]);

	return (
		<CosmoTable
			tableId={reviewId}
			data={answers}
			columns={columns}
			toolbar={{
				searchBar: true,
				toolbarBatchActions: [],
				toolbarTableMenus: []
			}}
			isColumnOrderingEnabled
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default AnswerTable;
