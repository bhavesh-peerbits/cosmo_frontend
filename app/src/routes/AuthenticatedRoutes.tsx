import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import '@style/loading.scss';
import Header from '@components/Header';
import ErrorBoundary from '@error/components/ErrorBoundary';
import PageSkeleton from '@components/PageSkeleton';
import Review from '@pages/Review';
import ReviewDetail from '@pages/ReviewDetail';

const Home = React.lazy(() => import('@pages/Home'));
const Test = React.lazy(() => import('@pages/Test'));
const Management = React.lazy(() => import('@pages/Management'));
const ApplicationDetail = React.lazy(() => import('@pages/ApplicationDetail'));
const ReviewNarrative = React.lazy(() => import('@pages/ReviewNarrative'));

const AuthenticatedRoutes = () => {
	return (
		<>
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav relative h-full overflow-auto' id='main'>
				<ErrorBoundary>
					<Suspense fallback={<PageSkeleton />}>
						<Routes>
							<Route path='home' element={<Home />} />
							<Route path='management'>
								<Route index element={<Management />} />
								<Route path=':appId' element={<ApplicationDetail />} />
							</Route>
							<Route path='review' element={<Review />} />
							<Route path='review-narrative'>
								<Route index element={<ReviewNarrative />} />
								<Route path=':reviewId' element={<ReviewDetail />} />
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
