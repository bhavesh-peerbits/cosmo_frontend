import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	Form
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import useCloseEvidence from '@api/evidence-request/useCloseEvidence';
import { useForm } from 'react-hook-form';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { useNavigate } from 'react-router-dom';

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	erId: number;
	stepReq: EvidenceRequestStep;
};

interface CloseEvidenceForm {
	publicComment: string;
	privateComment: string;
}

const CloseEvidenceRequestModal = ({
	erId,
	stepReq,
	isOpen,
	setIsOpen
}: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const navigate = useNavigate();
	const { register, handleSubmit, reset, formState } = useForm<CloseEvidenceForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: stepReq.stepInfo?.publicComment,
			privateComment: stepReq.stepInfo?.privateComment
		}
	});
	const { mutateAsync: mutateClose } = useCloseEvidence();
	const cleanUp = () => {
		setIsOpen(false);
	};
	const handleCloseEvidence = useCallback(
		(data: CloseEvidenceForm) => {
			return mutateClose({
				erId,
				data: {
					id: erId,
					stepInfo: {
						publicComment: data.publicComment,
						privateComment: data.privateComment
					}
				}
			}).then(() => {
				setIsOpen(false);
				navigate('/started-evidence-request');
			});
		},
		[erId, mutateClose, navigate, setIsOpen]
	);
	useEffect(() => {
		reset;
	}, [reset, stepReq]);

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp} preventCloseOnClickOutside>
			<Form>
				<ModalHeader title={t('evidenceRequest:close-request')} closeModal={cleanUp} />
				<ModalBody className='space-y-5'>
					<span className='text-body-long-1'>{t('evidenceRequest:confirm-close')}</span>
					{/* <ModalError isError={isError} error={error as ApiError} /> */}
					<TextArea
						labelText='Public Comment'
						cols={50}
						rows={4}
						{...register('publicComment')}
						id='public-comment-close'
					/>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button
						kind='danger'
						onClick={handleSubmit(handleCloseEvidence)}
						disabled={!formState.isDirty}
					>
						{t('evidenceRequest:close')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};

export default CloseEvidenceRequestModal;
