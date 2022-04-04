import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import initExceptionless from '@error/initExceptionless';
import initSentry from '@error/initSentry';
import App from './App';
import './i18n';

const MAX_RETRIES = 3;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES,
			suspense: true
		}
	}
});
initExceptionless();
initSentry();

const container = document.querySelector('#root') as HTMLElement;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<RecoilRoot>
					<App />
				</RecoilRoot>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
