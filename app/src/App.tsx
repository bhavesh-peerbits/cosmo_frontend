import 'style/app.scss';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { useRecoilValue } from 'recoil';
import uiStore from '@store/ui/uiStore';
import AppRoutes from '@routes/AppRoutes';
import Theme from '@components/Theme';

const App = () => {
	const { theme } = useRecoilValue(uiStore);
	return (
		<Theme theme={theme}>
			<ErrorBoundary>
				<AppRoutes />
			</ErrorBoundary>
		</Theme>
	);
};

export default App;
