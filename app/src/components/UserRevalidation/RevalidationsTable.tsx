import { TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import GroupedCosmoTable from '@components/table/GroupedCosmoTable';
import useRevalidationsOngoing from '@hooks/user-revalidation/useRevalidationsOngoing';
import { formatDate } from '@i18n';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CampaignWithReview from '@model/CampaignWithReview';

const RevalidationsTable = () => {
	const { t } = useTranslation('userRevalidation');
	const { revalidations, filters, setFilters } = useRevalidationsOngoing();

	const columns: HeaderFunction<CampaignWithReview> = useCallback(
		table => [
			table.createDataColumn(row => row.campaign.name, {
				id: 'name',
				header: t('campaign-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.campaign.dueDate, {
				id: 'due-date',
				header: t('due-date'),
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date, 'short') : '-';
				}
			}),
			table.createDataColumn(row => row.campaign.layer, {
				id: 'layer',
				header: t('layer')
			}),
			table.createDataColumn(row => row.campaign.type, {
				id: 'type',
				header: t('revalidation-type'),
				cell: info => mapCampaignTypeToCampaignDisplayType(info.getValue())
			}),
			table.createDataColumn(() => '', {
				id: 'application',
				header: t('application')
			}),
			table.createDataColumn(() => '', {
				id: 'status',
				header: t('status')
			})
		],
		[t]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('search-placeholder')}
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);
	return (
		<GroupedCosmoTable
			data={revalidations}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
		/>
	);
};
export default RevalidationsTable;
