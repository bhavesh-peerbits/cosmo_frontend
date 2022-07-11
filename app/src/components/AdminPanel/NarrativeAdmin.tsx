import { Grid, Column } from '@carbon/react';
import AdminTile from './AdminTile';

const NarrativeAdmin = () => {
	return (
		<Grid fullWidth narrow className='mb-7 h-full px-5 pt-7'>
			<Column sm={4} md={2} lg={4}>
				<p className='text-productive-heading-3'>Narrative Administration</p>
				<Column>
					<p className='mt-5 text-body-long-1'>
						You can edit Procedures or edit email template.
					</p>
				</Column>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile title='Procedures' description='description' />
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile title='Email Template' description='description' />
			</Column>
		</Grid>
	);
};
export default NarrativeAdmin;
