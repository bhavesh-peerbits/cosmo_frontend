import ManagementContainer from '@components/ManagementContainer';
import PageHeader from '@components/PageHeader';

const Management = () => {
	return (
		<PageHeader
			pageTitle='Management'
			actions={[
				{
					name: 'Add Application',
					onClick: () => {}
				}
			]}
		>
			<ManagementContainer />
		</PageHeader>
	);
};
export default Management;
