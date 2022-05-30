import { useRef } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import PageHeader from '@components/PageHeader';
import { Grid, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import ProcedureReview from '@components/ReviewNarrative/ProcedureReview';
import useGetAppReview from '@api/review/useGetAppReview';
import { useTranslation } from 'react-i18next';
import ApplicationInfoReview from '@components/ReviewNarrative/ApplicationInfoReview';
import { useParams } from 'react-router-dom';
import ProcedureAppInstance from '@model/ProcedureAppInstance';

const ReviewDetail = () => {
	const { t } = useTranslation('reviewNarrative');
	const { appId = '' } = useParams<{ appId: string }>();
	const application = useGetAppReview(appId);
	const procedureList = [
		{
			id: 'id1',
			name: 'Procedure Name 1',
			description: 'Description',
			procedure: {
				name: 'procedure name',
				id: 'id1'
			},
			lastModify: new Date(),
			lastReview: new Date(),
			allowModifyOwner: true
		},
		{
			id: 'id2',
			name: 'Procedure Name 2',
			description: 'Description',
			procedure: {
				name: 'procedure name',
				id: 'id1'
			},
			lastModify: new Date(),
			lastReview: new Date(),
			allowModifyOwner: false
		}
	]; // TODO wait BE for response

	const { breadcrumbSize } = useBreadcrumbSize();
	const buttonRef = useRef<HTMLDivElement>(null);
	return (
		<PageHeader
			pageTitle={application.name}
			intermediateRoutes={[{ name: 'Review', to: '/review-narrative' }]}
		>
			<div className='p-container-1'>
				<TableOfContents
					stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
					tocStickyOffset={breadcrumbSize * 2}
				>
					<Grid fullWidth className='h-full pb-4'>
						<FullWidthColumn className='pt-4'>
							<div className='space-y-7'>
								{application.allowModifyOwner && (
									<Tile className='bg-background'>
										<Grid>
											<FullWidthColumn className='flex justify-between'>
												<p
													data-toc-id={`procedure-container-${application.id}`}
													className='text-productive-heading-3'
												>
													{t('application-info')}
												</p>
												<div>
													<p className='text-text-secondary text-body-compact-1'>
														{`${t(
															'last-review'
														)}: ${application.lastReview.toLocaleString()}`}
													</p>
													<p className=' text-text-secondary text-body-compact-1'>
														{`${t('last-reviewer')}:`}
													</p>
												</div>
											</FullWidthColumn>
											<FullWidthColumn>
												<ApplicationInfoReview application={application} />
											</FullWidthColumn>
										</Grid>
									</Tile>
								)}

								{procedureList.map(
									procedure =>
										procedure.allowModifyOwner && (
											<Tile className='w-full bg-background'>
												<Grid>
													<FullWidthColumn className='flex justify-between'>
														<p
															data-toc-id={`procedure-container-${procedure.id}`}
															className='text-productive-heading-3'
														>
															{procedure.name}
														</p>
														<div>
															<p className='text-text-secondary text-body-compact-1'>
																{`${t(
																	'last-review'
																)}: ${procedure.lastReview.toLocaleString()}`}
															</p>
															<p className=' text-text-secondary text-body-compact-1'>
																{`${t('last-reviewer')}:`}
															</p>
														</div>
													</FullWidthColumn>
													<FullWidthColumn>
														<ProcedureReview
															procedureApp={procedure as unknown as ProcedureAppInstance}
															appProcedures={
																procedureList as unknown as ProcedureAppInstance[]
															}
														/>
													</FullWidthColumn>
												</Grid>
											</Tile>
										)
								)}
							</div>
						</FullWidthColumn>
					</Grid>
				</TableOfContents>
			</div>
		</PageHeader>
	);
};

export default ReviewDetail;
