import ApiError from '@api/ApiError';
import useDeleteMonitoringDraft from '@api/change-monitoring-analyst/useDeleteMonitoringDraft';
import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	InlineNotification
} from '@carbon/react';
import MonitoringDraft from '@model/ChangeMonitoring/MonitoringDraft';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	draft: MonitoringDraft;
};

const DeleteMonitoringDraftModal = ({ isOpen, setIsOpen, draft }: DeleteModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'modals']);
	const navigate = useNavigate();
	const { mutate, error, isError, reset } = useDeleteMonitoringDraft();

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const deleteDraft = () => {
		return mutate(
			{
				draftId: draft.id
			},
			{
				onSuccess: () => {
					cleanUp();
					navigate('/new-monitoring');
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={draft.name}
				title={t('modals:confirm-delete')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{t('changeMonitoring:confirm-delete', { draft: draft.name })}</span>
				{isError && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(error as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger' onClick={deleteDraft}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteMonitoringDraftModal;
