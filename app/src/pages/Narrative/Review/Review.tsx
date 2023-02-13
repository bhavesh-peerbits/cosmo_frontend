import PageHeader from '@components/PageHeader';
import { useMemo } from 'react';
import ProcedureAppInstance from '@model/Narrative/ProcedureAppInstance';
import ApplicationReview from '@model/Narrative/ApplicationReview';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import Application from '@model/Narrative/Application';
import useGetApps from '@api/management/useGetApps';
import useGetProcedureApps from '@api/app-procedures/useGetProcedureApps';
import useGetProcedures from '@api/procedures/useGetProcedures';
import { ColumnDef } from '@tanstack/react-table';
import StringDashCell from '@components/table/Cell/StringDashCell';
import DateCell from '@components/table/Cell/DateCell';
import CosmoTable from '@components/table/CosmoTable';

const Review = () => {
	const { data: appsData = new Map<string, Application>() } = useGetApps();
	const { data: procedureAppsData = new Map<string, ProcedureAppInstance>() } =
		useGetProcedureApps();
	const { data: procedures = new Map() } = useGetProcedures();
	const appsCopy = useMemo(() => new Map(appsData), [appsData]);

	const { t } = useTranslation('reviewNarrative');
	const reviews: ApplicationReview[] = useMemo(() => {
		const apps = new Map<
			string,
			{ app: Application; procedures: ProcedureAppInstance[] }
		>();

		procedureAppsData.forEach(pa => {
			if (pa.applicationId) {
				apps.set(pa.applicationId, {
					app: appsData.get(pa.applicationId) as Application,
					procedures: [...(apps.get(pa.applicationId)?.procedures || []), pa]
				});
				appsCopy.delete(pa.applicationId);
			}
		});
		appsCopy.forEach(app => {
			apps.set(app.id, {
				app,
				procedures: []
			});
		});

		return [...apps.values()]
			.filter(a => a.app.dueDate)
			.map(a => [
				{
					id: a.app.id,
					appName: a.app.name,
					owner: a.app.owner,
					expireDate: a.app.dueDate,
					procedure: t('application-info'),
					status: a.app.inReview ? 'Ongoing' : 'Closed'
				},
				...a.procedures
					.filter(p => p.endNarrativeReview)
					.map(p => ({
						id: p.id,
						appName: a.app.name,
						owner: p.owner,
						expireDate: p.endNarrativeReview,
						procedure: procedures.get(p.procedureId)?.name,
						status: p.inReview ? 'Ongoing' : 'Closed'
					}))
			])
			.flat();
	}, [appsCopy, appsData, procedureAppsData, procedures, t]);

	const columns = useMemo<ColumnDef<ApplicationReview>[]>(
		() => [
			{
				id: 'application-name',
				accessorFn: row => row.appName,
				header: t('application'),
				sortUndefined: 1
			},
			{
				id: 'procedure',
				accessorFn: row => row.procedure,
				header: t('procedure')
			},
			{
				id: 'owner',
				accessorFn: row => row.owner.displayName,
				header: t('owner'),
				cell: StringDashCell
			},
			{
				id: 'due-date',
				accessorFn: row => row.expireDate,
				header: t('due-date'),
				cell: DateCell
			},
			{
				id: 'Status',
				accessorFn: row => row.status,
				header: t('status'),
				meta: { filter: { type: 'checkbox' } }
			}
		],
		[t]
	);

	return (
		<div>
			<PageHeader pageTitle='Narrative History'>
				<Layer className='h-full p-container-1'>
					<CosmoTable
						tableId='review'
						toolbar={{ searchBar: true, toolbarBatchActions: [], toolbarTableMenus: [] }}
						isColumnOrderingEnabled
						data={reviews}
						columns={columns}
						noDataMessage='No data'
					/>
				</Layer>
			</PageHeader>
		</div>
	);
};
export default Review;
