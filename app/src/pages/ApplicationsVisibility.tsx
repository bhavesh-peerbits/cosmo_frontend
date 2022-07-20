import { Grid, Column } from '@carbon/react';
import AppsVisibilityTable from '@components/AdminPanel/AppsVisibilityTable';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';

const ApplicationsVisibility = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<PageHeader
			pageTitle={t('app-visibility')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<Column sm={4} md={8} lg={16}>
					<AppsVisibilityTable />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default ApplicationsVisibility;
