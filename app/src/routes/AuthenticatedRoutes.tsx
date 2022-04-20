import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeaderContainer } from '@carbon/react';
import Header from '@components/Header';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import '@style/loading.scss';
import ApplicationContainer from '@components/ApplicationContainer';

const Home = React.lazy(() => import('@pages/Home'));
const Logout = React.lazy(() => import('@pages/Logout'));
const Test = React.lazy(() => import('@pages/Test'));
const Management = React.lazy(() => import('@pages/Management'));

const AuthenticatedRoutes = () => {
	return (
		<Suspense
			fallback={
				<div className='loading-container h-full w-full'>
					<Fade timing='duration-fast-2'>
						<Centered>
							<span className='text-heading-5'>Redirect...</span>
						</Centered>
					</Fade>
				</div>
			}
		>
			<Routes>
				<Route path='/' element={<HeaderContainer render={Header} />}>
					<Route path='/home' element={<Home />} />
					<Route path='/management' element={<Management />} />
					<Route path='/ApplicationName' element={<ApplicationContainer />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/test' element={<Test />} />
					<Route path='*' element={<Navigate replace to='/404' />} />
				</Route>
			</Routes>
		</Suspense>
	);
};
export default AuthenticatedRoutes;
