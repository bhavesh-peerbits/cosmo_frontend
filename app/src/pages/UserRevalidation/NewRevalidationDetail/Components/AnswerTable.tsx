import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/UserRevalidation/Answer';
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
				cell: info => UsersListCell({ users: info.row.original.delegated }),
				accessorFn: row =>
					row.delegated?.map(delegate => delegate.displayName).join(', ') ?? '-'
			},

			{
				id: `userDisplayName${reviewId}`,
				accessorFn: row => row.userDetails,
				header: t('userRevalidation:user-details')
			},

			{
				id: `permissions${reviewId}`,
				header: t('userRevalidation:permission'),
				accessorFn: row => row.permissions,
				cell: info =>
					TooltipCell({ info, description: info.row.original.permissionDescription })
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
					accessorFn: row => row.jsonApplicationData?.risk,
					header: t('userRevalidation:risk'),
					cell: info =>
						TooltipCell({
							info,
							description: info.row.original.jsonApplicationData?.riskDescription
						})
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
