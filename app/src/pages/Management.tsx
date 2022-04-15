import { Grid, Button, Column } from '@carbon/react';
import ManagementContainer from '@components/ManagementContainer';

const Management = () => {
	return (
		<div className='w-full space-y-5'>
			<div className=' h-[138px]' style={{ background: 'white' }}>
				<Grid fullWidth narrow className='h-full items-end'>
					<Column sm={4} md={8} lg={16}>
						<div className='flex h-[138px] items-end justify-between pb-7'>
							<h2 className='text-productive-heading-5'>Management Dashboard</h2>
							<Button size='md'>Add Application</Button>
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
