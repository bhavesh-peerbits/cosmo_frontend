import { Grid, Column, Layer, Search, ContentSwitcher, Switch } from '@carbon/react';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import { useTranslation } from 'react-i18next';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
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
	const { setFilters } = useStartedMonitorings();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={2} lg={3}>
				<MonitoringDashboardFilters />
			</Column>
			<Column sm={4} md={6} lg={13} className='space-y-5'>
				<div className='flex items-center space-x-5'>
					<SearchBar />
					<ContentSwitcher
						selectedIndex={0}
						onChange={() => {
							setFilters({ isTile: false });
						}}
						className='w-auto'
					>
						<Switch name='first'>
							<GridIcon />
						</Switch>
						<Switch name='second'>
							<HorizontalView />
						</Switch>
					</ContentSwitcher>
				</div>

				<MonitoringDashboardTilesContainer />
				{view}
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
