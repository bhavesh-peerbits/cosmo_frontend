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
import routes from '@routes/routes-const';

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
	return (
		<PageHeader
			pageTitle={application.name}
			intermediateRoutes={[{ name: 'Review', to: routes.REVIEW_NARRATIVE }]}
		>
			<div className='md:p-container-1'>
				<TableOfContents stickyOffset={30} tocStickyOffset={breadcrumbSize + 10}>
					<Grid fullWidth className='h-full p-5'>
						<FullWidthColumn>
							<div className='space-y-7'>
								{application.allowModifyOwner && (
									<Tile className='bg-background'>
										<Grid>
											<FullWidthColumn className='flex justify-between space-x-1'>
												<p
													data-toc-id={`application-container-${application.id}`}
													className='flex-1 text-productive-heading-3'
												>
													{t('application-info')}
												</p>
												<div className='flex-1'>
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
											<Tile className='w-full bg-background' key={procedure.id}>
												<Grid>
													<FullWidthColumn className='flex justify-between space-x-1'>
														<p
															data-toc-id={`procedure-container-${procedure.id}`}
															className='flex-1 text-productive-heading-3'
														>
															{procedure.name}
														</p>
														<div className='flex-1'>
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
