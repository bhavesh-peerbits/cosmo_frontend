import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import CreateProcedureModal from '@components/Modals/CreateProcedureModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProceduresTileContainer from '@components/AdminPanel/ProceduresTileContainer';
import { Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';

const Procedures = () => {
	const [isNewProcModalOpen, setIsNewProcModalOpen] = useState(false);
	const { t } = useTranslation('narrativeAdmin');

	return (
		<PageHeader
			pageTitle='Procedures'
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: t('add-procedure'),
					icon: Add,
					onClick: () => {
						setIsNewProcModalOpen(true);
					}
				}
			]}
		>
			<Grid fullWidth narrow>
				<CreateProcedureModal
					isOpen={isNewProcModalOpen}
					setIsOpen={setIsNewProcModalOpen}
				/>
				<FullWidthColumn className='p-container-1'>
					<ProceduresTileContainer />
				</FullWidthColumn>
			</Grid>
		</PageHeader>
	);
};
export default Procedures;
