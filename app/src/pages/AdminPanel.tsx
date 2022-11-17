import NarrativeAdmin from '@components/AdminPanel/NarrativeAdmin';
import UserAdmin from '@components/AdminPanel/UserAdmin';
import PageHeader from '@components/PageHeader';
import usePolicyStore from '@hooks/usePolicyStore';

const AdminPanel = () => {
	const { canUserAdmin, canNarrativeAdmin } = usePolicyStore();
	return (
		<PageHeader pageTitle='Admin Panel'>
			<div className='divide-y-[1px] divide-solid divide-border-subtle-0 px-6'>
				{canUserAdmin && <UserAdmin />}
				{canNarrativeAdmin && <NarrativeAdmin />}
			</div>
		</PageHeader>
	);
};
export default AdminPanel;
