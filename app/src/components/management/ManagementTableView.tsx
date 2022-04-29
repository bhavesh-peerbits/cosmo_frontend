import Fade from '@components/Fade';
import { Column, ContentSwitcher, Grid, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import ApplicationsTable from '@components/management/ApplicationsTable';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';

const ManagementTableView = () => {
	const { t } = useTranslation('management');
	const { setFilters, apps } = useManagementApps();

	return (
		<div className='h-full'>
			<Fade>
				<Grid fullWidth narrow className='h-full'>
					<Column sm={4} md={8} lg={16}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-end'>
								<div className='ml-5 flex w-full items-center justify-between space-x-5 md:justify-end'>
									<div className='whitespace-nowrap'>{`${apps.length} ${t(
										'applications'
									)}`}</div>

									<div>
										<ContentSwitcher
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
					</Column>
				</Grid>
			</Fade>
		</div>
	);
};
export default ManagementTableView;
