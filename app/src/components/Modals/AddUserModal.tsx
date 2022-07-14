import useGetUsers from '@api/user/useGetUsers';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	Grid,
	ModalFooter,
	Button,
	Column,
	TextInput,
	MultiSelect,
	Form
} from '@carbon/react';
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
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('add-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>
					{t('body-add', { action: `"${t('add-user')}"` })}
				</span>
			</ModalHeader>

			<ModalBody hasForm>
				<Form>
					<Grid fullWidth className='h-full'>
						<Column lg={8} md={4} sm={4} className='mb-5'>
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
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5'>
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
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5'>
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
										!existingUsername.includes(username.toLowerCase()) || 'exists'
								})}
							/>
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5'>
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
										!existingEmail.includes(email.toLowerCase()) || 'exist'
								})}
							/>
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5 h-full'>
							<MultiSelect
								id='roles'
								titleText={tHome('roles')}
								label={tUser('select-roles')}
								items={roles}
								itemToString={item => item} // TODO fix layout
							/>
						</Column>
					</Grid>
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
