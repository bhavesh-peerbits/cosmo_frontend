import useGetApplicationUser from '@api/user-admin/useGetApplicationUser';
import useGetAppsAdminNotMap from '@api/user-admin/useGetAppsAdminNotMap';
import MultiAddSelect from '@components/MultiAddSelect';
import { useTranslation } from 'react-i18next';

type SelectApplicationUserProps = {
	appSelectedId: string;
	setIsSelectOpen: (val: boolean) => void;
	isSelectOpen: boolean;
};
const SelectApplicationUser = ({
	appSelectedId,
	setIsSelectOpen,
	isSelectOpen
}: SelectApplicationUserProps) => {
	const { t } = useTranslation('management');
	const { t: tSelect } = useTranslation('userSelect');
	const { t: tProc } = useTranslation('procedureInfo');
	const { data: applicationUser } = useGetApplicationUser(appSelectedId);
	const { data: applications } = useGetAppsAdminNotMap();
	const cleanUp = () => {
		setIsSelectOpen(false);
	};

	return (
		<MultiAddSelect
			items={{
				entries:
					applications?.map(app => ({
						id: app.id,
						title: app.codeName
					})) ?? []
			}}
			title={tSelect('select-user')}
			description={tSelect('select-user')}
			open={isSelectOpen}
			onSubmitButtonText={tProc('save')}
			onSubmit={() => {}}
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
						? applications?.map(app => ({
								id: app.id,
								title: app.codeName
						  })) ?? []
						: []
			}}
		/>
	);
};
export default SelectApplicationUser;
