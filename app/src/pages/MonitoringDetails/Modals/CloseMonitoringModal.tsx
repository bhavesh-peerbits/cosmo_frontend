import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

type CloseMonitoringProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string | undefined>>;
	id: string;
};

const CloseMonitoringModal = ({ isOpen, setIsOpen, id }: CloseMonitoringProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'monitoringDashboard']);

	const cleanUp = () => {
		setIsOpen('');
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label='Monitoring Name'
				title={t('monitoringDashboard:confirm-close')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('monitoringDashboard:close-monitoring', { name: id })}`}</span>
				{/* {isError && (
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
				)} */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger' onClick={() => navigate('/monitoring-dashboard')}>
					{t('modals:close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CloseMonitoringModal;
