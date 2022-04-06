import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import Header from '@components/Header';
import Fade from '@components/Fade';
import Centered from '@components/Centered';

const Home = React.lazy(() => import('@pages/Home'));
const Logout = React.lazy(() => import('@pages/Logout'));
const Test = React.lazy(() => import('@pages/Test'));

const AuthenticatedRoutes = () => {
	return (
		<Suspense
			fallback={
				<Fade>
					<Centered>LOADING</Centered>
				</Fade>
			}
		>
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav bg-primary h-full overflow-auto'>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/test' element={<Test />} />
					<Route path='*' element={<div>NOT FOUND</div>} />
				</Routes>
			</Content>
		</Suspense>
	);
};
export default AuthenticatedRoutes;
