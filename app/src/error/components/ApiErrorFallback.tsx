import { ActionableNotification } from '@carbon/react';
import ApiError from '@api/ApiError';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

const ApiErrorFallback = ({
	error,
	resetErrorBoundary
}: { error: ApiError } & FallbackProps) => {
	const { t } = useTranslation('errorBoundary');

	return (
		<div className='absolute bottom-5 flex w-full items-center justify-center'>
			<ActionableNotification
				onActionButtonClick={() => {
					resetErrorBoundary();
					error.reload && window.location.reload();
				}}
				inline
				actionButtonLabel={t('retry')}
				kind='error'
				className='items-center space-x-2'
			>
				<div className='flex flex-col'>
					<p className='font-bold'>API Error</p>
					<p>Code {error.status}</p>
					<p>Message: {error.message}</p>
				</div>
			</ActionableNotification>
		</div>
	);
};
export default ApiErrorFallback;
