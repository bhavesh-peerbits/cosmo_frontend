import useGetApplicationUser from '@api/user-admin/useGetApplicationUser';
import useSetApplicationUser from '@api/user-admin/useSetApplicationUser';
import MultiAddSelect from '@components/MultiAddSelect';
import User from '@model/User';
import { useTranslation } from 'react-i18next';

type SelectUserApplicationProps = {
	appSelectedId: string;
	setIsSelectOpen: (val: boolean) => void;
	isSelectOpen: boolean;
	setAppSelected: (val: []) => void;
	analystUsers: User[];
};
const SelectUserApplication = ({
	appSelectedId,
	setIsSelectOpen,
	isSelectOpen,
	setAppSelected,
	analystUsers
}: SelectUserApplicationProps) => {
	const { t } = useTranslation('management');
	const { t: tSelect } = useTranslation('userSelect');
	const { t: tProc } = useTranslation('procedureInfo');
	const { data: applicationUser } = useGetApplicationUser(appSelectedId);
	const { mutate } = useSetApplicationUser();

	const cleanUp = () => {
		setIsSelectOpen(false);
	};

	const setAppVisibility = (ids: string[]) => {
		applicationUser &&
			mutate(
				{
					appId: applicationUser.application.id,
					appUserData: {
						application: applicationUser.application,
						users: ids.map(id => analystUsers.filter(analyst => analyst.id === id)).flat()
					}
				},
				{
					onSuccess: () => {
						cleanUp();
						setAppSelected([]);
					}
				}
			);
	};

	return (
		<MultiAddSelect
			items={{
				entries: analystUsers.map(u => ({
					id: u.id,
					title: u.displayName,
					tagInfo: u.principalRole,
					subtitle: u.email || tSelect('no-email'),
					role: u.principalRole,
					avatar: {
						imageDescription: u.username,
						initials: u.displayName
					}
				}))
			}}
			title={tSelect('select-user')}
			description={tSelect('select-users')}
			open={isSelectOpen}
			onSubmitButtonText={tProc('save')}
			onSubmit={ids => {
				setAppVisibility(ids);
			}}
			onCloseButtonText={t('cancel')}
			onClose={() => {
				cleanUp();
			}}
			globalSearchLabel={tSelect('username-email')}
			globalSearchPlaceholder={tSelect('find-user')}
			globalFilters={[
				{
					id: 'role',
					label: tSelect('role')
				}
			]}
			globalFiltersIconDescription={tSelect('filters')}
			globalFiltersPlaceholderText={tSelect('choose-option')}
			globalFiltersPrimaryButtonText={tSelect('apply')}
			globalFiltersSecondaryButtonText={tSelect('reset')}
			clearFiltersText={tSelect('clear-filters')}
			influencerItemTitle={tSelect('name')}
			influencerItemSubtitle='email'
			noResultsTitle={tSelect('no-results')}
			noResultsDescription={tSelect('different-keywords')}
			selectedItems={{
				entries:
					applicationUser && applicationUser.users
						? applicationUser.users.map(u => ({
								id: u.id,
								title: u.displayName,
								tagInfo: u.principalRole,
								subtitle: u.email || tSelect('no-email'),
								role: u.principalRole,
								avatar: {
									imageDescription: u.username,
									initials: u.displayName
								}
						  }))
						: []
			}}
		/>
	);
};
export default SelectUserApplication;
