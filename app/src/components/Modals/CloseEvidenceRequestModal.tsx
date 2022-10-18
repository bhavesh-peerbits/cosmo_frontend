import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const CloseEvidenceRequestModal = ({ isOpen, setIsOpen }: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const [pubComment, setPubComment] = useState('');
	// const { mutateAsync: mutateClose } = useCloseEvidence();
	const cleanUp = () => {
		setIsOpen(false);
	};
	// const handleCloseEvidence = useCallback(
	// 	(selection: string[]) => {
	// 		return mutateClose({
	// 			id: +`${data?.id}`,
	// 			userIds: selection
	// 		}).then(() => setIsCollaboratorsOpen(false));
	// 	},
	// 	[data?.id, mutateCollaborators]
	// );

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp} preventCloseOnClickOutside>
			<ModalHeader title={t('evidenceRequest:close-request')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('evidenceRequest:confirm-close')}</span>
				{/* <ModalError isError={isError} error={error as ApiError} /> */}
				<div>
					<TextArea
						labelText='Public Comment'
						cols={50}
						rows={4}
						id='public-comment-close'
						onChange={e => setPubComment(e.currentTarget.value)}
					/>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger'>{t('evidenceRequest:close')}</Button>
			</ModalFooter>
			{pubComment}
		</ComposedModal>
	);
};

export default CloseEvidenceRequestModal;
