import { Grid, Column, Layer, Search } from '@carbon/react';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import { useTranslation } from 'react-i18next';
import MonitoringDashboardFilters from './MonitoringDashboardFilters';
import MonitoringDashboardTilesContainer from './MonitoringDashboardTilesContainer';

type MonitoringDashboardTileViewProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const SearchBar = () => {
	const { filters, setFilters } = useStartedMonitorings();
	const { t } = useTranslation('changeMonitoring');

	return (
		<Layer className='w-full'>
			<Search
				size='lg'
				labelText=''
				placeholder={t('search-monitoring-name')}
				value={filters.q ?? ''}
				onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
			/>
		</Layer>
	);
};

const MonitoringDashboardTileView = ({ view }: MonitoringDashboardTileViewProps) => {
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={2} lg={3}>
				<MonitoringDashboardFilters />
			</Column>
			<Column sm={4} md={6} lg={13} className='space-y-5'>
				<SearchBar />
				<MonitoringDashboardTilesContainer />
				{view}
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
