import Fade from '@components/Fade';
import { InlineLoading } from '@carbon/react';
import ApiError from '@api/ApiError';

interface InlineLoadingStatusProps {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error?: ApiError;
}

const InlineLoadingStatus = ({
	isLoading,
	isError,
	isSuccess,
	error
}: InlineLoadingStatusProps) => {
	const getInlineLoadingStatus = () => {
		if (isLoading) {
			return 'active';
		}
		if (isError) {
			return 'error';
		}
		if (isSuccess) {
			return 'finished';
		}
		return 'inactive';
	};

	return (
		<div>
			{(isLoading || isError || isSuccess) && (
				<Fade>
					<InlineLoading
						description={isLoading ? 'Save data...' : `${error?.message || 'Saved'}`}
						status={getInlineLoadingStatus()}
					/>
				</Fade>
			)}
		</div>
	);
};

export default InlineLoadingStatus;
