import { Grid, Column } from '@carbon/react';
import AdminTile from './AdminTile';

const UserAdmin = () => {
	return (
		<Grid fullWidth narrow className='mt-7 mb-7 h-full px-5'>
			<Column sm={4} md={2} lg={4}>
				<p className='font-bold text-productive-heading-3'>User Administration</p>
				<Column>
					<p className='mt-5 text-body-long-1'>
						You can edit roles of users or edit applications visibility
					</p>
				</Column>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile title='Role Assignment' description='Descritpion' />
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile title='Application Visibility' description='Description' />
			</Column>
		</Grid>
	);
};
export default UserAdmin;
