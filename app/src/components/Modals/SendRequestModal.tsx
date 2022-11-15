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
	InlineLoading,
	Form
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { startOfTomorrow } from 'date-fns';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type SendRequestModalProps = {
	request: EvidenceRequestDraft;
};

type FormData = {
	dueDate: Date;
};

const SendRequestModal = ({ request }: SendRequestModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest', 'userRevalidation']);
	const { mutate, isLoading, isError, error } = useSendRequest();
	const [confirmSendInfo, setConfirmSendInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const navigate = useNavigate();
	const {
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			dueDate: undefined
		}
	});

	const cleanUp = () => {
		setConfirmSendInfo(old => ({ ...old, dueDate: undefined, isOpen: false }));
		reset();
	};

	const sendRequest = (data: FormData) => {
		if (confirmSendInfo.isDirty) {
			setConfirmSendInfo(old => ({ ...old, saveUpload: true, dueDate: data.dueDate }));
		} else {
			mutate(
				{ ...request, dueDate: data.dueDate },
				{
					onSuccess: () => {
						navigate('/started-evidence-request');
					}
				}
			);
		}
	};

	useEffect(() => {
		if (confirmSendInfo.uploadSuccess) {
			setConfirmSendInfo(old => ({ ...old, uploadSuccess: false }));
			mutate(
				{
					...request,
					fileLinks: confirmSendInfo.files,
					dueDate: confirmSendInfo.dueDate
				},
				{
					onSuccess: () => {
						navigate('/started-evidence-request');
					}
				}
			);
		}
	}, [
		confirmSendInfo.dueDate,
		confirmSendInfo.files,
		confirmSendInfo.uploadSuccess,
		mutate,
		navigate,
		request,
		setConfirmSendInfo
	]);

	return (
		<Form>
			<ComposedModal
				preventCloseOnClickOutside
				open={confirmSendInfo.isOpen}
				onClose={cleanUp}
				className='z-[9999]'
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
					<Button
						disabled={!isValid || isLoading || confirmSendInfo.isLoading}
						type='submit'
						onClick={handleSubmit(sendRequest)}
					>
						{t('evidenceRequest:send-request')}
						{isLoading ? <InlineLoading /> : ''}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Form>
	);
};
export default SendRequestModal;
