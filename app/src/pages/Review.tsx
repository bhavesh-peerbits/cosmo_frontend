import PageHeader from '@components/PageHeader';
import GroupableCosmoTable, {
	HeaderFunction
} from '@components/table/GroupableCosmoTable';
import useGetReview from '@api/review/useGetReview';
import ApplicationReview from '@model/ApplicationReview';
import { formatDate } from '@i18n';
import { useCallback } from 'react';

const Review = () => {
	const { data = [] } = useGetReview();
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
				cell: info => formatDate(info.getValue())
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
						data={data}
						createHeaders={columns}
						noDataMessage='No data'
					/>
				</div>
			</PageHeader>
		</div>
	);
};
export default Review;
