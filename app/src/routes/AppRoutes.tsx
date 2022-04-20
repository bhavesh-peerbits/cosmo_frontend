import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoading from '@components/FullScreenLoading';
import DelayedMount from '@components/DelayedMount';

const Login = React.lazy(() => import('@pages/Login'));
const Forbidden = React.lazy(() => import('@pages/Forbidden'));
const Unauthorized = React.lazy(() => import('@pages/Unauthorized'));
const NotFound = React.lazy(() => import('@pages/NotFound'));

const Authenticated = React.lazy(() => import('@routes/Authenticated'));
const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));

const AppRoutes = () => {
	return (
		<Suspense
			fallback={
				<DelayedMount delay={100}>
					<FullScreenLoading />
				</DelayedMount>
			}
		>
			<Routes>
				<Route index element={<Login />} />
				<Route path='/forbidden' element={<Forbidden />} />
				<Route path='/unauthorized' element={<Unauthorized />} />
				<Route path='/404' element={<NotFound />} />
				<Route
					path='*'
					element={
						<Authenticated>
							<AuthenticatedRoutes />
						</Authenticated>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
