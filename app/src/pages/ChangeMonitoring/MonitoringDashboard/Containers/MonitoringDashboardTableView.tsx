import { ContentSwitcher, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import MonitoringDashboardTable from '@pages/ChangeMonitoring/ChangeMonitoringInbox/Components/MonitoringDashboardTable';

const MonitoringDashboardTableView = () => {
	const { setFilters, monitorings } = useStartedMonitorings();
	return (
		<div className='space-y-5'>
			<div className='flex justify-end'>
				<ContentSwitcher
					selectedIndex={1}
					onChange={() => setFilters({ isTile: true })}
					className='w-min'
				>
					<Switch name='first'>
						<GridIcon />
					</Switch>
					<Switch name='second'>
						<HorizontalView />
					</Switch>
				</ContentSwitcher>
			</div>
			<MonitoringDashboardTable monitorings={monitorings} />
		</div>
	);
};
export default MonitoringDashboardTableView;
