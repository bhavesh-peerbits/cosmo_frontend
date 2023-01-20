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
import useTerminateRunMonitoring from '@api/change-monitoring/useTerminateRunMonitoring';
import ApiError from '@api/ApiError';

type CloseRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	id: string;
	monitoringName: string;
	runNumber: number;
};

const CloseRunModal = ({
	isOpen,
	setIsOpen,
	id,
	monitoringName,
	runNumber
}: CloseRunProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'runDetails']);
	const { monitoringId = '' } = useParams();
	const { mutate, isError, error } = useTerminateRunMonitoring();
	const cleanUp = () => {
		setIsOpen(false);
	};

	const handleTerminate = () => {
		mutate(
			{ runId: +id },
			{
				onSuccess: () => {
					cleanUp();
					navigate(`/monitoring-dashboard/${monitoringId}`);
				}
			}
		);
	};

	// TODO Fix number in modal body
	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={`${monitoringName} - RUN ${runNumber}`}
				title={t('runDetails:confirm-run-closure')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('runDetails:confirm-run-closure-body', {
					number: runNumber
				})}`}</span>
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
				<Button kind='danger' onClick={handleTerminate}>
					{t('modals:close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CloseRunModal;
