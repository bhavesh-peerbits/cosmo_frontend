import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import initSentry from '@error/initSentry';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './i18n';

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
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<RecoilRoot>
					<App />
				</RecoilRoot>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
