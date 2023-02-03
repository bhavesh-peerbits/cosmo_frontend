import { Grid, Column } from '@carbon/react';
import UsersTable from '@components/AdminPanel/UsersTable';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import AddUserModal from '@components/Modals/AddUserModal';

const RoleAssignment = () => {
	const { t } = useTranslation('userAdmin');
	const { t: tModals } = useTranslation('modals');
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<PageHeader
			pageTitle={t('role-assignment')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: tModals('add-user'),
					icon: Add,
					onClick: () => setIsModalOpen(true)
				}
			]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<AddUserModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
				<Column sm={4} md={8} lg={16}>
					<UsersTable />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default RoleAssignment;
