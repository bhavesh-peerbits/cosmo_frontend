import { Grid, Column } from '@carbon/react';
import RoleAssignmentFilters from '@components/AdminPanel/RoleAssignmentFilters';
import UsersTable from '@components/AdminPanel/UsersTable';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import AddUserModal from '@components/Modals/AddUserModal';

const RoleAssignment = () => {
	const { t } = useTranslation('userAdmin');
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<PageHeader
			pageTitle={t('role-assignment')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: 'Add User',
					icon: Add,
					onClick: () => setIsModalOpen(true)
				}
			]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<AddUserModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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
