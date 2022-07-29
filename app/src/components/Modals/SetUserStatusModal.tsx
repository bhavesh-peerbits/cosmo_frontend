import ApiError from '@api/ApiError';
import useSetUserActive from '@api/user-admin/useSetUserActive';
import useSetUserInactive from '@api/user-admin/useSetUserInactive';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	InlineNotification
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
	const {
		mutate: mutateBlock,
		isError: isErrorBlock,
		error: errorBlock
	} = useSetUserInactive();
	const {
		mutate: mutateUnblock,
		isError: isErrorUnblock,
		error: errorUnblock
	} = useSetUserActive();

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
				{(isErrorBlock || isErrorUnblock) && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(errorBlock as ApiError)?.message ||
								(errorUnblock as ApiError)?.message ||
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
