import { ContentSwitcher, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import InboxMonitoringTable from '../Components/InboxMonitoringTable';

const InboxMonitoringTableView = () => {
	const { setFilters } = useInboxMonitorings();
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
			<InboxMonitoringTable />
		</div>
	);
};
export default InboxMonitoringTableView;
