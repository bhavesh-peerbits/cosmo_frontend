import useGetUserAppVisibility from '@api/user-admin/useGetUserAppVisibility';
import useSetUserApplication from '@api/user-admin/useSetUserApplication';
import MultiAddSelect from '@components/MultiAddSelect';
import Application from '@model/Application';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

type SelectApplicationUserProps = {
	userSelectedId: string;
	setIsSelectOpen: (val: boolean) => void;
	isSelectOpen: boolean;
	applications: Application[];
};
const SelectApplicationUser = ({
	userSelectedId,
	setIsSelectOpen,
	isSelectOpen,
	applications
}: SelectApplicationUserProps) => {
	const { t } = useTranslation('management');
	const queryClient = useQueryClient();
	const { t: tSelect } = useTranslation('userSelect');
	const { t: tProc } = useTranslation('procedureInfo');
	const { data: applicationUser } = useGetUserAppVisibility(userSelectedId);
	const { mutate } = useSetUserApplication();
	const cleanUp = () => {
		setTimeout(() => queryClient.removeQueries(['app-user-visibility']), 1);
		setIsSelectOpen(false);
	};

	const setUserAppVisibility = (ids: string[]) => {
		applications &&
			ids &&
			mutate(
				{
					userId: userSelectedId,
					applications: applications.filter(app => `${ids.indexOf(`${app.id}`)}` !== '-1')
				},
				{
					onSuccess: () => {
						cleanUp();
					}
				}
			);
	};

	return (
		<MultiAddSelect
			items={{
				entries:
					applications?.map(app => ({
						id: app.id,
						title: app.name,
						subtitle: app.codeName
					})) ?? []
			}}
			title={tSelect('select-app')}
			open={isSelectOpen}
			onSubmitButtonText={tProc('save')}
			onSubmit={ids => setUserAppVisibility(ids)}
			onCloseButtonText={t('cancel')}
			onClose={() => {
				cleanUp();
			}}
			globalSearchLabel={tSelect('username-email')}
			globalSearchPlaceholder={tSelect('find-app')}
			influencerItemTitle={tSelect('name')}
			influencerItemSubtitle={tSelect('code')}
			noResultsTitle={tSelect('no-results')}
			noResultsDescription={tSelect('different-keywords')}
			selectedItems={{
				entries: applicationUser
					? applicationUser?.map(app => ({
							id: app.id,
							title: app.name,
							subtitle: app.codeName
					  })) ?? []
					: []
			}}
		/>
	);
};
export default SelectApplicationUser;
