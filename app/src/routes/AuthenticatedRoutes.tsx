import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import '@style/loading.scss';
import Header from '@components/Header';
import ErrorBoundary from '@error/components/ErrorBoundary';
import PageSkeleton from '@components/PageSkeleton';
import usePolicyStore from '@hooks/usePolicyStore';
import ProtectRoute from '@routes/ProtectRoute';
import useGetMonitoringByIdInbox from '@api/change-monitoring-inbox/useGetMonitoringById';
import useGetRunByIdInbox from '@api/change-monitoring-inbox/useGetRunByIdInbox';

const Home = React.lazy(() => import('@pages/Home'));
const Test = React.lazy(() => import('@pages/Test'));
const Management = React.lazy(() => import('@pages/Narrative/Menagement/Management'));
const ApplicationDetail = React.lazy(
	() => import('@pages/Narrative/ApplicationDetail/ApplicationDetail')
);
const ReviewNarrative = React.lazy(
	() => import('@pages/Narrative/ReviewNarrative/ReviewNarrative')
);
const Review = React.lazy(() => import('@pages/Narrative/Review/Review'));
const ReviewDetail = React.lazy(
	() => import('@pages/Narrative/ReviewDetail/ReviewDetail')
);
const AdminPanel = React.lazy(
	() => import('@pages/Administration/AdminPanel/AdminPanel')
);
const RoleAssignment = React.lazy(
	() => import('@pages/Administration/RoleAssignment/RoleAssignment')
);
const ApplicationsVisibility = React.lazy(
	() => import('@pages/Administration/ApplicationVisibility/ApplicationsVisibility')
);
const Procedures = React.lazy(
	() => import('@pages/Administration/Procedures/Procedures')
);
const NewRevalidation = React.lazy(
	() => import('@pages/UserRevalidation/NewRevalidation/NewRevalidation')
);
const NewRevalidationDetail = React.lazy(
	() => import('@pages/UserRevalidation/NewRevalidationDetail/NewRevalidationDetail')
);
const RevalidationsOngoing = React.lazy(
	() => import('@pages/UserRevalidation/RevalidationOngoing/RevalidationsOngoing')
);
const CampaignDetail = React.lazy(
	() => import('@pages/UserRevalidation/CampaignDetail/CampaignDetail')
);
const UserRevalidationDashboard = React.lazy(
	() =>
		import('@pages/UserRevalidation/UserRevalidationDashboard/UserRevalidationDashboard')
);
const UserRevalidationDetails = React.lazy(
	() => import('@pages/UserRevalidation/UserRevalidationDetails/UserRevalidationDetails')
);
const NewEvidenceRequestDashboard = React.lazy(
	() =>
		import(
			'@pages/EvidenceRequest/NewEvidenceRequestDashboard/NewEvidenceRequestDashboard'
		)
);
const NewEvidenceRequest = React.lazy(
	() => import('@pages/EvidenceRequest/NewEvidenceRequest/NewEvidenceRequest')
);
const StartedEvidenceRequestDashboard = React.lazy(
	() =>
		import(
			'@pages/EvidenceRequest/StartedEvidenceRequestDashboard/StartedEvidenceRequestDashboard'
		)
);
const ActionEvidenceRequestDashboard = React.lazy(
	() =>
		import(
			'@pages/EvidenceRequest/ActionEvidenceRequestDashboard/ActionEvidenceRequestDashboard'
		)
);
const NewMonitoring = React.lazy(
	() => import('@pages/ChangeMonitoring/NewMonitoringDashboard/NewMonitoring')
);
const MonitoringDraftDetails = React.lazy(
	() => import('@pages/ChangeMonitoring/MonitoringDraftDetails/MonitoringDraftDetails')
);
const MonitoringDashboard = React.lazy(
	() => import('@pages/ChangeMonitoring/MonitoringDashboard/MonitoringDashboard')
);
const MonitoringDetails = React.lazy(
	() => import('@pages/ChangeMonitoring/MonitoringDetails/MonitoringDetails')
);
const MonitoringRunDetails = React.lazy(
	() => import('@pages/ChangeMonitoring/MonitoringRunDetails/MonitoringRunDetails')
);
const ChangeMonitoringInbox = React.lazy(
	() => import('@pages/ChangeMonitoring/ChangeMonitoringInbox/ChangeMonitoringInbox')
);
const ActionEvidenceRequest = React.lazy(
	() => import('@pages/EvidenceRequest/ActionEvidenceRequest/ActionEvidenceRequest')
);

const StartedEvidenceRequest = React.lazy(
	() => import('@pages/EvidenceRequest/StartedEvidenceRequest/StartedEvidenceRequest')
);

const DocumentTemplates = React.lazy(
	() => import('@pages/Administration/DocumentTemplates/DocumentTemplates')
);
const AuthenticatedRoutes = () => {
	const {
		canSeeNarrativeManagement,
		canReviewNarrative,
		canReview,
		canAdmin,
		canNarrativeAdmin,
		canUserAdmin,
		canReviewUser,
		canRevalidateUser,
		canCreateRequest,
		canWorkflowApprover,
		canCreateMonitoring,
		canDocumentAdmin
	} = usePolicyStore();
	return (
		<>
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav relative h-full overflow-auto' id='main'>
				<ErrorBoundary>
					<Suspense fallback={<PageSkeleton />}>
						<Routes>
							<Route path='home' element={<Home />} />

							<Route path='management'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canSeeNarrativeManagement}>
											<Management />
										</ProtectRoute>
									}
								/>
								<Route
									path=':appId'
									element={
										<ProtectRoute canNavigate={canSeeNarrativeManagement}>
											<ApplicationDetail />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route
								path='review'
								element={
									<ProtectRoute canNavigate={canReviewNarrative}>
										<Review />
									</ProtectRoute>
								}
							/>

							<Route path='review-narrative'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canReview}>
											<ReviewNarrative />
										</ProtectRoute>
									}
								/>
								<Route
									path=':appId'
									element={
										<ProtectRoute canNavigate={canReview}>
											<ReviewDetail />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='user-revalidation'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canReviewUser}>
											<UserRevalidationDashboard />
										</ProtectRoute>
									}
								/>
								<Route
									path=':campaignId'
									element={
										<ProtectRoute canNavigate={canReview || canWorkflowApprover}>
											<UserRevalidationDetails />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='new-revalidation'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canRevalidateUser}>
											<NewRevalidation />
										</ProtectRoute>
									}
								/>
								<Route
									path=':campaignId'
									element={
										<ProtectRoute canNavigate={canRevalidateUser}>
											<NewRevalidationDetail />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='revalidations-ongoing'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canRevalidateUser}>
											<RevalidationsOngoing />
										</ProtectRoute>
									}
								/>
								<Route
									path=':campaignId'
									element={
										<ProtectRoute canNavigate={canRevalidateUser}>
											<CampaignDetail />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='admin'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canAdmin}>
											<AdminPanel />
										</ProtectRoute>
									}
								/>
								<Route
									path='role-assignment'
									element={
										<ProtectRoute canNavigate={canUserAdmin}>
											<RoleAssignment />
										</ProtectRoute>
									}
								/>
								<Route
									path='applications-visibility'
									element={
										<ProtectRoute canNavigate={canUserAdmin}>
											<ApplicationsVisibility />
										</ProtectRoute>
									}
								/>
								<Route
									path='procedures'
									element={
										<ProtectRoute canNavigate={canNarrativeAdmin}>
											<Procedures />
										</ProtectRoute>
									}
								/>
								<Route
									path='document-templates'
									element={
										<ProtectRoute canNavigate={canDocumentAdmin}>
											<DocumentTemplates />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='new-evidence-request'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canCreateRequest}>
											<NewEvidenceRequestDashboard />
										</ProtectRoute>
									}
								/>
								<Route
									path=':requestId'
									element={
										<ProtectRoute canNavigate={canCreateRequest}>
											<NewEvidenceRequest />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='started-evidence-request'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canCreateRequest}>
											<StartedEvidenceRequestDashboard />
										</ProtectRoute>
									}
								/>
								<Route
									path=':requestId'
									element={
										<ProtectRoute canNavigate={canCreateRequest}>
											<StartedEvidenceRequest />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='evidence-request-action'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canReview}>
											<ActionEvidenceRequestDashboard />
										</ProtectRoute>
									}
								/>
								<Route
									path=':requestId'
									element={
										<ProtectRoute canNavigate={canReview}>
											<ActionEvidenceRequest />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='new-monitoring'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canCreateMonitoring}>
											<NewMonitoring />
										</ProtectRoute>
									}
								/>
								<Route
									path=':monitoringDraftId'
									element={
										<ProtectRoute canNavigate={canCreateMonitoring}>
											<MonitoringDraftDetails />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='monitoring-dashboard'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canCreateMonitoring}>
											<MonitoringDashboard />
										</ProtectRoute>
									}
								/>
								<Route path=':monitoringId'>
									<Route
										index
										element={
											<ProtectRoute canNavigate={canCreateMonitoring}>
												<MonitoringDetails />
											</ProtectRoute>
										}
									/>
									<Route
										path=':runId'
										element={
											<ProtectRoute canNavigate={canCreateMonitoring}>
												<MonitoringRunDetails />
											</ProtectRoute>
										}
									/>
								</Route>
							</Route>

							<Route path='change-monitoring'>
								<Route
									index
									element={
										<ProtectRoute canNavigate={canReview}>
											<ChangeMonitoringInbox />
										</ProtectRoute>
									}
								/>
								<Route path=':monitoringId'>
									<Route
										index
										element={
											<ProtectRoute canNavigate={canReview}>
												<MonitoringDetails
													getMonitoringFn={useGetMonitoringByIdInbox}
													isFocalPoint
												/>
											</ProtectRoute>
										}
									/>
									<Route
										path=':runId'
										element={
											<ProtectRoute canNavigate={canReview}>
												<MonitoringRunDetails
													getMonitoringFn={useGetMonitoringByIdInbox}
													getRunFn={useGetRunByIdInbox}
												/>
											</ProtectRoute>
										}
									/>
								</Route>
							</Route>
							<Route path='test' element={<Test />} />
							<Route path='*' element={<Navigate replace to='/404' />} />
						</Routes>
					</Suspense>
				</ErrorBoundary>
			</Content>
		</>
	);
};
export default AuthenticatedRoutes;
