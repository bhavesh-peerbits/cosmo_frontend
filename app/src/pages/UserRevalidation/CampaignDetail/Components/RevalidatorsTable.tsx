/* eslint-disable @typescript-eslint/ban-ts-comment */
import CosmoTable from '@components/table/CosmoTable';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/UserRevalidation/Answer';
import isAfter from 'date-fns/isAfter';
import { useSetRecoilState } from 'recoil';
import modifyAnswerModalInfo from '@store/user-revalidation/modifyAnswerModalInfo';
import { CampaignDtoStatusEnum } from 'cosmo-api/src/v1/models/campaign-dto';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@components/table/Cell/DateCell';
import TooltipCell from '@components/table/Cell/TooltipCell';
import UsersListCell from '@components/table/Cell/UsersListCell';
import { InlineActions } from '@components/table/types/InlineActionType';
import DeleteAnswerModal from '../Modals/DeleteAnswerModal';

interface RevalidatorsTableProp {
	answers: Answer[];
	dueDate: Date | undefined;
	campaignType: string;
	campaignId: string;
	reviewId: string;
	status?: CampaignDtoStatusEnum;
}

const RevalidatorsTable = ({
	answers,
	dueDate,
	campaignType,
	campaignId,
	reviewId,
	status
}: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin', 'modals']);
	const isFireFighter = campaignType === 'FIREFIGHTER';
	const setModifyModal = useSetRecoilState(modifyAnswerModalInfo);
	const isSuid = campaignType === 'SUID';
	const [answerToDelete, setAnswerToDelete] = useState<Answer>();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const columns = useMemo<ColumnDef<Answer>[]>(() => {
		const ArrayCol: ColumnDef<Answer>[] = [
			{
				id: `revalidator${reviewId}`,
				accessorFn: row => row.revalidationUser?.displayName,
				header: t('userRevalidation:revalidators')
			},
			{
				id: `delegated${reviewId}`,
				header: t('userRevalidation:delegates'),
				cell: info => UsersListCell({ users: info.row.original.delegated }),
				accessorFn: row =>
					row.delegated?.map(delegate => delegate.displayName).join(', ') ?? '-'
			},
			{
				id: `answer${reviewId}`,
				accessorFn: row => {
					if (row.answerType) {
						return row.answerType;
					}

					if (dueDate && isAfter(new Date(), dueDate)) {
						return t('userRevalidation:due-date-exceeded');
					}

					return t('userRevalidation:not-completed');
				},
				header: t('userRevalidation:answer'),
				meta: { filter: { type: 'checkbox' } }
			},
			{
				id: `answerNote${reviewId}`,
				accessorFn: row => row.note,
				header: t('userRevalidation:note')
			},
			{
				id: `givenBy${reviewId}`,
				header: t('userRevalidation:given-by'),
				accessorFn: row => row.givenBy?.displayName
			},
			{
				id: `givenAt${reviewId}`,
				header: t('userRevalidation:given-at'),
				accessorFn: row => row.givenAt,
				cell: DateCell
			},
			{
				id: `user${reviewId}`,
				header: 'Username',
				accessorFn: row => row.userToRevalidate,
				sortUndefined: 1
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
			ArrayCol.splice(6, 0, {
				id: `fireFighter${reviewId}`,
				accessorFn: row => row.firefighterID,
				header: t('userRevalidation:fire-fighter')
			});
		}
		if (isFireFighter || isSuid) {
			ArrayCol.splice(
				6,
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
	}, [dueDate, isFireFighter, isSuid, reviewId, t]);

	const inlineActions: InlineActions<Answer>[] =
		status !== 'COMPLETED' && status !== 'COMPLETED_WITH_PARTIAL_ANSWERS'
			? [
					{
						label: t('modals:edit'),
						onClick: data => {
							setModifyModal({
								open: true,
								answer: data.original,
								campaignType,
								revId: reviewId
							});
						}
					},
					{
						isDelete: () => true,
						label: t('modals:delete'),
						onClick: data => {
							setIsDeleteModalOpen(true);
							setAnswerToDelete(data.original);
						}
					}
			  ]
			: [];

	return (
		<>
			<DeleteAnswerModal
				answer={answerToDelete}
				campaignId={campaignId}
				isOpen={isDeleteModalOpen}
				setIsOpen={setIsDeleteModalOpen}
			/>
			<CosmoTable
				tableId={reviewId}
				inlineActions={inlineActions}
				data={answers}
				columns={columns}
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				isColumnOrderingEnabled
				noDataMessage={t('table:no-data')}
				exportFileName={() => 'revalidators'}
			/>
		</>
	);
};
export default RevalidatorsTable;
