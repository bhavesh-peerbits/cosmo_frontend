/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TableToolbarSearch, Tooltip, Button } from '@carbon/react';
import { HeaderFunction, CellProperties } from '@components/table/CosmoTable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import isAfter from 'date-fns/isAfter';
import { Information, Edit } from '@carbon/react/icons';
import GroupableCosmoTable from '@components/table/GroupableCosmoTable';
import { useSetRecoilState } from 'recoil';
import modifyAnswerModalInfo from '@store/user-revalidation/modifyAnswerModalInfo';
import { CampaignDtoStatusEnum } from 'cosmo-api/src/v1/models/campaign-dto';

interface RevalidatorsTableProp {
	answers: Answer[];
	dueDate: Date | undefined;
	campaignType: string;
	reviewId: string;
	status?: CampaignDtoStatusEnum;
}

const RevalidatorsTable = ({
	answers,
	dueDate,
	campaignType,
	reviewId,
	status
}: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);
	const [filters, setFilters] = useState('');
	const isFireFighter = campaignType === 'FIREFIGHTER';
	const setModifyModal = useSetRecoilState(modifyAnswerModalInfo);
	const isSuid = campaignType === 'SUID';
	const ref = useRef<HTMLDivElement>(null);

	const usersListCell = useCallback(
		(info: CellProperties<Answer, { delegates: User[] | undefined }>) => (
			<div className='flex items-center space-x-2'>
				{info.getValue().delegates?.map(us => (
					<UserProfileImage
						size='lg'
						initials={us.displayName}
						imageDescription={us.username}
						tooltipText={us.displayName}
						className='mx-[-5px]'
					/>
				))}
			</div>
		),
		[]
	);
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

	const actionCell = useCallback(
		(info: CellProperties<Answer, { answer: Answer }>) => (
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
							answer: info.getValue().answer,
							campaignType,
							revId: reviewId
						})
					}
				/>
			</div>
		),
		[campaignType, reviewId, setModifyModal]
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

	const columns: HeaderFunction<Answer> = useCallback(
		table => {
			const ArrayCol = [
				table.createDataColumn(row => row.revalidationUser?.displayName, {
					id: `revalidator${reviewId}`,
					header: t('userRevalidation:revalidators')
				}),
				table.createDataColumn(row => ({ delegates: row.delegated }), {
					id: `delegated${reviewId}`,
					header: t('userRevalidation:delegates'),
					cell: usersListCell,
					enableGrouping: false,
					meta: {
						exportableFn: info =>
							(info.delegates as User[]).map(delegate => delegate.displayName).join(', ')
					}
				}),
				table.createDataColumn(row => row.answerType, {
					id: `answer${reviewId}`,
					header: t('userRevalidation:answer'),
					cell: info => {
						if (info.getValue()) {
							return info.getValue();
						}

						if (dueDate && isAfter(new Date(), dueDate)) {
							return t('userRevalidation:due-date-exceeded');
						}

						return t('userRevalidation:not-completed');
					},
					meta: {
						exportableFn: info => info || '-'
					}
				}),
				table.createDataColumn(row => row.note, {
					id: `answerNote${reviewId}`,
					header: t('userRevalidation:note'),
					meta: {
						exportableFn: info => info || '-'
					}
				}),
				table.createDataColumn(row => row.userToRevalidate, {
					id: `user${reviewId}`,
					header: 'Username',
					sortUndefined: 1
				}),
				table.createDataColumn(row => row.userDetails, {
					id: `userDisplayName${reviewId}`,
					header: t('userRevalidation:user-details')
				}),
				table.createDataColumn(
					row => ({ title: row.permissions, description: row.permissionDescription }),
					{
						id: `permissions${reviewId}`,
						header: t('userRevalidation:permission'),
						cell: tooltipCell,
						meta: {
							exportableFn: info => info.title
						}
					}
				)
			];
			if (status !== 'COMPLETED' && status !== 'COMPLETED_WITH_PARTIAL_ANSWERS') {
				ArrayCol.push(
					table.createDataColumn(row => ({ answer: row }), {
						id: `action${reviewId}`,
						header: t('userAdmin:actions'),
						cell: actionCell,
						enableGrouping: false
					})
				);
			}
			if (isFireFighter) {
				ArrayCol.splice(
					6,
					0,
					table.createDataColumn(row => row.firefighterID, {
						id: `fireFighter${reviewId}`,
						header: t('userRevalidation:fire-fighter')
					})
				);
			}
			if (isFireFighter || isSuid) {
				ArrayCol.splice(
					6,
					0,
					table.createDataColumn(
						row => ({
							title: row.jsonApplicationData?.risk,
							description: row.jsonApplicationData?.riskDescription
						}),
						{
							id: `risk${reviewId}`,
							header: t('userRevalidation:risk'),
							cell: tooltipCell,
							meta: {
								exportableFn: info => info.title
							}
						}
					)
				);
			}
			return ArrayCol;
		},
		[actionCell, dueDate, isFireFighter, isSuid, reviewId, status, t, tooltipCell]
	);

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('userAdmin:search-placeholder')}
			id='search'
			onChange={e => setFilters(e.currentTarget?.value)}
		/>
	);
	return (
		<div ref={ref}>
			<GroupableCosmoTable
				tableId={reviewId}
				data={
					filters
						? answers.filter(answer =>
								answer.userToRevalidate?.toLowerCase().includes(filters.toLowerCase())
						  )
						: answers
				}
				createHeaders={columns}
				toolbar={{ toolbarContent }}
				noDataMessage={t('table:no-data')}
				exportFileName={() => 'revalidators'}
			/>
		</div>
	);
};
export default RevalidatorsTable;
