import PageHeader from '@components/PageHeader';
import GroupableCosmoTable, {
	HeaderFunction
} from '@components/table/GroupableCosmoTable';
import { useCallback, useMemo } from 'react';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import { formatDate } from '@i18n';
import ApplicationReview from '@model/ApplicationReview';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import useGetApps from '@api/management/useGetApps';
import useGetProcedureApps from '@api/app-procedures/useGetProcedureApps';
import useGetProcedures from '@api/procedures/useGetProcedures';

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

	const columns: HeaderFunction<ApplicationReview> = useCallback(
		table => [
			table.createDataColumn(row => row.appName, {
				id: 'application-name',
				header: t('application'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.procedure, {
				id: 'procedure',
				header: t('procedure')
			}),
			table.createDataColumn(row => row.owner.displayName, {
				id: 'owner',
				header: t('owner'),
				meta: {
					exportableFn: (info: { displayName: string }) => info.displayName
				}
			}),
			table.createDataColumn(row => row.expireDate, {
				id: 'due-date',
				header: t('due-date'),
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date) : '-';
				}
			}),
			table.createDataColumn(row => row.status, {
				id: 'Status',
				header: t('status')
			})
		],
		[t]
	);

	return (
		<div>
			<PageHeader pageTitle='Narrative History'>
				<div className='h-full p-container-1'>
					<GroupableCosmoTable
						tableId='review'
						data={reviews}
						createHeaders={columns}
						noDataMessage='No data'
					/>
				</div>
			</PageHeader>
		</div>
	);
};
export default Review;
