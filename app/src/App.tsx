import 'style/app.scss';
import useGetExample from '@api/useGetExample';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import uiStore from '@store/ui/uiStore';
import { Content, HeaderContainer, Theme } from '@carbon/react';
import Header from '@components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Test = () => {
	const { data } = useGetExample();
	const [error, setError] = useState(false);
	setTimeout(() => {
		setError(true);
	}, 2000);
	useEffect(() => {
		if (error) {
			throw new Error('Test Error');
		}
	}, [error]);
	return <div>{JSON.stringify(data)}</div>;
};

const App = () => {
	const { theme } = useRecoilValue(uiStore);
	return (
		<Theme theme={theme} className='h-full overflow-hidden'>
			<ErrorBoundary>
				{/* <Login /> */}
				<HeaderContainer render={Header} />
				<Content className='container-w-sidenav bg-primary h-full overflow-auto'>
					<Routes>
						<Route index element={<Home />} />
						<Route
							path='/test'
							element={
								<Suspense fallback='LOADING'>
									<Test />
								</Suspense>
							}
						/>
						<Route path='*' element={<div>Not found</div>} />
					</Routes>
				</Content>
			</ErrorBoundary>
		</Theme>
	);
};

export default App;
