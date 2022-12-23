/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from '@carbon/react';
import CosmoTable from '@components/table/CosmoTable';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import isAfter from 'date-fns/isAfter';
import { Edit } from '@carbon/react/icons';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import modifyAnswerModalInfo from '@store/user-revalidation/modifyAnswerModalInfo';
import { CampaignDtoStatusEnum } from 'cosmo-api/src/v1/models/campaign-dto';
import User from '@model/User';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import DateCell from '@components/table/Cell/DateCell';
import TooltipCell from '@components/table/Cell/TooltipCell';
import UsersListCell from '@components/table/Cell/UsersListCell';

interface RevalidatorsTableProp {
	answers: Answer[];
	dueDate: Date | undefined;
	campaignType: string;
	reviewId: string;
	status?: CampaignDtoStatusEnum;
}

type ActionCellProps = {
	setModifyModal: SetterOrUpdater<{
		open: boolean;
		answer: Answer | undefined;
		revId: string | undefined;
		campaignType: string | undefined;
	}>;
	info: CellContext<Answer, unknown>;
	campaignType: string;
	revId: string;
};

const ActionCell = ({ setModifyModal, info, campaignType, revId }: ActionCellProps) => {
	const answer = info.getValue() as Answer;
	return (
		<div className='flex justify-center'>
			<Button
				size='sm'
				kind='ghost'
				hasIconOnly
				iconDescription='Edit'
				renderIcon={Edit}
				onClick={() =>
					setModifyModal({
						open: true,
						answer,
						campaignType,
						revId
					})
				}
			/>
		</div>
	);
};

const RevalidatorsTable = ({
	answers,
	dueDate,
	campaignType,
	reviewId,
	status
}: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);
	const isFireFighter = campaignType === 'FIREFIGHTER';
	const setModifyModal = useSetRecoilState(modifyAnswerModalInfo);
	const isSuid = campaignType === 'SUID';
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current?.getElementsByClassName('cds--data-table-content')?.[0];
		if (el) {
			// @ts-ignore
			const onWheel = evt => {
				if (evt.deltaY === 0) return;
				evt.preventDefault();
				el.scrollTo({
					left: el.scrollLeft + evt.deltaY
				});
			};
			el.addEventListener('wheel', onWheel);
		}
	}, []);

	const columns = useMemo<ColumnDef<Answer>[]>(() => {
		const ArrayCol: ColumnDef<Answer>[] = [
			{
				id: `revalidator${reviewId}`,
				accessorFn: row => row.revalidationUser?.displayName,
				header: t('userRevalidation:revalidators')
			},
			{
				id: `delegated${reviewId}`,
				accessorFn: row => ({ delegates: row.delegated }),
				header: t('userRevalidation:delegates'),
				cell: UsersListCell,
				enableGrouping: false,
				meta: {
					exportableFn: info =>
						(info as { delegates: User[] | undefined }).delegates
							?.map(delegate => delegate.displayName)
							.join(', ') ?? '-'
				}
			},
			{
				id: `answer${reviewId}`,
				accessorFn: row => row.answerType,
				header: t('userRevalidation:answer'),
				cell: info => {
					if (info.getValue()) {
						return info.getValue();
					}

					if (dueDate && isAfter(new Date(), dueDate)) {
						return t('userRevalidation:due-date-exceeded');
					}

					return t('userRevalidation:not-completed');
				}
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
				accessorFn: row => ({
					content: row.permissions,
					description: row.permissionDescription
				}),
				header: t('userRevalidation:permission'),
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
		if (status !== 'COMPLETED' && status !== 'COMPLETED_WITH_PARTIAL_ANSWERS') {
			ArrayCol.push({
				id: `action${reviewId}`,
				accessorFn: row => row,
				header: t('userAdmin:actions'),
				cell: info => ActionCell({ setModifyModal, info, campaignType, revId: reviewId }),
				enableGrouping: false,
				meta: {
					disableExport: true
				}
			});
		}
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
					header: t('userRevalidation:risk'),
					accessorFn: row => ({
						content: row.jsonApplicationData?.risk,
						description: row.jsonApplicationData?.riskDescription
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
			);
		}
		return ArrayCol;
	}, [campaignType, dueDate, isFireFighter, isSuid, reviewId, setModifyModal, status, t]);

	return (
		<div ref={ref}>
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
				exportFileName={() => 'revalidators'}
			/>
		</div>
	);
};
export default RevalidatorsTable;
