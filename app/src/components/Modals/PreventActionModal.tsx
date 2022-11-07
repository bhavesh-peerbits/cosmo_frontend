import { Button, ComposedModal, ModalFooter, ModalHeader } from '@carbon/react';
import preventActionModalStore from '@store/ui/preventActionModalStore';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

const PreventActionModal = () => {
	const [preventActionProp, setPreventActionProp] = useRecoilState(
		preventActionModalStore
	);
	const { t } = useTranslation('modals');
	const cleanUp = () => {
		setPreventActionProp(old => ({
			...old,
			isOpen: false
		}));
	};
	return (
		<ComposedModal size='sm' open={preventActionProp.isOpen} onClose={cleanUp}>
			<ModalHeader title={preventActionProp.message} closeModal={cleanUp} />
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button
					kind='primary'
					onClick={() => {
						preventActionProp.onSuccess();
						setPreventActionProp(old => ({ ...old, isOpen: false }));
					}}
				>
					Ok
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default PreventActionModal;
