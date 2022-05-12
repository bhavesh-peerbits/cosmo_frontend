import { Grid, Column, Search, Layer } from '@carbon/react';
import Fade from '@components/Fade';

import NarrativeTileContainer from '@components/NarrativesTileContainer';
import PageHeader from '@components/PageHeader';
import { t } from 'i18next';

const NarrativeReview = () => {
	const narratives = [
		{
			id: 'Narrative1',
			name: 'Narrative 1',
			applicationName: 'Application1',
			analyst: 'Name Surname',
			startDate: new Date(2022, 4, 7),
			dueDate: new Date(2022, 7, 7)
		},
		{
			id: 'Narrative2',
			name: 'Narrative 2',
			applicationName: 'Application2',
			analyst: 'Name Surname',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2022, 6, 7)
		}
	];
	return (
		<PageHeader pageTitle='Review'>
			<div className='h-full p-container-1'>
				<Fade>
					<Grid fullWidth narrow className='h-full'>
						<Column sm={4} md={6} lg={13}>
							<div className='flex flex-col space-y-7'>
								<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
									<Layer className='ml-5 w-full'>
										<Search
											size='lg'
											labelText='Search'
											placeholder='Search by Application Name'
										/>
									</Layer>

									<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
										<div className='whitespace-nowrap'>{`${narratives.length} ${t(
											'Narratives to review'
										)}`}</div>
									</div>
								</div>
								<div>
									<NarrativeTileContainer narratives={narratives} />
								</div>
							</div>
						</Column>
					</Grid>
				</Fade>
			</div>
		</PageHeader>
	);
};
export default NarrativeReview;
