import { Link, TableToolbarSearch } from '@carbon/react';
import CosmoTable, { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import useRevalidationsOngoing from '@hooks/user-revalidation/useRevalidationsOngoing';
import { formatDate } from '@i18n';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CampaignWithReview from '@model/CampaignWithReview';
import Campaign from '@model/Campaign';
import { mapCampaignLayerToCampaignDisplayLayer } from '@model/CampaignLayer';

const RevalidationsTable = () => {
	const { t } = useTranslation(['userRevalidation', 'table']);
	const { revalidations, filters, setFilters } = useRevalidationsOngoing();

	const translateStatus = useCallback(
		(status: string | undefined) => {
			switch (status) {
				case 'REVIEW_IN_PROGRESS':
					return t('userRevalidation:in-progress');
				case 'COMPLETED':
					return t('userRevalidation:completed');
				case 'ANNULLED':
					return t('userRevalidation:annulled');
				case 'COMPLETED_WITH_PARTIAL_ANSWERS':
					return t('userRevalidation:completed-partial');
				default:
					return '';
			}
		},
		[t]
	);
	const CellLinkComponent = useCallback(
		(info: CellProperties<CampaignWithReview, { campaign: Campaign }>) => (
			<Link
				href={`/revalidations-ongoing/${(info.row.original as CampaignWithReview).id}`}
			>
				{(info.row.original as CampaignWithReview).campaign.name}
			</Link>
		),
		[]
	);

	const columns: HeaderFunction<CampaignWithReview> = useCallback(
		table => [
			table.createDataColumn(
				row => ({
					campaign: row.campaign
				}),
				{
					id: 'name',
					header: t('userRevalidation:campaign-name'),
					sortUndefined: 1,
					cell: CellLinkComponent,
					meta: {
						exportableFn: info => info.campaign.name || '-'
					}
				}
			),
			table.createDataColumn(row => row.campaign.dueDate, {
				id: 'due-date',
				header: t('userRevalidation:due-date'),
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date, 'short') : '-';
				}
			}),
			table.createDataColumn(row => row.campaign.layer, {
				id: 'layer',
				header: t('userRevalidation:layer'),
				cell: info => mapCampaignLayerToCampaignDisplayLayer(info.getValue())
			}),
			table.createDataColumn(row => row.campaign.type, {
				id: 'type',
				header: t('userRevalidation:revalidation-type'),
				cell: info => mapCampaignTypeToCampaignDisplayType(info.getValue())
			}),
			table.createDataColumn(row => row.campaign.applicationsCount, {
				id: 'applicationsCount',
				header: t('userRevalidation:applications')
			}),
			table.createDataColumn(row => row.campaign.status, {
				id: 'status',
				header: t('userRevalidation:status'),
				cell: info => translateStatus(info.getValue()),
				meta: {
					exportableFn: info => translateStatus(info)
				}
			})
		],
		[CellLinkComponent, t, translateStatus]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('userRevalidation:search-placeholder')}
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);
	return (
		// <GroupedCosmoTable
		// 	data={revalidations}
		// 	createHeaders={columns}
		// 	toolbar={{ toolbarContent }}
		// /> // TODO Fix to show both application status and campaign status
		<CosmoTable
			data={revalidations}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default RevalidationsTable;
