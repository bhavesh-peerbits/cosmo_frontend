import ApiError from '@api/ApiError';
import useSetRolesForUser from '@api/user-admin/useSetRolesForUser';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Checkbox,
	InlineNotification
} from '@carbon/react';
import User from '@model/User';
import { mapUserRoleToDisplayRole } from '@model/UserRole';
import { UserDtoRolesEnum } from 'cosmo-api/src/v1/models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type EditUserModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	user: User | undefined;
};

const EditUserModal = ({ isOpen, setIsOpen, user }: EditUserModalProps) => {
	const roles = [
		'USER_ADMIN',
		'NARRATIVE_ADMIN',
		'NARRATIVE_ANALYST',
		'REVALIDATION_ANALYST',
		'REVIEWER',
		'USER_UNKNOWN'
	];

	const { t } = useTranslation('modals');
	const { t: tHome } = useTranslation('home');
	const { mutate, isLoading, isError, error, reset } = useSetRolesForUser();
	const assignedRoles = user?.roles.length
		? user.roles.map(role => role)
		: ['USER_UNKNOWN'];
	const [selectedRoles, setSelectedRoles] = useState<string[]>(assignedRoles);

	const cleanUp = () => {
		setIsOpen(false);
		reset();
	};
	const editUser = () => {
		return (
			user &&
			mutate(
				{
					userId: user.id,
					userData: { ...user, roles: selectedRoles as UserDtoRolesEnum[] }
				},
				{
					onSuccess: () => {
						cleanUp();
					}
				}
			)
		);
	};
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('edit-user')} closeModal={cleanUp}>
				<span className='text-text-secondary text-body-1'>{t('body-edit')}</span>
			</ModalHeader>
			<ModalBody>
				<div className='h-full w-full space-y-5'>
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
					<div className='flex space-x-5'>
						<TextInput
							readOnly
							id='name'
							labelText={`${t('user')}`}
							value={user ? user.displayName : ''}
							className='w-full'
						/>

						<TextInput
							readOnly
							id='email-address'
							labelText={t('label-email')}
							value={user ? user.email : ''}
							className='w-full grow-0'
						/>
					</div>
					<div className='w-1/2'>
						<p className='mb-3 text-text-secondary text-label-1'>{tHome('roles')} *</p>
						{roles.map(role => (
							<Checkbox
								labelText={mapUserRoleToDisplayRole(role as UserDtoRolesEnum)}
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
						selectedRoles.length === 0 ||
						selectedRoles.join() === assignedRoles.join() ||
						isLoading
					}
					onClick={editUser}
				>
					{t('edit')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default EditUserModal;
