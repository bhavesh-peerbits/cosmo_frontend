import { Grid, Column } from '@carbon/react';
import RoleAssignmentFilters from '@components/AdminPanel/RoleAssignmentFilters';
import UsersTable from '@components/AdminPanel/UsersTable';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';

const RoleAssignment = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<PageHeader pageTitle={t('role-assignment')}>
			<Grid fullWidth className='h-full p-container-1'>
				<Column sm={4} md={2} lg={3}>
					<div className='md:ml-0'>
						<RoleAssignmentFilters />
					</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<UsersTable />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default RoleAssignment;
