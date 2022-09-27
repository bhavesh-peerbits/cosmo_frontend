import {
	Button,
	ComposedModal,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import { startOfTomorrow } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type SendRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type FormData = {
	dueDate: Date;
};

const SendRequestModal = ({ isOpen, setIsOpen }: SendRequestModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest', 'userRevalidation']);
	// TODO Inserire la navigazione alla pagina di ongoing una volta inviata la richiesta
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
						{/* {isError && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(error as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						)} // TODO rimuovere quando endpoint pronti */}
					</FullWidthColumn>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button disabled={!isValid}>
					{t('evidenceRequest:send-request')}
					{/* {isLoading ? <InlineLoading /> : ''} // TODO Rimuovere quando endpoint pronti */}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default SendRequestModal;
