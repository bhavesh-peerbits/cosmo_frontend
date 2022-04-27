import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import useManagementApps from '@hooks/management/useManagementApps';
import ManagementTileView from '@components/management/ManagementTileView';
import ManagementTableView from '@components/management/ManagementTableView';
import { useTranslation } from 'react-i18next';

const Management = () => {
	const { t } = useTranslation('management');
	const { filters } = useManagementApps();

	return (
		<PageHeader
			pageTitle='Management'
			actions={[
				{
					name: t('add-application'),
					icon: Add,
					onClick: () => {}
				}
			]}
		>
			<div className='h-full'>
				{filters.isTile !== false ? <ManagementTileView /> : <ManagementTableView />}
			</div>
		</PageHeader>
	);
};
export default Management;
