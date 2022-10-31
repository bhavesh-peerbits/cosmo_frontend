import { TableToolbarSearch, Tooltip } from '@carbon/react';
import { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import { Information } from '@carbon/react/icons';
import GroupableCosmoTable from '@components/table/GroupableCosmoTable';

interface AnswerTableProp {
	answers: Answer[];
	reviewId: string;
	campaignType: string;
}

const AnswerTable = ({ answers, reviewId, campaignType }: AnswerTableProp) => {
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
						className='z-[0]'
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
			if (isFireFighter) {
				ArrayCol.splice(
					4,
					0,
					table.createDataColumn(row => row.firefighterID, {
						id: `fireFighter${reviewId}`,
						header: t('userRevalidation:fire-fighter')
					})
				);
			}
			if (isFireFighter || isSuid) {
				ArrayCol.splice(
					4,
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
		[isFireFighter, isSuid, reviewId, t, tooltipCell]
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
		<GroupableCosmoTable
			tableId={reviewId}
			data={
				filters
					? answers.filter(answer =>
							answer.revalidationUser?.displayName
								.toLowerCase()
								.includes(filters.toLowerCase())
					  )
					: answers
			}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default AnswerTable;
