import 'style/app.scss';
import ErrorBoundary from '@error/components/ErrorBoundary';
import AppRoutes from '@routes/AppRoutes';
import { Theme } from '@carbon/react';
import useUiStore from '@hooks/useUiStore';

const App = () => {
	const { theme } = useUiStore();
	return (
		<Theme theme={theme} className='h-full bg-background'>
			<ErrorBoundary>
				<AppRoutes />
			</ErrorBoundary>
		</Theme>
	);
};

export default App;
