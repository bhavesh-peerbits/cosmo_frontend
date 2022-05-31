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

const AuthenticatedRoutes = () => {
	const { canSeeNarrativeManagement, canReviewNarrative, canReview } = usePolicyStore();
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
