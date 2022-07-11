import NarrativeAdmin from '@components/AdminPanel/NarrativeAdmin';
import UserAdmin from '@components/AdminPanel/UserAdmin';
import PageHeader from '@components/PageHeader';

const AdminPanel = () => {
	return (
		<PageHeader pageTitle='Admin Panel'>
			<div className='divide-y-[1px] divide-solid divide-border-subtle-0 px-7'>
				<UserAdmin />
				<NarrativeAdmin />
			</div>
		</PageHeader>
	);
};
export default AdminPanel;
