import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	InlineNotification
} from '@carbon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import Run from '@model/Run';
import useCloseCompletedRun from '@api/change-monitoring-analyst/useCloseCompletedRun';
import ApiError from '@api/ApiError';

type CompleteRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
	run: Run;
	monitoringName: string;
};

const CompleteRunModal = ({
	isOpen,
	setIsOpen,
	run,
	monitoringName
}: CompleteRunProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'runDetails']);
	const { monitoringId = '' } = useParams();
	const { mutate, isError, error, isLoading, reset } = useCloseCompletedRun();

	const cleanUp = () => {
		setIsOpen('');
		reset();
	};

	const closeRun = () => {
		return mutate(
			{ runId: run.id },
			{
				onSuccess: () => {
					cleanUp();
					navigate(`/monitoring-dashboard/${monitoringId}`);
				}
			}
		);
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={`${monitoringName} - RUN ${run.orderNumber}`}
				title={t('runDetails:complete-run')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('runDetails:complete-run-body', { number: 5 })}`}</span>
				{isError && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					</div>
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button onClick={() => closeRun()} disabled={isLoading}>
					{t('runDetails:complete-and-close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CompleteRunModal;
