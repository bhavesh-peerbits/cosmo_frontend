import 'style/app.scss';
import ErrorBoundary from '@error/components/ErrorBoundary';
import AppRoutes from '@routes/AppRoutes';
import { Theme } from '@carbon/react';
import useUiStore from '@hooks/useUiStore';
import Toast from '@components/Toast';

const App = () => {
	const { theme } = useUiStore();
	return (
		<Theme theme={theme} className='h-full bg-background' data-floating-menu-container>
			<ErrorBoundary>
				<AppRoutes />
			</ErrorBoundary>
			<Toast />
		</Theme>
	);
};

export default App;
