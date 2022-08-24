import Fade from '@components/Fade';
import { InlineLoading } from '@carbon/react';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('home');
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
						description={
							isLoading ? `${t('save-data')}...` : `${error?.message || t('saved')}`
						}
						status={getInlineLoadingStatus()}
					/>
				</Fade>
			)}
		</div>
	);
};

export default InlineLoadingStatus;
