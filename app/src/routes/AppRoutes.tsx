import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoading from '@components/FullScreenLoading';
import DelayedMount from '@components/DelayedMount';
import Forbidden from '@pages/Forbidden';
import Unauthorized from '@pages/Unauthorized';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';

const NewLogin = React.lazy(() => import('@pages/NewLogin'));
const Authenticated = React.lazy(() => import('@routes/Authenticated'));
const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));
const Logout = React.lazy(() => import('@pages/Logout'));

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
				<Route path='/newlogin' element={<NewLogin />} />
				<Route path='/logout' element={<Logout />} />
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
