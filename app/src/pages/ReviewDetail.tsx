import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import PageHeader from '@components/PageHeader';
import { Grid, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import ProcedureReview from '@components/ReviewNarrative/ProcedureReview';
import { useTranslation } from 'react-i18next';
import ApplicationInfoReview from '@components/ReviewNarrative/ApplicationInfoReview';
import { useParams } from 'react-router-dom';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import routes from '@routes/routes-const';
import useGetApp from '@api/management/useGetApp';
import useGetProcedureForReview from '@api/review/useGetProcedureForReview';
import { useMemo, useState, useEffect } from 'react';

type ProcedureState = Partial<ProcedureAppInstance> & {
	id: string;
	procedureId: string;
	isNew?: boolean;
};

const ReviewDetail = () => {
	const { t } = useTranslation('reviewNarrative');
	const { appId = '' } = useParams<{ appId: string }>();
	const { data } = useGetApp(appId);
	const { data: procedures = new Map<string, ProcedureAppInstance>() } =
		useGetProcedureForReview(appId);
	const serverProcs = useMemo(() => [...procedures.values()], [procedures]);
	const [procedureList, setProcedureList] = useState<ProcedureState[]>(serverProcs);
	const { breadcrumbSize } = useBreadcrumbSize();

	useEffect(() => {
		setProcedureList(old => {
			const p = old.findIndex(proc => proc.isNew);
			if (p !== -1) {
				return old.splice(p, 1, serverProcs[p]);
			}
			return serverProcs;
		});
	}, [serverProcs]);

	if (!data) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={data.name}
			intermediateRoutes={[{ name: 'Review', to: routes.REVIEW_NARRATIVE }]}
		>
			<div className='md:p-container-1'>
				<TableOfContents stickyOffset={30} tocStickyOffset={breadcrumbSize + 10}>
					<Grid fullWidth className='h-full p-5'>
						<FullWidthColumn>
							<div className='space-y-7'>
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
															{`${t('last-reviewer')}:`}
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
															{procedure.name}
														</p>
														<div className='justify-end'>
															<p className='text-text-secondary text-body-compact-1'>
																{`${t(
																	'last-review'
																)}: ${procedure.lastReview?.toLocaleString()}`}
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
