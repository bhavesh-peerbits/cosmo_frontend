import CampaignApplication from '@model/CampaignApplication';
import useAnswerStore from '@hooks/user-revalidation-review/useAnswerStore';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import CosmoTable from '@components/table/CosmoTable';
import {
	CheckmarkOutline,
	RequestQuote,
	MisuseOutline,
	Error,
	Information
} from '@carbon/react/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OverflowMenu, OverflowMenuItem, Tooltip } from '@carbon/react';
import { AnswerApiTypeEnum } from 'cosmo-api/src';
import useMapAnswerType from '@hooks/user-revalidation-review/useMapAnswerType';
import UserRevalidationActionModal, {
	UserRevalidationActionState
} from '@pages/UserRevalidation/UserRevalidationDetails/Modals/UserRevalidationActionModal';
import useGetRevalidatorAnswers from '@api/review-campaign/useGetRevalidatorAnswers';
import { useParams } from 'react-router-dom';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import TooltipCell from '@components/table/Cell/TooltipCell';
import DateCell from '@components/table/Cell/DateCell';

interface CosmoTableRevalidationUsersProps {
	review: CampaignApplication;
}

interface ActionCellProps {
	info: CellContext<Answer, unknown>;
	onActionClick: (answerType: AnswerApiTypeEnum, note?: string) => void;
	setIsModalOpen: (isOpen: UserRevalidationActionState) => void;
}

const ActionsCell = ({ info, onActionClick, setIsModalOpen }: ActionCellProps) => {
	const { t } = useTranslation(['userAdmin', 'userRevalidation']);
	const value = info.getValue() as string;
	const { note } = info.row.original;
	const notTranslated = info.row.original.answerType;
	return (
		<div className=' flex w-full items-center justify-between'>
			<div>
				{notTranslated !== 'MODIFY' && notTranslated !== 'REPORT_ERROR' ? (
					value
				) : (
					<div className='grid grid-cols-6'>
						<span className='col-span-5'>{value}</span>
						<span className='self-center text-right'>
							<Tooltip description={note} align='top'>
								<button type='button'>
									<Information />
								</button>
							</Tooltip>
						</span>
					</div>
				)}
			</div>
			<div>
				<OverflowMenu
					ariaLabel='Actions'
					flipped
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
						onClick={() => onActionClick('OK')}
					/>
					<OverflowMenuItem
						itemText={
							<div className='flex space-x-3'>
								<RequestQuote />
								<div>{t('userRevalidation:change-request')}</div>
							</div>
						}
						onClick={() => {
							setIsModalOpen({
								isOpen: true,
								actionSelected: 'Change',
								note,
								onSuccess: ({ description }) => onActionClick('MODIFY', description)
							});
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
							setIsModalOpen({
								isOpen: true,
								actionSelected: 'Error',
								note,
								onSuccess: ({ description }) => onActionClick('REPORT_ERROR', description)
							});
						}}
					/>
					<OverflowMenuItem
						itemText={
							<div className='flex space-x-3'>
								<Error />
								<div>{t('userRevalidation:block')}</div>
							</div>
						}
						onClick={() => onActionClick('LOCK')}
					/>
				</OverflowMenu>
			</div>
		</div>
	);
};

const RevalidationUserTable = ({ review }: CosmoTableRevalidationUsersProps) => {
	const { translateAnswer } = useMapAnswerType();
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: answersMap = new Map<string, Answer>() } = useGetRevalidatorAnswers(
		campaignId,
		review.id
	);
	const { setDefaultAnswers } = useAnswerStore(review.id);
	const { answers, modifyAnswer, resetAnswers } = useAnswerStore(review.id);
	const answersList = useMemo(() => [...answers.values()], [answers]);
	const [isModalOpen, setIsModalOpen] = useState<UserRevalidationActionState>({
		isOpen: false,
		actionSelected: ''
	});

	const { t } = useTranslation([
		'userRevalidation',
		'userAdmin',
		'table',
		'applicationInfo'
	]);

	useEffect(() => {
		setDefaultAnswers(new Map(answersMap));
		resetAnswers();
	}, [answersMap, resetAnswers, setDefaultAnswers]);

	const toolbarBatchActions = [
		{
			id: 'confirm-selection',
			icon: CheckmarkOutline,
			onClick: (selectionIds: Answer[]) => {
				modifyAnswer(selectionIds, 'OK');
			},
			label: t('userRevalidation:confirm')
		},
		{
			id: 'change-selection',
			icon: RequestQuote,
			onClick: (selectionIds: Answer[]) =>
				setIsModalOpen({
					isOpen: true,
					actionSelected: 'Change',
					onSuccess: ({ description }) => {
						modifyAnswer(selectionIds, 'MODIFY', description);
					}
				}),
			label: t('userRevalidation:change-request')
		},
		{
			id: 'error-selection',
			icon: MisuseOutline,
			onClick: (selectionIds: Answer[]) =>
				setIsModalOpen({
					isOpen: true,
					actionSelected: 'Change',
					onSuccess: ({ description }) => {
						modifyAnswer(selectionIds, 'REPORT_ERROR', description);
					}
				}),
			label: t('userRevalidation:report-error')
		},
		{
			id: 'block-selection',
			icon: Error,
			onClick: (selectionIds: Answer[]) => {
				modifyAnswer(selectionIds, 'LOCK');
			},
			label: t('userRevalidation:block')
		}
	];

	const ActionCellComponent = useCallback(
		(info: CellContext<Answer, unknown>) => (
			<ActionsCell
				{...{
					info,
					setIsModalOpen,
					onActionClick: (answerType: AnswerApiTypeEnum, note?: string) => {
						modifyAnswer([info.row.original as Answer], answerType, note);
					}
				}}
			/>
		),
		[modifyAnswer]
	);

	const isFireFighter = review.campaign.type === 'FIREFIGHTER';
	const isSuid = review.campaign.type === 'SUID';
	const columns = useMemo<ColumnDef<Answer>[]>(() => {
		const ArrayCol: ColumnDef<Answer>[] = [
			{
				id: `user${review.id}`,
				accessorFn: row => row.userToRevalidate,
				header: 'Username',
				sortUndefined: 1
			},

			{
				id: `userDisplayName${review.id}`,
				accessorFn: row => row.userDetails,
				header: 'User'
			},

			{
				id: `permissions${review.id}`,
				accessorFn: row => row.permissions,
				header: t('userRevalidation:permission'),
				enableGrouping: false,
				cell: info =>
					TooltipCell({ info, description: info.row.original.permissionDescription })
			},

			{
				id: `givenBy${review.id}`,
				accessorFn: row => row.givenBy?.displayName,
				header: t('userRevalidation:given-by')
			},

			{
				id: `givenAt${review.id}`,
				accessorFn: row => row.givenAt,
				cell: DateCell,
				header: t('userRevalidation:given-at')
			},

			{
				enableGrouping: false,
				accessorFn: row => translateAnswer(row.answerType) ?? '',
				meta: {
					filter: {
						type: 'checkbox'
					}
				},
				id: `answer${review.id}`,
				header: t('userRevalidation:answer'),
				cell: ActionCellComponent
			}
		];
		if (isFireFighter) {
			ArrayCol.splice(3, 0, {
				id: `fireFighter${review.id}`,
				accessorFn: row => row.firefighterID,
				header: t('userRevalidation:fire-fighter')
			});
		}
		if (isFireFighter || isSuid) {
			ArrayCol.splice(
				3,
				0,

				{
					id: `risk${review.id}`,
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
	}, [ActionCellComponent, isFireFighter, isSuid, review.id, t, translateAnswer]);

	return (
		<>
			<UserRevalidationActionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			<CosmoTable
				tableId={review.id}
				columns={columns}
				noDataMessage={t('table:no-data')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions,
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'answers-all' : 'answers-selection')}
				data={answersList}
				isSelectable
			/>
		</>
	);
};

export default RevalidationUserTable;
