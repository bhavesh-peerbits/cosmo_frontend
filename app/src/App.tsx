import 'style/app.scss';
import ErrorBoundary from '@error/components/ErrorBoundary';
import AppRoutes from '@routes/AppRoutes';
import { Theme } from '@carbon/react';
import useUiStore from '@hooks/useUiStore';
import Toast from '@components/Toast';
import PopupNotification from '@components/PopupNotification';
import PreventActionModal from '@components/Modals/PreventActionModal';

const App = () => {
	const { theme } = useUiStore();
	return (
		<Theme theme={theme} className='h-full bg-background' data-floating-menu-container>
			<PopupNotification />
			<ErrorBoundary>
				<AppRoutes />
				<PreventActionModal />
			</ErrorBoundary>
			<Toast />
		</Theme>
	);
};

export default App;
