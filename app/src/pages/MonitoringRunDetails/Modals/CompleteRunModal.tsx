import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

type CompleteRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
};

const CompleteRunModal = ({ isOpen, setIsOpen }: CompleteRunProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'runDetails']);
	const { monitoringId = '' } = useParams();

	const cleanUp = () => {
		setIsOpen('');
	};

	// TODO Fix number in modal body

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label='Monitoring Name - Run N'
				title={t('runDetails:complete-run')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('runDetails:complete-run-body', { number: 5 })}`}</span>
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
				<Button onClick={() => navigate(`/monitoring-dashboard/${monitoringId}`)}>
					{t('runDetails:complete-and-close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CompleteRunModal;
