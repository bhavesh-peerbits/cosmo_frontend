import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import InboxMonitoringTableView from './InboxMonitoringTableView';
import InboxMonitoringTileView from './InboxMonitoringTileView';

const ChangeMonitoringInboxContent = () => {
	const { filters } = useInboxMonitorings();

	return filters.isTile !== false ? (
		<InboxMonitoringTileView />
	) : (
		<InboxMonitoringTableView />
	);
};
export default ChangeMonitoringInboxContent;
