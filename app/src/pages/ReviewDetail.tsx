import { useRef } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import PageHeader from '@components/PageHeader';
import GeneralInfoReview from '@components/ReviewNarrative/GeneralInfoReview';
import { Grid, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';

const ReviewDetail = () => {
	const { breadcrumbSize } = useBreadcrumbSize();
	const buttonRef = useRef<HTMLDivElement>(null);
	return (
		<PageHeader
			pageTitle='Name'
			intermediateRoutes={[{ name: 'Review', to: '/review-narrative' }]}
		>
			<TableOfContents
				stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
				tocStickyOffset={breadcrumbSize * 2}
			>
				<Grid fullWidth className='h-full pb-4 pr-4'>
					<FullWidthColumn className='pt-4'>
						<div className='space-y-7'>
							<Tile className='w-full bg-background pb-7'>
								<Grid>
									<FullWidthColumn className='flex justify-between'>
										<p data-toc-id='general-info' className='text-productive-heading-3'>
											General Info
										</p>
										<div>
											<p className='text-text-secondary text-body-compact-1'>
												Last Review Date:
											</p>
											<p className=' text-text-secondary text-body-compact-1'>
												Last Reviewer:
											</p>
										</div>
									</FullWidthColumn>

									<FullWidthColumn>
										<GeneralInfoReview />
									</FullWidthColumn>
								</Grid>
							</Tile>
						</div>
					</FullWidthColumn>
				</Grid>
			</TableOfContents>
		</PageHeader>
	);
};

export default ReviewDetail;
