import { Button, Column, Grid } from '@carbon/react';
import ManagementContainer from '@components/ManagementContainer';

const Management = () => {
	return (
		<div className='w-full space-y-5'>
			<div className='bg-background'>
				<Grid fullWidth className='items-end pt-10 pb-7'>
					<Column sm={4} md={5} lg={11}>
						<h2 className='text-productive-heading-5'>Management Dashboard</h2>
					</Column>
					<Column sm={4} md={3} lg={5}>
						<div className='mt-4 flex justify-end md:mt-0'>
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
