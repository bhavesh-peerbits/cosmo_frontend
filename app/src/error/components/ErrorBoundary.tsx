import { memo, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import errorIdAtom from '@store/error-boundary/errorIdAtom';
import ApiError from '@api/ApiError';
import ErrorModalFallback from '@error/components/ErrorModalFallback';
import ApiErrorFallback from '@error/components/ApiErrorFallback';
import { QueryErrorResetBoundary } from 'react-query';

interface Props {
	children: ReactNode;
}

const ErrorBoundary = ({ children }: Props) => {
	const errorId = useRecoilValue(errorIdAtom);
	const ErrorFallbackComponent = memo(({ error, resetErrorBoundary }: FallbackProps) =>
		error instanceof ApiError ? (
			<ApiErrorFallback resetErrorBoundary={resetErrorBoundary} error={error} />
		) : (
			<ErrorModalFallback
				error={error}
				resetErrorBoundary={resetErrorBoundary}
				errorId={errorId}
			/>
		)
	);
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ReactErrorBoundary onReset={reset} FallbackComponent={ErrorFallbackComponent}>
					{children}
				</ReactErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
};
export default ErrorBoundary;
