import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const MAX_RETRIES = 3;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
	document.querySelector('#root')
);
