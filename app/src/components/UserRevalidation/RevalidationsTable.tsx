import CosmoTable from '@components/table/CosmoTable';
import useRevalidationsOngoing from '@hooks/user-revalidation/useRevalidationsOngoing';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CampaignWithReview from '@model/CampaignWithReview';
import { mapCampaignLayerToCampaignDisplayLayer } from '@model/CampaignLayer';
import DateCell from '@components/table/Cell/DateCell';
import { ColumnDef } from '@tanstack/react-table';
import CellLink from '@components/table/Cell/CellLink';
import { CampaignDtoLayerEnum, CampaignDtoTypeEnum } from 'cosmo-api/src/v1';

const RevalidationsTable = () => {
	const { t } = useTranslation(['userRevalidation', 'table']);
	const { revalidations } = useRevalidationsOngoing();

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

	const columns = useMemo<ColumnDef<CampaignWithReview>[]>(
		() => [
			{
				id: 'name',
				header: t('userRevalidation:campaign-name'),
				sortUndefined: 1,
				accessorFn: row => ({
					name: row.campaign.name,
					id: row.id,
					preUrl: '/revalidations-ongoing'
				}),
				cell: CellLink
			},
			{
				id: 'due-date',
				accessorFn: row => row.campaign.dueDate,
				header: t('userRevalidation:due-date'),
				cell: DateCell
			},
			{
				id: 'layer',
				accessorFn: row => row.campaign.layer,
				header: t('userRevalidation:layer'),
				cell: info =>
					mapCampaignLayerToCampaignDisplayLayer(info.getValue() as CampaignDtoLayerEnum)
			},
			{
				id: 'type',
				accessorFn: row => row.campaign.type,
				header: t('userRevalidation:revalidation-type'),
				cell: info =>
					mapCampaignTypeToCampaignDisplayType(info.getValue() as CampaignDtoTypeEnum)
			},
			{
				id: 'applicationsCount',
				accessorFn: row => row.campaign.applicationsCount,
				header: t('userRevalidation:applications')
			},
			{
				id: 'status',
				accessorFn: row => translateStatus(row.campaign.status),
				header: t('userRevalidation:status'),
				meta: {
					exportableFn: info => translateStatus(info as string)
				}
			}
		],
		[t, translateStatus]
	);

	return (
		<CosmoTable
			tableId='revalidations'
			data={revalidations}
			columns={columns}
			toolbar={{
				searchBar: true,
				toolbarBatchActions: [],
				toolbarTableMenus: []
			}}
			isColumnOrderingEnabled
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default RevalidationsTable;
