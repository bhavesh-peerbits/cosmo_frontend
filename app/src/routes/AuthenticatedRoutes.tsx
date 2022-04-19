import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Content, HeaderContainer } from '@carbon/react';
import Header from '@components/Header';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import '@style/loading.scss';

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
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav h-full overflow-auto bg-layer-1 p-[0px]'>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/management' element={<Management />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/test' element={<Test />} />
					<Route path='*' element={<div>NOT FOUND</div>} />
				</Routes>
			</Content>
		</Suspense>
	);
};
export default AuthenticatedRoutes;
