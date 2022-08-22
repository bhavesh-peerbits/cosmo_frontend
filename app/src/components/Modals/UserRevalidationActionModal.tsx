import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	TextArea
} from '@carbon/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RevalidationRequestForm {
	description: string;
}

type UserRevalidationActionModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	actionSelected: string;
};
const UserRevalidationActionModal = ({
	isOpen,
	setIsOpen,
	actionSelected
}: UserRevalidationActionModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const {
		register,
		reset,
		formState: { isValid, errors }
	} = useForm<RevalidationRequestForm>({
		mode: 'onChange',
		defaultValues: {
			description: ''
		}
	});

	const cleanUp = () => {
		setIsOpen(false);
		reset();
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<Form>
				<ModalHeader
					title={
						actionSelected === 'Error'
							? t('userRevalidation:report-error')
							: t('userRevalidation:change-request')
					}
					closeModal={cleanUp}
				>
					<span className='text-text-secondary text-body-1'>{`${t(
						'userRevalidation:enter-info'
					)}.`}</span>
				</ModalHeader>
				<ModalBody hasForm>
					<TextArea
						id='description'
						invalidText={errors.description?.message}
						invalid={Boolean(errors.description)}
						placeholder={t('userRevalidation:description-placeholder')}
						labelText={`${t('modals:description')} *`}
						{...register('description', {
							required: {
								value: true,
								message: t('modals:field-required')
							}
						})}
					/>
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
					<Button kind='primary' type='submit' disabled={!isValid}>
						{actionSelected === 'Error'
							? t('userRevalidation:report-error')
							: t('userRevalidation:send-change-request')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default UserRevalidationActionModal;
