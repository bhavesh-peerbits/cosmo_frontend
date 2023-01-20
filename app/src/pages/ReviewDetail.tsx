import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import PageHeader from '@components/PageHeader';
import { Grid, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import ProcedureReview from '@components/ReviewNarrative/ProcedureReview';
import { useTranslation } from 'react-i18next';
import ApplicationInfoReview from '@components/ReviewNarrative/ApplicationInfoReview';
import { useNavigate, useParams } from 'react-router-dom';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import routes from '@routes/routes-const';
import useGetProcedureForReview from '@api/review/useGetProcedureForReview';
import { useMemo, useEffect } from 'react';
import useGetAppsInReview from '@api/review/useGetAppsInReview';
import useGetProcedures from '@api/procedures/useGetProcedures';
import { Procedure } from 'cosmo-api/src/v1';

const ReviewDetail = () => {
	const { t } = useTranslation('reviewNarrative');
	const { appId = '' } = useParams<{ appId: string }>();
	const { data: apps } = useGetAppsInReview();
	const { data: proceduresApp = new Map<string, ProcedureAppInstance>() } =
		useGetProcedureForReview(appId);
	const procedureList = useMemo(() => [...proceduresApp.values()], [proceduresApp]);
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();
	const { breadcrumbSize } = useBreadcrumbSize();
	const data = apps?.get(appId);
	const navigate = useNavigate();

	useEffect(() => {
		if (!data) {
			navigate(routes.REVIEW_NARRATIVE, { replace: true });
		}
	}, [data, navigate]);
	if (!data) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={data.name}
			intermediateRoutes={[{ name: 'Review', to: routes.REVIEW_NARRATIVE }]}
		>
			<div className='p-container-1 pr-3'>
				<TableOfContents stickyOffset={30} tocStickyOffset={breadcrumbSize + 10}>
					<Grid fullWidth className='h-full'>
						<FullWidthColumn>
							<div className='space-y-5'>
								{data.inReview && (
									<Tile className='bg-background'>
										<Grid>
											<FullWidthColumn className='flex justify-between space-x-1'>
												<p
													data-toc-id={`application-container-${data.id}`}
													className='flex-1 text-productive-heading-3'
												>
													{t('application-info')}
												</p>
												<div className='justify-end'>
													<p className='text-text-secondary text-body-compact-1'>
														{`${t('last-review')}: ${
															data.lastReview
																? data.lastReview.toLocaleString()
																: t('never')
														}`}
													</p>
													{data.lastReview && (
														<p className='text-text-secondary text-body-compact-1'>
															{`${t('last-reviewer')}: ${data.lastReviewer?.displayName}`}
														</p>
													)}
												</div>
											</FullWidthColumn>
											<FullWidthColumn>
												<ApplicationInfoReview application={data} />
											</FullWidthColumn>
										</Grid>
									</Tile>
								)}

								{procedureList.map(
									procedure =>
										procedure.inReview && (
											<Tile className='w-full bg-background' key={procedure.id}>
												<Grid>
													<FullWidthColumn className='flex justify-between space-x-1'>
														<p
															data-toc-id={`procedure-container-${procedure.id}`}
															className='flex-1 text-productive-heading-3'
														>
															{(procedures.get(procedure.procedureId) as Procedure).name}
														</p>
														<div className='justify-end'>
															<p className='text-text-secondary text-body-compact-1'>
																{`${t('last-review')}: ${
																	procedure.lastReview
																		? procedure.lastReview.toLocaleString()
																		: t('never')
																}`}
															</p>
															{procedure.lastReviewer && (
																<p className=' text-text-secondary text-body-compact-1'>
																	{`${t('last-reviewer')}: ${
																		procedure.lastReviewer?.displayName
																	}`}
																</p>
															)}
														</div>
													</FullWidthColumn>
													<FullWidthColumn>
														<ProcedureReview
															procedureApp={procedure as unknown as ProcedureAppInstance}
															appId={appId}
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
