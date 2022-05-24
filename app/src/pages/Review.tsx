import PageHeader from '@components/PageHeader';
import GroupableCosmoTable, {
	HeaderFunction
} from '@components/table/GroupableCosmoTable';
import ApplicationReview from '@model/ApplicationReview';
import { useCallback, useEffect, useState } from 'react';
import useManagementApps from '@hooks/management/useManagementApps';
import useGetProcedureByApp from '@api/procedures/useGetProcedureByApp';

const Review = () => {
	const [proceduresList, setProceduresList] = useState<ApplicationReview[]>();
	const [data, setData] = useState<ApplicationReview[]>();
	const { apps } = useManagementApps();

	function ReviewList() {
		const GetProceduresByAppId = (id: string) => {
			const { data: procedures = [] } = useGetProcedureByApp(id);

			return procedures.filter(procedure => procedure.dueDate !== undefined);
		};

		useEffect(() => {
			setProceduresList(
				apps
					.map(app =>
						GetProceduresByAppId(app.id).map(procedure => {
							return {
								id: procedure.id,
								appName: app.name,
								procedure: procedure.name,
								owner: procedure.owner,
								status: procedure.allowModifyOwner ? 'Ongoing' : 'Closed',
								expireDate: procedure.dueDate
							};
						})
					)
					.flat()
			);
		}, []);
		return proceduresList;
	}
	useEffect(() => {
		const appInfoList = apps
			.filter(app => app.dueDate !== undefined)
			.map(app => {
				return {
					id: app.id,
					appName: app.name,
					procedure: 'General Info and Technical Info',
					owner: app.owner,
					status: app.allowModifyOwner ? 'Ongoing' : 'Closed',
					expireDate: app.dueDate
				};
			});
		if (proceduresList) {
			setData([...proceduresList, ...appInfoList]);
		}
	}, [apps, proceduresList]);

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
				cell: info => info.getValue()?.toLocaleDateString()
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
						data={(ReviewList() && data) || []}
						createHeaders={columns}
						noDataMessage='No data'
					/>
				</div>
			</PageHeader>
		</div>
	);
};
export default Review;
