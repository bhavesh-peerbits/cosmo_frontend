import 'style/app.scss';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { useRecoilValue } from 'recoil';
import uiStore from '@store/ui/uiStore';
import { Theme } from '@carbon/react';
import AppRoutes from '@routes/AppRoutes';

const App = () => {
	const { theme } = useRecoilValue(uiStore);
	return (
		<Theme theme={theme} className='h-fit'>
			<ErrorBoundary>
				<AppRoutes />
			</ErrorBoundary>
		</Theme>
	);
};

export default App;
