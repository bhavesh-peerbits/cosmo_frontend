import { Content, HeaderContainer, Theme } from '@carbon/react';
import 'style/app.scss';
import useGetExample from '@api/useGetExample';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import uiStore from '@store/ui/uiStore';
import Home from '@pages/Home';
import Header from '@components/Header';

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
			<HeaderContainer render={Header} />
			<Content className='container-w-sidenav bg-primary h-full overflow-auto'>
				<ErrorBoundary>
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
				</ErrorBoundary>
			</Content>
		</Theme>
	);
};

export default App;
