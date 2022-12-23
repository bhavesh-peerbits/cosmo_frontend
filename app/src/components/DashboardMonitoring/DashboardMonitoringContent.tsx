type DashboardMonitoringContentProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const DashboardMonitoringContent = ({ view }: DashboardMonitoringContentProps) => {
	return <div>{view}</div>;
};
export default DashboardMonitoringContent;
