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
import { useGetProceduresByApps } from '@api/procedures/useGetProcedureByApp';

const Review = () => {
	const { data: appsData = [] } = useGetApps();
	const results = useGetProceduresByApps(appsData);

	const { t } = useTranslation('reviewNarrative');
	const reviews: ApplicationReview[] = useMemo(() => {
		const appMap = new Map(appsData.map(app => [app.id, app]));
		const apps = results
			.flatMap(r => r.data || [])
			.filter(r => r.applicationId)
			.reduce(
				(acc, curr) => ({
					...acc,
					[curr.applicationId as string]: {
						app: appMap.get(curr.applicationId as string) as Application,
						procedures: [...(acc[curr.applicationId as string]?.procedures || []), curr]
					}
				}),
				{} as Record<string, { app: Application; procedures: ProcedureAppInstance[] }>
			);
		return Object.values(apps)
			.map(a => [
				{
					id: a.app.id,
					appName: a.app.name,
					owner: a.app.owner,
					expireDate: a.app.dueDate,
					procedure: t('application-info'),
					status: a.app.allowModifyOwner ? 'Ongoing' : 'Closed'
				},
				...a.procedures.map(p => ({
					id: p.id,
					appName: a.app.name,
					owner: p.owner,
					expireDate: p.dueDate,
					procedure: p.procedure.name,
					status: p.allowModifyOwner ? 'Ongoing' : 'Closed'
				}))
			])
			.flat();
	}, [appsData, results, t]);

	const columns: HeaderFunction<ApplicationReview> = useCallback(
		table => [
			table.createDataColumn(row => row.appName, {
				id: 'application-name',
				header: 'Application Name',
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.procedure, {
				id: 'procedure',
				header: 'Procedure'
			}),
			table.createDataColumn(row => row.owner, {
				id: 'owner',
				header: 'Owner',
				cell: info => info.getValue()?.displayName || '-',
				meta: {
					exportableFn: (info: { displayName: string }) => info.displayName
				}
			}),
			table.createDataColumn(row => row.expireDate, {
				id: 'due-date',
				header: 'Due Date',
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date) : '-';
				}
			}),
			table.createDataColumn(row => row.status, {
				id: 'Status',
				header: 'Status'
			})
		],
		[]
	);

	return (
		<div>
			<PageHeader pageTitle='Review'>
				<div className='h-full p-container-1'>
					<GroupableCosmoTable
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
