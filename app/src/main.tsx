import { createRoot } from 'react-dom/client';
import './style/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import initSentry from '@error/initSentry';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './i18n';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';

const MAX_RETRIES = 3;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: MAX_RETRIES,
			suspense: true
		}
	}
});
initSentry();

const container = document.querySelector('#root') as HTMLElement;
const root = createRoot(container);

root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<RecoilRoot>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</RecoilRoot>
		</BrowserRouter>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
