import { ActionableNotification } from '@carbon/react';
import ApiError from '@api/ApiError';
import { FallbackProps } from 'react-error-boundary';

const ApiErrorFallback = ({
	error,
	resetErrorBoundary
}: { error: ApiError } & FallbackProps) => (
	<div className='absolute bottom-spacing-5 w-full'>
		<ActionableNotification
			onActionButtonClick={() => resetErrorBoundary()}
			inline
			actionButtonLabel='Retry'
			kind='error'
			className='items-center space-x-spacing-2'
		>
			<p className='font-bold'>API Error</p>
			<p>Code {error.status}</p>
			<p>Message: {error.message}</p>
		</ActionableNotification>
	</div>
);
export default ApiErrorFallback;
