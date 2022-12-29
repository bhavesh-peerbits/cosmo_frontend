import { Grid, Column, Layer, Search, ContentSwitcher, Switch } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import InboxMonitoringFilters from '../Components/InboxMonitoringFilters';
import InboxMonitoringTilesContainer from '../Components/InboxMonitoringTilesContainer';

const SearchBar = () => {
	const { filters, setFilters } = useInboxMonitorings();
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

const MonitoringDashboardTileView = () => {
	const { setFilters } = useInboxMonitorings();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={2} lg={3}>
				<InboxMonitoringFilters />
			</Column>
			<Column sm={4} md={6} lg={13} className='space-y-5'>
				<div className='flex items-center space-x-5'>
					<SearchBar />
					<ContentSwitcher
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

				<InboxMonitoringTilesContainer />
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
