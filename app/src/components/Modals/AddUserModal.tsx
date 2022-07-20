import useGetUsers from '@api/user/useGetUsers';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Form,
	Checkbox
} from '@carbon/react';
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

	const roles = [
		'Admin',
		'Guest',
		'Narrative Analyst',
		'Reviewer',
		'Reviewer Collaborator',
		'User Admin'
	];
	const {
		register,
		reset,
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

	const cleanUp = () => {
		setIsOpen(false);
		reset();
		setSelectedRoles([]);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('add-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>
					{t('body-add', { action: `"${t('add-user')}"` })}
				</span>
			</ModalHeader>
			<ModalBody hasForm>
				<Form>
					<div className='flex space-x-5'>
						<div className='w-1/2 space-y-5'>
							<TextInput
								id='user-name'
								placeholder={tUser('placeholder-name')}
								labelText={`${tUser('name')} *`}
								{...register('name', {
									required: {
										value: true,
										message: 'required'
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
										message: 'required'
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
										message: `required`
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
										message: `required`
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
									labelText={role}
									id={`${role}-add`}
									onChange={(e, { id, checked }) =>
										!checked
											? setSelectedRoles(selectedRoles.filter(r => r !== id))
											: setSelectedRoles(old => [...old, id])
									}
								/>
							))}
						</div>
					</div>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='primary' disabled={!isValid}>
					{t('add-user')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default AddUserModal;
