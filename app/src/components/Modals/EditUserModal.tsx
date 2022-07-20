import useGetUsers from '@api/user/useGetUsers';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Checkbox
} from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type EditUserModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	user: string[];
};

const EditUserModal = ({ isOpen, setIsOpen, user }: EditUserModalProps) => {
	const roles = [
		'Admin',
		'Guest',
		'Narrative Analyst',
		'Reviewer',
		'Reviewer Collaborator',
		'User Admin'
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
	const { t } = useTranslation('modals');
	const { t: tHome } = useTranslation('home');
	const { data } = useGetUsers();
	const emailIndex = user.indexOf(
		user.filter(attribute => attribute.includes('@')).toString()
	);
	const userToEdit = data?.filter(u => u.email === user[emailIndex]).flat();
	const assignedRoles = userToEdit
		? userToEdit[0]?.roles.map(role => toStartCase(role))
		: [''];
	const [selectedRoles, setSelectedRoles] = useState<string[]>(assignedRoles);

	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('edit-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>{t('body-edit')}</span>
			</ModalHeader>
			<ModalBody>
				<div className='h-full w-full space-y-5'>
					<div className='flex space-x-5'>
						<TextInput
							readOnly
							id='name'
							labelText={`${t('user')}`}
							value={userToEdit ? userToEdit[0].displayName : ''}
							className='w-full'
						/>

						<TextInput
							readOnly
							id='email-address'
							labelText={t('label-email')}
							value={userToEdit ? userToEdit[0].email : ''}
							className='w-full grow-0'
						/>
					</div>
					<div className='w-1/2'>
						<p className='mb-3 text-text-secondary text-label-1'>{tHome('roles')} *</p>
						{roles.map(role => (
							<Checkbox
								labelText={role}
								id={`${role}-edit`}
								defaultChecked={assignedRoles.includes(role)}
								onChange={(e, { checked }) =>
									!checked
										? setSelectedRoles(selectedRoles.filter(r => r !== role))
										: setSelectedRoles(old => [...old, role])
								}
							/>
						))}
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button
					kind='primary'
					disabled={
						selectedRoles.length === 0 || selectedRoles.join() === assignedRoles.join()
					}
				>
					{t('edit')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default EditUserModal;
