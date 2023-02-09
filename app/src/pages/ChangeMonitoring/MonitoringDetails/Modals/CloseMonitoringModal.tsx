import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	InlineNotification
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import useTerminateMonitoring from '@api/change-monitoring-analyst/useTerminateMonitoring';
import ApiError from '@api/ApiError';
import Monitoring from '@model/Monitoring';

type CloseMonitoringProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string | undefined>>;
	monitoring: Monitoring;
};

const CloseMonitoringModal = ({
	isOpen,
	setIsOpen,
	monitoring
}: CloseMonitoringProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'monitoringDashboard']);
	const { mutate, isError, error } = useTerminateMonitoring();
	const cleanUp = () => {
		setIsOpen('');
	};

	const handleTerminate = () => {
		mutate(
			{ monitoringId: +monitoring.id },
			{
				onSuccess: () => {
					cleanUp();
					navigate('/monitoring-dashboard');
				}
			}
		);
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={monitoring.name}
				title={t('monitoringDashboard:confirm-close')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('monitoringDashboard:close-monitoring', {
					name: monitoring.name
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
export default CloseMonitoringModal;
