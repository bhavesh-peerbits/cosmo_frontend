import PageHeader from '@components/PageHeader';
import GroupableCosmoTable, {
	HeaderFunction
} from '@components/table/GroupableCosmoTable';

const Review = () => {
	interface Review {
		id: string;
		application_name: string;
		procedure: string;
		owner: string;
		due_date: string;
		status: string;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const data: Review[] = [
		{
			id: 'review-1',
			application_name: 'Application Name 1',
			procedure: 'Procedure 1',
			owner: 'Name Surname 1',
			due_date: '03/01/2022',
			status: 'Ongoing'
		},
		{
			id: 'review-2',
			application_name: 'Application Name 2',
			procedure: 'Procedure 2',
			owner: 'Name Surname 1',
			due_date: '03/01/2022',
			status: 'Completed'
		},
		{
			id: 'review-3',
			application_name: 'Application Name 3',
			procedure: 'Procedure 3',
			owner: 'Name Surname 1',
			due_date: '03/01/2022',
			status: 'Ongoing'
		},
		{
			id: 'review-4',
			application_name: 'Application Name 3',
			procedure: 'Procedure 1',
			owner: 'Name Surname 2',
			due_date: '03/01/2022',
			status: 'Ongoing'
		},
		{
			id: 'review-5',
			application_name: 'Application Name 3',
			procedure: 'Procedure 2',
			owner: 'Name Surname 3',
			due_date: '04/01/2022',
			status: 'Completed'
		},
		{
			id: 'review-6',
			application_name: 'Application Name 1',
			procedure: 'Procedure 4',
			owner: 'Name Surname 3',
			due_date: '05/01/2022',
			status: 'Ongoing'
		},
		{
			id: 'review-7',
			application_name: 'Application Name 3',
			procedure: 'Procedure 2',
			owner: 'Name Surname 3',
			due_date: '05/01/2022',
			status: 'Ongoing'
		}
	];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const columns: HeaderFunction<Review> = table => [
		table.createDataColumn(row => row.application_name, {
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
			header: 'Owner'
		}),
		table.createDataColumn(row => row.due_date, {
			id: 'due-date',
			header: 'Due Date'
		}),
		table.createDataColumn(row => row.status, {
			id: 'Status',
			header: 'Status'
		})
	];
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
