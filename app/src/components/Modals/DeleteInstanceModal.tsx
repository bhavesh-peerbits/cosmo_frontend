import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Instance from '@model/Instance';

type DeleteInstanceModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	instance: Instance;
};

const DeleteInstanceModal = ({
	isOpen,
	setIsOpen,
	instance
}: DeleteInstanceModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp} className='z-[9999]'>
			<ModalHeader
				title={t('modals:confirm-delete')}
				label={instance.name}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>
					{t('applicationInstances:confirm-instance-delete', { instance: instance.name })}
				</span>
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
				{/* <Button kind='danger' disabled={isLoading} onClick={DeleteInstance}>
					{t('delete')}
				</Button> */}
				<Button kind='danger' onClick={cleanUp}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteInstanceModal;
