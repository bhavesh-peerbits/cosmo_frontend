import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import CreateProcedureModal from '@components/Modals/CreateProcedureModal';
import { useState } from 'react';

const Procedures = () => {
	const [isNewProcModalOpen, setIsNewProcModalOpen] = useState(false);
	return (
		<PageHeader
			pageTitle='Procedures'
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: 'New Procedure',
					icon: Add,
					onClick: () => {
						setIsNewProcModalOpen(true);
					}
				}
			]}
		>
			<div>
				Contenuto
				<CreateProcedureModal
					isOpen={isNewProcModalOpen}
					setIsOpen={setIsNewProcModalOpen}
				/>
			</div>
		</PageHeader>
	);
};
export default Procedures;
