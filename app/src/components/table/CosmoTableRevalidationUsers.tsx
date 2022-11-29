// import {
// 	Layer,
// 	Pagination,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableExpandHeader,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// 	TableSelectAll,
// 	TableSelectRow
// } from '@carbon/react';
// import {
// 	ColumnDef,
// 	ColumnSort,
// 	createTable,
// 	ExpandedState,
// 	getCoreRowModel,
// 	getExpandedRowModel,
// 	getGroupedRowModel,
// 	getPaginationRowModel,
// 	getSortedRowModel,
// 	PaginationState,
// 	Table as TableType,
// 	useTableInstance
// } from '@tanstack/react-table';
// import { ReactNode, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
// 	AvailableFileType,
// 	CellProperties,
// 	ExportProperties,
// 	TB,
// 	CosmoTableToolbarProps
// } from '@components/table/types';
// import useExportTablePlugin from '@hooks/useExportTablePlugin';
// import NoDataMessage from '@components/NoDataMessage';
// import Centered from '@components/Centered';
// import {
// 	CheckmarkOutline,
// 	RequestQuote,
// 	MisuseOutline,
// 	Error
// } from '@carbon/react/icons';
// import Answer from '@model/Answer';
// import CosmoTable from '@components/table/CosmoTable';
// import CosmoTableToolbar from './CosmoTableToolbar';
// import useAnswerStore from "@hooks/user-revalidation-review/useAnswerStore";
//
// type HeaderFunction<T extends object> =
// 	CosmoTableRevalidationUsersProps<T>['createHeaders'];
//
// interface CosmoTableRevalidationUsersProps<D extends object> {
// 	createHeaders: (table: TableType<TB<D>>) => Array<ColumnDef<TB<D>>>;
// 	data: D[];
// 	toolbar?:
// 		| Pick<CosmoTableToolbarProps<D>, 'toolbarContent' | 'toolbarBatchActions'>
// 		| undefined;
// 	noDataMessage?: string;
// 	exportFileName?: (param: {
// 		fileType: AvailableFileType;
// 		all: boolean | 'selection';
// 	}) => string;
// 	disableExport?: boolean;
// 	inlineAction: (answer: Answer) => ReactNode;
// 	setRowSelected: (val: D) => void;
// }

// const CosmoTableRevalidationUsers = <D extends object>({
// 	createHeaders,
// 	data,
// 	noDataMessage,
// 	exportFileName,
// 	disableExport,
// 	inlineAction,
// 	setRowSelected,
// 	toolbar
// }: CosmoTableRevalidationUsersProps<D>) => {
// 	const { t } = useTranslation('table');
// 	const [rowSelection, setRowSelection] = useState({});
// 	const [expanded, setExpanded] = useState<ExpandedState>({});
// 	const [grouping, setGrouping] = useState<string[]>([]);
// 	const [sorting, setSorting] = useState<ColumnSort[]>([]);
//
// 	const [pagination, setPagination] = useState<PaginationState>({
// 		pageIndex: 0,
// 		pageSize: 10
// 	});
// 	const table = createTable().setColumnMetaType<ExportProperties>().setRowType<D>();
// 	const columns = useMemo(() => createHeaders(table), [createHeaders, table]);
// 	const instance = useTableInstance(table, {
// 		data,
// 		columns,
// 		autoResetPageIndex: false,
// 		state: {
// 			pagination,
// 			sorting,
// 			grouping,
// 			expanded,
// 			rowSelection
// 		},
// 		onPaginationChange: setPagination,
// 		onSortingChange: setSorting,
// 		onRowSelectionChange: setRowSelection,
// 		onGroupingChange: setGrouping,
// 		onExpandedChange: setExpanded,
// 		getCoreRowModel: getCoreRowModel(),
// 		getExpandedRowModel: getExpandedRowModel(),
// 		getSortedRowModel: getSortedRowModel(),
// 		getGroupedRowModel: getGroupedRowModel(),
// 		getPaginationRowModel: getPaginationRowModel()
// 	});
// 	const {
// 		getRowModel,
// 		getHeaderGroups,
// 		setPageIndex,
// 		setPageSize,
// 		toggleAllRowsSelected,
// 		getSelectedRowModel,
// 		getIsAllRowsSelected,
// 		getIsSomeRowsSelected,
// 		getToggleAllRowsSelectedHandler
// 	} = instance;
// 	const { exportData } = useExportTablePlugin(instance, exportFileName, disableExport);
//
// 	const iconToRender = (answer?: string) => {
// 		switch (answer) {
// 			case 'OK':
// 				return <CheckmarkOutline />;
// 			case 'LOCK':
// 				return <Error />;
// 			case 'REPORT_ERROR':
// 				return <MisuseOutline />;
// 			case 'MODIFY':
// 				return <RequestQuote />;
// 			default:
// 				return null;
// 		}
// 	};
//
// 	const renderBody = () => {
// 		const { rows } = getRowModel();
// 		return rows.length ? (
// 			rows.map(row => {
// 				return (
// 					<TableRow key={row.id}>
// 						<TableSelectRow
// 							checked={row.getIsSelected()}
// 							ariaLabel='Select'
// 							id={row.id}
// 							name={row.id}
// 							onSelect={row.getToggleSelectedHandler()}
// 							onChange={undefined}
// 						/>
// 						<TableCell />
// 						{row.getVisibleCells().map(cell => (
// 							<TableCell key={cell.id}>
// 								{cell.column.id === 'answer' ? (
// 									<div className='flex space-x-3'>
// 										{iconToRender(cell.getValue() as string)}
// 										<p className='text-heading-compact-1'>{cell.renderCell()}</p>
// 									</div>
// 								) : (
// 									cell.renderCell()
// 								)}
// 							</TableCell>
// 						))}
// 						<TableCell
// 						// onClickCapture={() => row.original && setRowSelected(row.original)}
// 						>
// 							{inlineAction(row.original as Answer)}
// 						</TableCell>
// 					</TableRow>
// 				);
// 			})
// 		) : (
// 			<TableRow>
// 				<TableCell colSpan={columns.length + 1}>
// 					<Centered>
// 						<NoDataMessage className='p-5' title={noDataMessage} />
// 					</Centered>
// 				</TableCell>
// 			</TableRow>
// 		);
// 	};
//
// 	return (
// 		<TableContainer>
// 			<CosmoTableToolbar<D>
// 				selectionIds={
// 					getSelectedRowModel()
// 						.flatRows.map(row => row.original)
// 						.filter(r => r) as D[]
// 				}
// 				onCancel={() => toggleAllRowsSelected(false)}
// 				onExportClick={exportData}
// 				disableExport={grouping.length > 0 || data.length === 0}
// 				toolbarContent={toolbar?.toolbarContent}
// 				toolbarBatchActions={toolbar?.toolbarBatchActions}
// 			/>
// 			<Layer level={1}>
// 				<Table>
// 					<TableHead>
// 						{getHeaderGroups().map(headerGroup => {
// 							return (
// 								<TableRow key={headerGroup.id}>
// 									<th className='relative'>
// 										<TableSelectAll
// 											ariaLabel='SelectAll'
// 											id='selectAll'
// 											className='absolute top-1/2 left-0 -translate-y-1/2'
// 											name='selectAll'
// 											checked={getIsAllRowsSelected()}
// 											indeterminate={getIsSomeRowsSelected()}
// 											onSelect={getToggleAllRowsSelectedHandler()}
// 											onChange={undefined}
// 										/>
// 									</th>
// 									<TableExpandHeader className='w-[40px]' />
// 									{headerGroup.headers.map(header => {
// 										return (
// 											<TableHeader
// 												key={header.id}
// 												colSpan={header.colSpan}
// 												sortDirection={
// 													header.column.getIsSorted() === 'desc' ? 'DESC' : 'ASC'
// 												}
// 												onClick={header.column.getToggleSortingHandler()}
// 												scope=''
// 												isSortable
// 												isSortHeader={
// 													header.column.getCanSort() && !!header.column.getIsSorted()
// 												}
// 											>
// 												{!header.isPlaceholder && header.renderHeader()}
// 											</TableHeader>
// 										);
// 									})}
// 									<TableRow />
// 								</TableRow>
// 							);
// 						})}
// 					</TableHead>
// 					<TableBody>{renderBody()}</TableBody>
// 				</Table>
// 			</Layer>
//
// 			<Pagination
// 				backwardText={t('previous-page')}
// 				forwardText={t('next-page')}
// 				itemsPerPageText={t('items-per-page')}
// 				itemRangeText={(min, max, total) => t('item-range', { min, max, total })}
// 				pageRangeText={(current, total) =>
// 					t(total > 1 ? 'page-range-plural' : 'page-range', { current, total })
// 				}
// 				page={1}
// 				onChange={({ page, pageSize }) => {
// 					setPageIndex(page - 1);
// 					setPageSize(pageSize);
// 				}}
// 				pageSize={10}
// 				pageSizes={[10, 20, 30, 40, 50]}
// 				size='md'
// 				totalItems={data.length}
// 			/>
// 		</TableContainer>
// 	);
// };

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
					onActionClick: (answerType: AnswerApiTypeEnum, note?: string) =>
						modifyAnswer([info.row.original as Answer], answerType, note)
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
						enableGrouping: false,
						cell: tooltipCell
					}
				),
				table.createDataColumn(row => row.givenBy?.displayName, {
					id: `givenBy${review.id}`,
					header: t('userRevalidation:given-by'),
					meta: {
						exportableFn: info => info || '-'
					}
				}),
				table.createDataColumn(row => row.givenAt?.toLocaleString(), {
					id: `givenAt${review.id}`,
					header: t('userRevalidation:given-at'),
					meta: {
						exportableFn: info => info || '-'
					}
				}),
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
							enableGrouping: false,
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
