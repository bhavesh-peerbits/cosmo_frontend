import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';

const Procedures = () => {
	return (
		<PageHeader
			pageTitle='Procedures'
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: 'New Procedure',
					icon: Add,
					onClick: () => {}
				}
			]}
		>
			<div>Contenuto</div>
		</PageHeader>
	);
};
export default Procedures;
