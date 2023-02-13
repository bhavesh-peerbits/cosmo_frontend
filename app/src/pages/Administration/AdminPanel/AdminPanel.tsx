import NarrativeAdmin from '@pages/Administration/AdminPanel/Containers/NarrativeAdmin';
import UserAdmin from '@pages/Administration/AdminPanel/Containers/UserAdmin';
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
