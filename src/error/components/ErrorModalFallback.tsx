import { FallbackProps } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { useQueryErrorResetBoundary } from 'react-query';
import * as Sentry from '@sentry/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getReportDialogEndpoint } from '@sentry/core';
import { ExceptionlessErrorBoundary } from '@exceptionless/react';
import {
	Accordion,
	AccordionItem,
	Button,
	CodeSnippet,
	ComposedModal,
	InlineLoading,
	Layer,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import validator from 'validator';

const sentryDSN = import.meta.env.COSMO_SENTRY_DSN;

type FormData = {
	name: string;
	email: string;
	description: string;
};

const ErrorModalFallback = ({
	error,
	resetErrorBoundary,
	errorId
}: FallbackProps & { errorId: string | undefined }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormData>();
	const { reset } = useQueryErrorResetBoundary();

	const sendToSentry = async ({ name, email, description }: FormData) => {
		if (sentryDSN) {
			try {
				Sentry.captureException(error);
				const endpoint = getReportDialogEndpoint(sentryDSN, { eventId: errorId });
				await fetch(endpoint, {
					mode: 'no-cors',
					method: 'POST',
					headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					},
					body: new URLSearchParams({
						name,
						email,
						comments: description
					})
				});
			} catch (e) {
				Sentry.captureException(e);
			}
		}
		window.location.reload();
	};

	const buttonLabel = sentryDSN ? 'Send' : 'Reload';
	return (
		<ExceptionlessErrorBoundary>
			<ComposedModal open preventCloseOnClickOutside>
				<ModalHeader
					title='Application error'
					label='Something Unexpected Happened'
					closeModal={() => {
						reset();
						resetErrorBoundary();
					}}
				/>
				<ModalBody>
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
										invalid={Boolean(errors.name)}
										invalidText={errors.name?.message}
										data-modal-primary-focus
										labelText='Name'
										placeholder='John Doe'
										id='text-name'
										{...register('name', {
											required: { value: true, message: 'Name is required' }
										})}
									/>
									<TextInput
										invalid={Boolean(errors.email)}
										invalidText={errors.email?.message}
										labelText='Email'
										placeholder='john-doe@mail.com'
										id='text-mail'
										type='email'
										{...register('email', {
											required: { value: true, message: 'Email is required' },
											validate: value => validator.isEmail(value) || 'Email is not valid'
										})}
									/>
									<TextArea
										invalid={Boolean(errors.description)}
										invalidText={errors.description?.message}
										labelText='What happened?'
										helperText='Describe here the problem'
										cols={50}
										rows={4}
										id='text-description'
										maxLength={500}
										{...register('description', {
											required: { value: true, message: 'Description is required' }
										})}
									/>
								</div>
							</>
						)}
					</div>
				</ModalBody>
				<ModalFooter>
					{isSubmitting ? (
						<Button disabled>
							<InlineLoading
								status='active'
								iconDescription='Active loading indicator'
								description='Send data...'
							/>
						</Button>
					) : (
						<Button onClick={handleSubmit(sendToSentry)}>{buttonLabel}</Button>
					)}
				</ModalFooter>
			</ComposedModal>
		</ExceptionlessErrorBoundary>
	);
};

export default ErrorModalFallback;
