import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import '@style/loading.scss';
import Header from '@components/Header';
import ErrorBoundary from '@error/components/ErrorBoundary';
import PageSkeleton from '@components/PageSkeleton';

const Home = React.lazy(() => import('@pages/Home'));
const Logout = React.lazy(() => import('@pages/Logout'));
const Test = React.lazy(() => import('@pages/Test'));
const Management = React.lazy(() => import('@pages/Management'));
const ApplicationDetail = React.lazy(() => import('@pages/ApplicationDetail'));

const AuthenticatedRoutes = () => {
	return (
		<>
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav relative h-full overflow-auto bg-layer-1'>
				<ErrorBoundary>
					<Suspense fallback={<PageSkeleton />}>
						<Routes>
							<Route path='loading' element={<PageSkeleton />} />
							<Route path='home' element={<Home />} />
							<Route path='management'>
								<Route index element={<Management />} />
								<Route path=':appId' element={<ApplicationDetail />} />
							</Route>

							<Route path='logout' element={<Logout />} />
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
