import PageHeader from '@components/PageHeader';

import GeneralInfoReview from '@components/ReviewNarrative/GeneralInfoReview';
import { Grid, Form, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';

const ReviewDetail = () => {
	return (
		<PageHeader
			pageTitle='Name'
			intermediateRoutes={[{ name: 'Review', to: '/review-narrative' }]}
		>
			<Grid fullWidth className='h-full pb-4 pr-4'>
				<FullWidthColumn className='pt-4'>
					<Form className='space-y-4'>
						<div className='flex w-full flex-wrap items-center md:space-x-4'>
							<Tile className='w-full bg-background pb-7'>
								<Grid>
									<FullWidthColumn>
										<GeneralInfoReview />
									</FullWidthColumn>
								</Grid>
							</Tile>
						</div>
					</Form>
				</FullWidthColumn>
			</Grid>
		</PageHeader>
	);
};

export default ReviewDetail;
