import { TableToolbarSearch, Tooltip } from '@carbon/react';
import CosmoTable, { HeaderFunction, CellProperties } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import isAfter from 'date-fns/isAfter';
import { Information } from '@carbon/react/icons';

interface RevalidatorsTableProp {
	answers: Answer[];
	dueDate: Date | undefined;
	campaignType: string;
	reviewId: string;
}

const RevalidatorsTable = ({
	answers,
	dueDate,
	campaignType,
	reviewId
}: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);
	const [filters, setFilters] = useState('');
	const isFireFighter = campaignType === 'FIREFIGHTER';
	const isSuid = campaignType === 'SUID';

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
					header: 'User'
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
							title: row.jsonApplicationData?.get('risk'),
							description: row.jsonApplicationData?.get('riskDescription')
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
		[dueDate, isFireFighter, isSuid, reviewId, t, tooltipCell]
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
		<CosmoTable
			level={2}
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
	);
};
export default RevalidatorsTable;
