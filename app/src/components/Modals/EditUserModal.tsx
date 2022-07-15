import useGetUsers from '@api/user/useGetUsers';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Column,
	Grid,
	TextInput,
	MultiSelect
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type EditUserModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	user: string[];
};

const EditUserModal = ({ isOpen, setIsOpen, user }: EditUserModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tHome } = useTranslation('home');
	const { t: tUser } = useTranslation('userAdmin');
	const { data } = useGetUsers();
	const emailIndex = user.indexOf(
		user.filter(attribute => attribute.includes('@')).toString()
	);
	const userToEdit = data?.filter(u => u.email === user[emailIndex]).flat();
	const roles = userToEdit ? userToEdit[0]?.roles.map(role => role.toString()) : [''];
	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('edit-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>{t('body-edit')}</span>
			</ModalHeader>
			<ModalBody>
				<Grid fullWidth>
					<Column lg={6} md={4} sm={4} className='mb-5'>
						<TextInput
							readOnly
							id='name'
							labelText={`${t('user')}`}
							value={userToEdit ? userToEdit[0].displayName : ''}
							className='w-full'
						/>
					</Column>
					<Column lg={6} md={4} sm={4} className='mb-5'>
						<TextInput
							readOnly
							id='email-address'
							labelText={t('label-email')}
							value={userToEdit ? userToEdit[0].email : ''}
							className='w-full grow-0'
						/>
					</Column>
					<Column lg={6} md={4} sm={4}>
						<MultiSelect
							id='roles'
							titleText={tHome('roles')}
							label={tUser('select-roles')}
							items={roles}
							itemToString={item => item} // TODO fix layout
						/>
					</Column>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='primary'>{t('edit')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default EditUserModal;