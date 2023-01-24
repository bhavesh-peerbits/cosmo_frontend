import { Grid, Layer, Search, ContentSwitcher, Switch } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import Centered from '@components/Centered';
import FullWidthColumn from '@components/FullWidthColumn';
import NoDataMessage from '@components/NoDataMessage';
import Fade from '@components/Fade';
import InboxMonitoringTilesContainer from '../Components/InboxMonitoringTilesContainer';
import InboxMonitoringFilters from '../Components/InboxMonitoringFilters';

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
	const { setFilters, monitorings } = useInboxMonitorings();
	const { t } = useTranslation('changeMonitoring');
	return (
		<Grid fullWidth className='space-y-5'>
			<FullWidthColumn>
				<div className='w-full items-center sm:space-y-5 md:flex md:space-x-5 md:space-y-0'>
					<div className='flex w-full space-x-5'>
						<InboxMonitoringFilters />
						<SearchBar />
					</div>
					<div className='flex items-center space-x-5'>
						<div className='whitespace-nowrap'>{`${monitorings.length} ${t(
							'drafts'
						)}`}</div>
						<ContentSwitcher
							onChange={() => {
								setFilters({ isTile: false });
							}}
							className='w-full md:w-auto'
						>
							<Switch name='first'>
								<GridIcon />
							</Switch>
							<Switch name='second'>
								<HorizontalView />
							</Switch>
						</ContentSwitcher>
					</div>
				</div>
			</FullWidthColumn>
			<FullWidthColumn>
				{monitorings.length === 0 ? (
					<Fade>
						<Centered>
							<NoDataMessage title={t('no-monitoring')} />
						</Centered>
					</Fade>
				) : (
					<InboxMonitoringTilesContainer />
				)}
			</FullWidthColumn>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
