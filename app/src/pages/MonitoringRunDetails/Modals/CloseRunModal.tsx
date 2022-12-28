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

type CloseRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	id: string;
};

const CloseRunModal = ({ isOpen, setIsOpen, id }: CloseRunProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'runDetails']);
	const { monitoringId = '' } = useParams();

	const cleanUp = () => {
		setIsOpen(false);
	};

	// TODO Fix number in modal body

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('runDetails:confirm-run-closure')} closeModal={cleanUp} />
			<ModalBody>
				<span>{`${t('runDetails:confirm-run-closure-body', { number: id })}`}</span>
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
				<Button
					kind='danger'
					onClick={() => navigate(`/monitoring-dashboard/${monitoringId}`)}
				>
					{t('modals:close')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CloseRunModal;
