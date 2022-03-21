import { ReactNode } from 'react';
import { Modal, Select, SelectItem, TextInput } from '@carbon/react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ExceptionlessErrorBoundary } from '@exceptionless/react';

interface Props {
	children: ReactNode;
}

const sentryDSN = import.meta.env.COSMO_SENTRY_DSN;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const sendToSentry = () => {
		if (sentryDSN) {
			// TODO from store
			const eventId = '2698b50fbf5348bb8c76216c44420bff';
			const url = sentryDSN.replace(/:\/\/.*@/, '://').slice(0, -2);
			const endpoint = `${url}/api/embed/error-page/?dsn=${sentryDSN}&eventId=${eventId}`;
			const body = new FormData();
			body.append('name', 'TEST');
			body.append('email', 'test@test.com');
			body.append('comments', 'comments');

			fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				body
			});
		}
	};
	return (
		<ExceptionlessErrorBoundary>
			<Modal
				open
				modalHeading='Add a custom domain'
				modalLabel='Account resources'
				primaryButtonText='Add'
				secondaryButtonText='Cancel'
				onRequestClose={() => {
					sendToSentry();
					resetErrorBoundary();
				}}
			>
				<p style={{ marginBottom: '1rem' }}>
					{error.message}
					Custom domains direct requests for your apps in this Cloud Foundry organization
					to a URL that you own. A custom domain can be a shared domain, a shared
					subdomain, or a shared domain and host.
				</p>
				<TextInput
					data-modal-primary-focus
					id='text-input-1'
					labelText='Domain name'
					placeholder='e.g. github.com'
					style={{ marginBottom: '1rem' }}
				/>
				<Select id='select-1' defaultValue='us-south' labelText='Region'>
					<SelectItem value='us-south' text='US South' />
					<SelectItem value='us-east' text='US East' />
				</Select>
			</Modal>
		</ExceptionlessErrorBoundary>
	);
};

const ErrorBoundary = ({ children }: Props) => (
	<ReactErrorBoundary
		FallbackComponent={ErrorFallback}
		onReset={() => {
			// reset the state of your app so the error doesn't happen again
		}}
	>
		{children}
	</ReactErrorBoundary>
);
export default ErrorBoundary;
