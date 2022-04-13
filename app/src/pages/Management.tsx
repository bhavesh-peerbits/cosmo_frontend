import { Grid, Search, Column } from '@carbon/react';
import ManagementContainer from '@components/ManagementContainer';

const Management = () => {
	return (
		<div className='w-full space-y-5'>
			<div className=' h-[200px]' style={{ background: 'white' }}>
				<Grid fullWidth narrow className='h-1/2 items-end'>
					<Column sm={4}>
						<div className='flex h-[200px] flex-col justify-end gap-4 pb-7'>
							<h2 className='text-productive-heading-5'>Management Dashboard</h2>
							<Search labelText='search' placeholder='Search Application Name' />
						</div>
					</Column>
				</Grid>
			</div>
			<div>
				<ManagementContainer />
			</div>
		</div>
	);
};
export default Management;
