import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

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
