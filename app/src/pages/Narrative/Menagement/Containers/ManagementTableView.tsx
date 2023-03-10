import Fade from '@components/Fade';
import { ContentSwitcher, Grid, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import ApplicationsTable from '@pages/Narrative/Menagement/Components/ApplicationsTable';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import FullWidthColumn from '@components/FullWidthColumn';

const ManagementTableView = () => {
	const { t } = useTranslation('management');
	const { setFilters, apps } = useManagementApps();

	return (
		<div className='h-full'>
			<Fade>
				<Grid fullWidth className='h-full'>
					<FullWidthColumn>
						<div className='flex flex-col space-y-5'>
							<div className='flex w-full justify-end'>
								<div className='ml-5 flex w-full items-center justify-between space-x-5 md:justify-end'>
									<div className='whitespace-nowrap'>{`${apps.length} ${t(
										'applications'
									)}`}</div>

									<div>
										<ContentSwitcher
											size='lg'
											selectedIndex={1}
											onChange={() => setFilters({ isTile: undefined })}
										>
											<Switch name='first'>
												<GridIcon />
											</Switch>
											<Switch name='second'>
												<HorizontalView />
											</Switch>
										</ContentSwitcher>
									</div>
								</div>
							</div>
							<div>
								<ApplicationsTable />
							</div>
						</div>
					</FullWidthColumn>
				</Grid>
			</Fade>
		</div>
	);
};
export default ManagementTableView;
