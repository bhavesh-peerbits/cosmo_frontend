import ApiError from '@api/ApiError';
import useSendRequest from '@api/evidence-request/useSendRequest';
import {
	Button,
	ComposedModal,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader,
	InlineNotification,
	InlineLoading
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { startOfTomorrow } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type SendRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	request: EvidenceRequestDraft;
};

type FormData = {
	dueDate: Date;
};

const SendRequestModal = ({ isOpen, setIsOpen, request }: SendRequestModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest', 'userRevalidation']);
	const { mutate, isLoading, isError, error } = useSendRequest();
	const navigate = useNavigate();
	const {
		control,
		reset,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			dueDate: undefined
		}
	});

	const cleanUp = () => {
		setIsOpen(false);
		reset();
	};

	const sendRequest = () => {
		mutate(request, {
			onSuccess: () => {
				navigate('/started-evidence-request');
			}
		});
	};

	return (
		<ComposedModal
			preventCloseOnClickOutside
			open={isOpen}
			onClose={cleanUp}
			className='z-[9000]'
			size='xs'
		>
			<ModalHeader title={t('evidenceRequest:send-request')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>
					{`${t('evidenceRequest:send-description')}.`}
				</span>
			</ModalHeader>

			<ModalBody hasForm>
				<Grid>
					<FullWidthColumn>
						<DatePickerWrapper
							control={control}
							name='dueDate'
							label={`${t('userRevalidation:due-date')} *`}
							rules={{
								required: {
									value: true,
									message: `${t('modals:select-date')}`
								}
							}}
							minDate={startOfTomorrow()}
						/>
					</FullWidthColumn>

					<FullWidthColumn>
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
					</FullWidthColumn>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button disabled={!isValid || isLoading} onClick={sendRequest}>
					{t('evidenceRequest:send-request')}
					{isLoading ? <InlineLoading /> : ''}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default SendRequestModal;
