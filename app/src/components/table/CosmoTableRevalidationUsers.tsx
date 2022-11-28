import CampaignApplication from '@model/CampaignApplication';
import useAnswerStore from '@hooks/user-revalidation-review/useAnswerStore';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
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
} from '@components/Modals/UserRevalidationActionModal';
import useGetRevalidatorAnswers from '@api/review-campaign/useGetRevalidatorAnswers';
import { useParams } from 'react-router-dom';
import GroupableCosmoTable from './GroupableCosmoTable';

interface CosmoTableRevalidationUsersProps {
	review: CampaignApplication;
}

interface ActionCellProps {
	info: CellProperties<
		Answer,
		{ answerType: AnswerApiTypeEnum | undefined; note: string | undefined }
	>;
	onActionClick: (answerType: AnswerApiTypeEnum, note?: string) => void;
	setIsModalOpen: (isOpen: UserRevalidationActionState) => void;
}

const ActionsCell = ({ info, onActionClick, setIsModalOpen }: ActionCellProps) => {
	const { translateAnswer } = useMapAnswerType();
	const { t } = useTranslation(['userAdmin', 'userRevalidation']);

	return (
		<div className='flex items-center justify-between'>
			<div>
				{info.getValue().answerType !== 'MODIFY' &&
				info.getValue().answerType !== 'REPORT_ERROR' ? (
					translateAnswer(info.getValue().answerType)
				) : (
					<div className='grid grid-cols-6'>
						<span className='col-span-5'>
							{translateAnswer(info.getValue().answerType)}
						</span>
						<span className='self-center text-right'>
							<Tooltip description={info.getValue().note} align='top'>
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
								note: info.getValue()?.note,
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
								note: info.getValue()?.note,
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

const CosmoTableRevalidationUsers = ({ review }: CosmoTableRevalidationUsersProps) => {
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
			onClick: ({
				selectionIds,
				clean
			}: {
				selectionIds: Answer[];
				clean?: () => void;
			}) => {
				modifyAnswer(selectionIds, 'OK');
				clean && clean();
			},
			label: t('userRevalidation:confirm')
		},
		{
			id: 'change-selection',
			icon: RequestQuote,
			onClick: ({
				selectionIds,
				clean
			}: {
				selectionIds: Answer[];
				clean?: () => void;
			}) =>
				setIsModalOpen({
					isOpen: true,
					actionSelected: 'Change',
					onSuccess: ({ description }) => {
						modifyAnswer(selectionIds, 'MODIFY', description);
						clean && clean();
					}
				}),
			label: t('userRevalidation:change-request')
		},
		{
			id: 'error-selection',
			icon: MisuseOutline,
			onClick: ({
				selectionIds,
				clean
			}: {
				selectionIds: Answer[];
				clean?: () => void;
			}) =>
				setIsModalOpen({
					isOpen: true,
					actionSelected: 'Change',
					onSuccess: ({ description }) => {
						modifyAnswer(selectionIds, 'REPORT_ERROR', description);
						clean && clean();
					}
				}),
			label: t('userRevalidation:report-error')
		},
		{
			id: 'block-selection',
			icon: Error,
			onClick: ({
				selectionIds,
				clean
			}: {
				selectionIds: Answer[];
				clean?: () => void;
			}) => {
				modifyAnswer(selectionIds, 'LOCK');
				clean && clean();
			},
			label: t('userRevalidation:block')
		}
	];

	const ActionCellComponent = useCallback(
		(
			info: CellProperties<
				Answer,
				{ answerType: AnswerApiTypeEnum | undefined; note: string | undefined }
			>
		) => (
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

	const tooltipCell = useCallback(
		(
			info: CellProperties<
				Answer,
				{ title: string | undefined; description: string | undefined }
			>
		) => (
			<div className='flex items-center space-x-2'>
				<span>{info.getValue().title}</span>
				<span>
					<Tooltip
						description={
							info.getValue().description ||
							t('userRevalidation:permissions-description-null')
						}
						align='top'
					>
						<button type='button'>
							<Information />
						</button>
					</Tooltip>
				</span>
			</div>
		),
		[t]
	);

	const isFireFighter = review.campaign.type === 'FIREFIGHTER';
	const isSuid = review.campaign.type === 'SUID';
	const columns: HeaderFunction<Answer> = useCallback(
		table => {
			const ArrayCol = [
				table.createDataColumn(row => row.userToRevalidate, {
					id: `user${review.id}`,
					header: 'Username',
					sortUndefined: 1
				}),
				table.createDataColumn(row => row.userDetails, {
					id: `userDisplayName${review.id}`,
					header: 'User'
				}),
				table.createDataColumn(
					row => ({ title: row.permissions, description: row.permissionDescription }),
					{
						id: `permissions${review.id}`,
						header: t('userRevalidation:permission'),
						cell: tooltipCell
					}
				),
				table.createDataColumn(
					row => ({
						answerType: row.answerType,
						note: row.note
					}),

					{
						enableGrouping: false,
						id: `answer${review.id}`,
						header: t('userRevalidation:answer'),
						cell: ActionCellComponent
					}
				)
			];
			if (isFireFighter) {
				ArrayCol.splice(
					3,
					0,
					table.createDataColumn(row => row.firefighterID, {
						id: `fireFighter${review.id}`,
						header: t('userRevalidation:fire-fighter')
					})
				);
			}
			if (isFireFighter || isSuid) {
				ArrayCol.splice(
					3,
					0,
					table.createDataColumn(
						row => ({
							title: row.jsonApplicationData?.risk,
							description: row.jsonApplicationData?.riskDescription
						}),
						{
							id: `risk${review.id}`,
							header: t('userRevalidation:risk'),
							cell: tooltipCell
						}
					)
				);
			}
			return ArrayCol;
		},
		[review.id, t, ActionCellComponent, tooltipCell, isFireFighter, isSuid]
	);

	return (
		<>
			<UserRevalidationActionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			<GroupableCosmoTable
				tableId={review.id}
				createHeaders={columns}
				noDataMessage={t('table:no-data')}
				toolbar={{ toolbarBatchActions }}
				exportFileName={({ all }) => (all ? 'answers-all' : 'answers-selection')}
				data={answersList}
				isSelectable
			/>
		</>
	);
};

export default CosmoTableRevalidationUsers;
