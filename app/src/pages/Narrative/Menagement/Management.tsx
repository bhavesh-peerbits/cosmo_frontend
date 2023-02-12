import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import useManagementApps from '@hooks/management/useManagementApps';
import ManagementTileView from '@pages/Narrative/Menagement/Containers/ManagementTileView';
import ManagementTableView from '@pages/Narrative/Menagement/Containers/ManagementTableView';
import { useTranslation } from 'react-i18next';
import NewApplicationModal from '@pages/Narrative/Menagement/Modals/NewApplicationModal';
import { useState } from 'react';

const Management = () => {
	const { t } = useTranslation('management');
	const { filters } = useManagementApps();
	const [isNewAppOpen, setIsNewAppOpen] = useState(false);

	return (
		<PageHeader
			pageTitle='Management'
			actions={[
				{
					name: t('add-application'),
					icon: Add,
					onClick: () => {
						setIsNewAppOpen(true);
					}
				}
			]}
		>
			<div className='h-full p-container-1'>
				<NewApplicationModal isOpen={isNewAppOpen} setIsOpen={setIsNewAppOpen} />
				{filters.isTile !== false ? <ManagementTileView /> : <ManagementTableView />}
			</div>
		</PageHeader>
	);
};
export default Management;
