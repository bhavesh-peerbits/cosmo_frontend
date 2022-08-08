import { Grid, Column } from '@carbon/react';
import AppsVisibilityTable from '@components/AdminPanel/AppsVisibilityTable';
import PageHeader from '@components/PageHeader';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';
import { useTranslation } from 'react-i18next';

const ApplicationsVisibility = () => {
	const { t } = useTranslation('userAdmin');
	const { apps, filters, setFilters } = useVisibilityApps();

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
