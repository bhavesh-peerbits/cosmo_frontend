import { Column, ContentSwitcher, Grid, Search, Switch, Tag } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsTileContainer from './ApplicationsTileContainer';

type Filter = {
	id: string;
	category: string;
};

const ManagementContainer = () => {
	const [isTileView, setIsTileView] = useState(true);
	const [checkedFilters, setCheckedFilters] = useState<Filter[]>([]);

	const handleSelectFilter = (filter: Filter) => {
		return checkedFilters.some(e => e.id === filter.id)
			? setCheckedFilters(checkedFilters.filter(e => e.id !== filter.id))
			: setCheckedFilters(old => [...old, filter]);
	};

	const closeFilter = (filterToRemove: Filter) => {
		setCheckedFilters(checkedFilters.filter(filter => filter !== filterToRemove));
	};

	return (
		<div>
			{isTileView ? (
				<Grid fullWidth narrow>
					<Column sm={4} md={2} lg={3}>
						<ApplicationsFilters
							checkedFilters={checkedFilters}
							handleSelect={handleSelectFilter}
						/>
					</Column>
					<Column sm={4} md={6} lg={13}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-between space-x-5'>
								<Search
									light
									labelText='Search application name'
									placeholder='Search by application name'
								/>
								<div className='flex items-center justify-end space-x-5'>
									<div className='whitespace-nowrap'> 16 Applications </div>
									<ContentSwitcher onChange={() => setIsTileView(!isTileView)}>
										<Switch name='first' text={<GridIcon />} />
										<Switch name='second' text={<HorizontalView />} />
									</ContentSwitcher>
								</div>
							</div>
							{checkedFilters.length > 0 ? (
								<div className=' flex items-center space-x-5'>
									<h2>Filters: </h2>
									{checkedFilters.map(filter => (
										<Tag
											onClose={() => {
												closeFilter(filter);
											}}
											type='cyan'
											filter
										>
											{filter.category}
										</Tag>
									))}
								</div>
							) : (
								''
							)}
							<div>
								<ApplicationsTileContainer />
							</div>
						</div>
					</Column>
				</Grid>
			) : (
				<Grid fullWidth narrow>
					<Column sm={4} md={8} lg={16}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-end'>
								<div className='flex items-center justify-end space-x-5'>
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
							<div>
								<ApplicationsTable />
							</div>
						</div>
					</Column>
				</Grid>
			)}
		</div>
	);
};
export default ManagementContainer;
