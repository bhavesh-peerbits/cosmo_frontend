import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	Grid,
	ModalFooter,
	Button,
	Column,
	TextInput,
	Select
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type AddUserModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};
const AddUserModal = ({ isOpen, setIsOpen }: AddUserModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tHome } = useTranslation('home');
	const { t: tUser } = useTranslation('userAdmin');
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('edit-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>{t('body-edit')}</span>
			</ModalHeader>
			<ModalBody>
				<Grid fullWidth>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput
							id='user-name'
							labelText={tUser('name')}
							placeholder='Placeholder'
						/>
					</Column>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput
							id='user-surname'
							labelText={tUser('surname')}
							placeholder='Placeholder'
						/>
					</Column>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput id='username' labelText='Username' placeholder='Placeholder' />
					</Column>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput id='email' labelText='Email' placeholder='Placeholder' />
					</Column>

					<Column lg={8} md={4} sm={4} className='mb-5'>
						<Select
							id='roles'
							labelText={tHome('roles')}
							placeholder='Select one or more roles'
						/>
					</Column>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='primary'>{t('add-user')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default AddUserModal;
