import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import '@style/loading.scss';
import Header from '@components/Header';
import ErrorBoundary from '@error/components/ErrorBoundary';
import PageSkeleton from '@components/PageSkeleton';
import usePolicyStore from '@hooks/usePolicyStore';
import ProtectRoute from '@routes/ProtectRoute';

const Home = React.lazy(() => import('@pages/Home'));
const Test = React.lazy(() => import('@pages/Test'));
const Management = React.lazy(() => import('@pages/Management'));
const ApplicationDetail = React.lazy(() => import('@pages/ApplicationDetail'));
const ReviewNarrative = React.lazy(() => import('@pages/ReviewNarrative'));
const Review = React.lazy(() => import('@pages/Review'));
const ReviewDetail = React.lazy(() => import('@pages/ReviewDetail'));
const AdminPanel = React.lazy(() => import('@pages/AdminPanel'));
const RoleAssignment = React.lazy(() => import('@pages/RoleAssignment'));
const ApplicationsVisibility = React.lazy(() => import('@pages/ApplicationsVisibility'));
const Procedures = React.lazy(() => import('@pages/Procedures'));
const NewRevalidation = React.lazy(() => import('@pages/NewRevalidation'));
const NewRevalidationDetail = React.lazy(() => import('@pages/NewRevalidationDetail'));
const RevalidationsOngoing = React.lazy(() => import('@pages/RevalidationsOngoing'));
const CampaignDetail = React.lazy(() => import('@pages/CampaignDetail'));
const UserRevalidationDashboard = React.lazy(
	() => import('@pages/UserRevalidationDashboard')
);
const UserRevalidationDetails = React.lazy(
	() => import('@pages/UserRevalidationDetails')
);
const NewEvidenceRequest = React.lazy(() => import('@pages/NewEvidenceRequest'));

const AuthenticatedRoutes = () => {
	const {
		canSeeNarrativeManagement,
		canReviewNarrative,
		canReview,
		canAdmin,
		canNarrativeAdmin,
		canUserAdmin,
		canReviewUser
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
										<ProtectRoute canNavigate={canReview}>
											<UserRevalidationDetails />
										</ProtectRoute>
									}
								/>
							</Route>

							<Route path='new-revalidation'>
								<Route index element={<NewRevalidation />} />
								<Route path=':campaignId' element={<NewRevalidationDetail />} />
							</Route>

							<Route path='revalidations-ongoing'>
								<Route index element={<RevalidationsOngoing />} />
								<Route path=':campaignId' element={<CampaignDetail />} />
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
							</Route>

							<Route path='new-evidence-request'>
								<Route index element={<NewEvidenceRequest />} />
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
