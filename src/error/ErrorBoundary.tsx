import { ReactNode } from 'react';
import {
	Modal,
	TextInput,
	Accordion,
	AccordionItem,
	CodeSnippet,
	Layer,
	TextArea
} from '@carbon/react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ExceptionlessErrorBoundary } from '@exceptionless/react';

interface Props {
	children: ReactNode;
}

const sentryDSN = import.meta.env.COSMO_SENTRY_DSN;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const sendToSentry = async () => {
		if (sentryDSN) {
			// TODO from store
			const eventId = '2698b50fbf5348bb8c76216c44420bff';
			const url = sentryDSN.replace(/:\/\/.*@/, '://').slice(0, -2);
			const endpoint = `${url}/api/embed/error-page/?dsn=${sentryDSN}&eventId=${eventId}`;
			const body = new FormData();
			body.append('name', 'TEST');
			body.append('email', 'test@test.com');
			body.append('comments', 'comments');

			await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				body
			});
		}
		window.location.reload();
	};
	return (
		<ExceptionlessErrorBoundary>
			<Modal
				open
				modalHeading='Application error'
				modalLabel='Something Unexpected Happened'
				primaryButtonText={sentryDSN ? 'Send' : 'Reload'}
				preventCloseOnClickOutside
				shouldSubmitOnEnter
				onRequestClose={() => resetErrorBoundary()}
				onRequestSubmit={() => sendToSentry()}
			>
				<div className='space-y-spacing-5'>
					<span className='mb-spacing-5'>
						<p>Sorry, an unrecoverable error occurred.</p>
						<p> Please try reloading the page, it may have been a temporary glitch.</p>
					</span>
					<Accordion>
						<AccordionItem title='Details'>
							<div className='space-y-spacing-2'>
								<CodeSnippet type='inline'>{error.message}</CodeSnippet>
								<Layer>
									<CodeSnippet type='multi'>{error.stack}</CodeSnippet>
								</Layer>
							</div>
						</AccordionItem>
					</Accordion>
					{sentryDSN && (
						<>
							<p className='pt-spacing-5'>
								If you like to help, tell us what happened below.
							</p>
							<div className='space-y-spacing-3'>
								<TextInput
									data-modal-primary-focus
									labelText='Name'
									placeholder='John Doe'
									id='text-name'
								/>
								<TextInput
									labelText='Email'
									placeholder='john-doe@mail.com'
									id='text-mail'
									type='email'
								/>
								<TextArea
									labelText='What happened?'
									helperText='Describe here the problem'
									cols={50}
									rows={4}
									id='text-description'
								/>
							</div>
						</>
					)}
				</div>
			</Modal>
		</ExceptionlessErrorBoundary>
	);
};

const ErrorBoundary = ({ children }: Props) => (
	<ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
);
export default ErrorBoundary;
