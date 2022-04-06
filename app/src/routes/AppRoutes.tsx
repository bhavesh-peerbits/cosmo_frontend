import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoading from '@components/FullScreenLoading';
import DelayedMount from '@components/DelayedMount';

const Login = React.lazy(() => import('@pages/Login'));
const Authenticated = React.lazy(() => import('@routes/Authenticated'));
const AuthenticatedRoutes = React.lazy(() => import('@routes/AuthenticatedRoutes'));

const AppRoutes = () => {
	return (
		<Suspense
			fallback={
				<DelayedMount delay={1000}>
					<FullScreenLoading />
				</DelayedMount>
			}
		>
			<Routes>
				<Route index element={<Login />} />
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
