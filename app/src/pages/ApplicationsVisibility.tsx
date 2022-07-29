import { Grid, Column } from '@carbon/react';
import AppsVisibilityTable from '@components/AdminPanel/AppsVisibilityTable';
import NoDataMessage from '@components/NoDataMessage';
import PageHeader from '@components/PageHeader';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';
import { useTranslation } from 'react-i18next';

const ApplicationsVisibility = () => {
	const { t } = useTranslation('userAdmin');
	const { t: tModals } = useTranslation('modals');
	const { apps, filters, setFilters } = useVisibilityApps();
	if (apps.length === 0) {
		return (
			<div>
				<NoDataMessage className='mt-10 p-5' title={tModals('no-applications')} />
			</div>
		);
	}

	return (
		<PageHeader
			pageTitle={t('app-visibility')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<Column sm={4} md={8} lg={16}>
					<AppsVisibilityTable apps={apps} filters={filters} setFilters={setFilters} />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default ApplicationsVisibility;
