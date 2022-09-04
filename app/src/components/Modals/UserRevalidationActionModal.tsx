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

export interface UserRevalidationActionState {
	isOpen: boolean;
	actionSelected: 'Error' | 'Change' | '';
	onSuccess?: ({ description }: { description: string }) => void;
}

type UserRevalidationActionModalProps = {
	isOpen: UserRevalidationActionState;
	setIsOpen: (val: UserRevalidationActionState) => void;
};

const UserRevalidationActionModal = ({
	isOpen,
	setIsOpen
}: UserRevalidationActionModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const {
		register,
		reset,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<RevalidationRequestForm>({
		mode: 'onChange',
		defaultValues: {
			description: ''
		}
	});

	const cleanUp = () => {
		setIsOpen({ isOpen: false, actionSelected: '' });
		reset();
	};

	const onSuccess = ({ description }: RevalidationRequestForm) => {
		isOpen.onSuccess?.({ description });
		cleanUp();
	};

	return (
		<ComposedModal size='sm' open={isOpen.isOpen} onClose={cleanUp}>
			<Form>
				<ModalHeader
					title={
						isOpen.actionSelected === 'Error'
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
				</ModalBody>

				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button
						onClick={handleSubmit(onSuccess)}
						kind='primary'
						type='submit'
						disabled={!isValid}
					>
						{isOpen.actionSelected === 'Error'
							? t('userRevalidation:report-error')
							: t('userRevalidation:send-change-request')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default UserRevalidationActionModal;
