import useSetUserActive from '@api/user-admin/useSetUserActive';
import useSetUserInactive from '@api/user-admin/useSetUserInactive';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';
import User from '@model/User';
import { useTranslation } from 'react-i18next';

type SetUserStatusModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	user: User | undefined;
};

const SetUserStatusModal = ({ isOpen, setIsOpen, user }: SetUserStatusModalProps) => {
	const { t } = useTranslation('modals');
	const { mutate: mutateBlock } = useSetUserInactive();
	const { mutate: mutateUnblock } = useSetUserActive();

	const cleanUp = () => {
		setIsOpen(false);
	};

	const blockUser = () => {
		user &&
			mutateBlock(
				{ userId: user.id },
				{
					onSuccess: () => {
						cleanUp();
					}
				}
			);
	};
	const unblockUser = () => {
		user &&
			mutateUnblock(
				{ userId: user.id },
				{
					onSuccess: () => {
						cleanUp();
					}
				}
			);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				title={`${t(user?.inactive ? 'unblock' : 'block')} ${t('user')}`}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>
					{t(user?.inactive ? 'body-unblock' : 'body-block', {
						user: `${user?.name} ${user?.surname}`
					})}
				</span>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button
					kind={user?.inactive ? 'primary' : 'danger'}
					onClick={user?.inactive ? unblockUser : blockUser}
				>
					{t(user?.inactive ? 'unblock' : 'block')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default SetUserStatusModal;
