import ApiError from '@api/ApiError';
import useAddUser from '@api/user-admin/useAddUser';
import useGetUsers from '@api/user/useGetUsers';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Form,
	Checkbox,
	InlineNotification
} from '@carbon/react';
import { UserDtoRolesEnum } from 'cosmo-api/src/v1';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface AddUserFormData {
	name: string;
	surname: string;
	email: string;
	username: string;
	roles: string[];
}

type AddUserModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};
const AddUserModal = ({ isOpen, setIsOpen }: AddUserModalProps) => {
	const { data: users = [] } = useGetUsers();
	const { t } = useTranslation('modals');
	const { t: tHome } = useTranslation('home');
	const { t: tUser } = useTranslation('userAdmin');
	const existingUsername = users.map(user => user.username);
	const existingEmail = users.map(user => user.email?.toLocaleLowerCase());
	const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
	const { mutate, isError, error } = useAddUser();
	const {
		register,
		reset,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<AddUserFormData>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			username: '',
			roles: []
		}
	});

	const roles = [
		'USER_ADMIN',
		'NARRATIVE_ADMIN',
		'NARRATIVE_ANALYST',
		'REVALIDATION_ANALYST',
		'REVIEWER',
		'REVIEWER_COLLABORATOR',
		'USER_UNKNOWN'
	];
	const toStartCase = (r: string) => {
		return r === 'USER_UNKNOWN'
			? 'Guest'
			: r
					.replace('_', ' ')
					.toLowerCase()
					.split(' ')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');
	};

	const cleanUp = () => {
		setIsOpen(false);
		reset();
		setSelectedRoles([]);
	};

	const addUser = (data: AddUserFormData) => {
		return mutate(
			{
				userData: {
					username: data.username,
					name: data.name,
					surname: data.surname,
					email: data.email,
					inactive: false,
					roles: selectedRoles as UserDtoRolesEnum[]
				}
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<Form onSubmit={handleSubmit(addUser)}>
				<ModalHeader title={t('add-user')} closeModal={cleanUp}>
					<span className='text-text-secondary text-body-1'>
						{t('body-add', { action: `"${t('add-user')}"` })}
					</span>
				</ModalHeader>
				<ModalBody hasForm>
					<div className='flex space-x-5'>
						<div className='w-1/2 space-y-5'>
							<TextInput
								id='user-name'
								placeholder={tUser('placeholder-name')}
								labelText={`${tUser('name')} *`}
								{...register('name', {
									required: {
										value: true,
										message: t('field-required')
									}
								})}
							/>
							<TextInput
								id='user-surname'
								placeholder={tUser('placeholder-surname')}
								labelText={`${tUser('surname')} *`}
								{...register('surname', {
									required: {
										value: true,
										message: t('field-required')
									}
								})}
							/>
							<TextInput
								id='username'
								labelText='Username *'
								placeholder='Username'
								invalid={Boolean(errors.username)}
								invalidText={errors.username?.message}
								{...register('username', {
									required: {
										value: true,
										message: t('field-required')
									},
									validate: username =>
										!existingUsername.includes(username.toLowerCase()) ||
										t('exists', { value: 'Username' })
								})}
							/>
							<TextInput
								id='email'
								labelText='Email *'
								placeholder='email@email.com'
								invalid={Boolean(errors.email)}
								invalidText={errors.email?.message}
								{...register('email', {
									required: {
										value: true,
										message: t('field-required')
									},
									validate: email =>
										!existingEmail.includes(email.toLowerCase()) ||
										t('exists', { value: 'Email' })
								})}
							/>
						</div>
						<div className='w-1/2'>
							<p className='mb-3 text-text-secondary text-label-1'>{tHome('roles')} *</p>
							{roles.map(role => (
								<Checkbox
									labelText={toStartCase(role)}
									id={`${role}`}
									onChange={(e, { id, checked }) =>
										!checked
											? setSelectedRoles(selectedRoles.filter(r => r !== id))
											: setSelectedRoles(old => [...old, id])
									}
								/>
							))}
						</div>
					</div>
					{isError && (
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
					)}
				</ModalBody>

				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('cancel')}
					</Button>
					<Button
						kind='primary'
						type='submit'
						disabled={!isValid || selectedRoles.length === 0}
					>
						{t('add-user')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default AddUserModal;
