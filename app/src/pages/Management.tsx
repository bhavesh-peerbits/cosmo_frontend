import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import useManagementApps from '@hooks/management/useManagementApps';
import ManagementTileView from '@components/management/ManagementTileView';
import ManagementTableView from '@components/management/ManagementTableView';
import { useTranslation } from 'react-i18next';
import NewApplicationModal from '@components/Modals/NewApplicationModal';
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
