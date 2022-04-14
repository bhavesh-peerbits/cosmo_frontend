import { Button, Column, ContentSwitcher, Grid, Switch, Tag } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsTileContainer from './ApplicationsTileContainer';

const ManagementContainer = () => {
	const [isTileView, setIsTileView] = useState(true);
	const [filtersChecked, setFiltersChecked] = useState<string[]>([]);

	const handleSelectFilter = (id: string) => {
		return filtersChecked.includes(id) ? '' : setFiltersChecked(old => [...old, id]);
	};

	const closeFilter = (filter: string) => {
		setFiltersChecked(filtersChecked.filter(idFilter => idFilter !== filter));
	};

	return (
		<div>
			{isTileView ? (
				<Grid fullWidth narrow>
					<Column sm={2} md={2} lg={2}>
						<ApplicationsFilters
							idList={filtersChecked}
							handleFilters={handleSelectFilter}
						/>
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
							{filtersChecked.length > 0 ? (
								<div className=' flex items-center space-x-4'>
									<h2>Filters: </h2>
									{filtersChecked.map(filter => (
										<Tag
											onClose={() => {
												closeFilter(filter);
											}}
											type='cyan'
											filter
										>
											{filter}
										</Tag>
									))}
								</div>
							) : (
								''
							)}

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
