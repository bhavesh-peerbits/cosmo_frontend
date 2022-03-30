import { FallbackProps } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { useQueryErrorResetBoundary } from 'react-query';
import * as Sentry from '@sentry/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getReportDialogEndpoint } from '@sentry/core';
import {
	Button,
	ComposedModal,
	InlineLoading,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import validator from 'validator';
import { ExceptionlessErrorBoundary } from '@exceptionless/react';
import { Trans, useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('errorBoundary');
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

	const buttonLabel = sentryDSN ? t('send') : t('reload');
	return (
		<ExceptionlessErrorBoundary>
			<ComposedModal open preventCloseOnClickOutside>
				<ModalHeader
					title={t('application-error')}
					label={t('error-message')}
					closeModal={() => {
						reset();
						resetErrorBoundary();
					}}
				/>
				<ModalBody>
					<div className='space-y-spacing-5'>
						<span>
							<Trans t={t} i18nKey='error-message-detail'>
								<p>Sorry, an unrecoverable error occurred.</p>
								<p>Please try reloading the page, it may have been a temporary glitch.</p>
							</Trans>
						</span>

						{/* <Accordion> */}
						{/*	<AccordionItem title='Details'> */}
						{/*		<div className='space-y-spacing-2'> */}
						{/*			<CodeSnippet type='inline'>{error.message}</CodeSnippet> */}
						{/*			<Layer> */}
						{/*				<CodeSnippet type='multi'>{error.stack}</CodeSnippet> */}
						{/*			</Layer> */}
						{/*		</div> */}
						{/*	</AccordionItem> */}
						{/* </Accordion> */}
						{sentryDSN && (
							<>
								<p className='pt-spacing-5'>{t('tell-us')}</p>
								<div className='space-y-spacing-3'>
									<TextInput
										invalid={Boolean(errors.name)}
										invalidText={errors.name?.message}
										data-modal-primary-focus
										labelText={t('name')}
										placeholder='John Doe'
										id='text-name'
										{...register('name', {
											required: { value: true, message: t('name-required') }
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
											required: { value: true, message: t('email-required') },
											validate: value => validator.isEmail(value) || t('email-not-valid')
										})}
									/>
									<TextArea
										invalid={Boolean(errors.description)}
										invalidText={errors.description?.message}
										labelText={t('what-happened')}
										helperText={t('describe-problem')}
										cols={50}
										rows={4}
										id='text-description'
										maxLength={500}
										{...register('description', {
											required: { value: true, message: t('description-required') }
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
								description={t('send-data')}
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
