import ApiError from '@api/ApiError';
import { InlineNotification } from '@carbon/react';

interface ModalErrorProps {
	isError: boolean;
	error: ApiError;
}

const ModalError = ({ isError, error }: ModalErrorProps) => {
	return isError ? (
		<div className='mt-5 flex items-center justify-center'>
			<InlineNotification
				kind='error'
				title='Error'
				hideCloseButton
				subtitle={
					(error as ApiError)?.message || 'An error has occurred, please try again later'
				}
			/>
		</div>
	) : null;
};

export default ModalError;
