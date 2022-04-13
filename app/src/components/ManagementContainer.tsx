import { Button, Column, ContentSwitcher, Grid, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsTileContainer from './ApplicationsTileContainer';

const ManagementContainer = () => {
	const [isTileView, setIsTileView] = useState(true);
	return (
		<div>
			{isTileView ? (
				<Grid fullWidth narrow>
					<Column sm={2} md={2} lg={2}>
						<ApplicationsFilters />
					</Column>
					<Column sm={4} md={6} lg={14}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-between'>
								<Button>Add Application</Button>
								<div className='flex items-center justify-end space-x-4'>
									<div className='whitespace-nowrap'> 16 Applications </div>
									<ContentSwitcher onChange={() => setIsTileView(!isTileView)}>
										<Switch name='first' text={<GridIcon />} />
										<Switch name='second' text={<HorizontalView />} />
									</ContentSwitcher>
								</div>
							</div>
							<ApplicationsTileContainer />
						</div>
					</Column>
				</Grid>
			) : (
				<Grid fullWidth narrow>
					<Column sm={4} md={8} lg={16}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-between'>
								<Button>Add Application</Button>
								<div className='flex items-center justify-end space-x-4'>
									<div className='whitespace-nowrap'> 16 Applications </div>
									<ContentSwitcher
										selectedIndex={1}
										onChange={() => setIsTileView(!isTileView)}
									>
										<Switch name='first' text={<GridIcon />} />
										<Switch name='second' text={<HorizontalView />} />
									</ContentSwitcher>
								</div>
							</div>
							<ApplicationsTable />
						</div>
					</Column>
				</Grid>
			)}
		</div>
	);
};
export default ManagementContainer;
