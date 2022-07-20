import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type DownloadTemplateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DownloadTemplateModal = ({ isOpen, setIsOpen }: DownloadTemplateModalProps) => {
	const { t } = useTranslation('modals');
	const [, setTypeSelected] = useState('');
	const cleanUp = () => {
		setIsOpen(false);
	};
	const revalidationTypes = ['User Access Review', 'SUID', 'Firefight'];
	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title='Download Template' closeModal={cleanUp} />
			<ModalBody className='m-0 pb-9'>
				<RadioButtonGroup
					orientation='vertical'
					name='revalidation-types'
					legendText='Select revalidation type *'
					className='flex flex-col'
					onChange={value => setTypeSelected(value.toString())}
					defaultSelected={revalidationTypes[0]}
				>
					{revalidationTypes.map(type => (
						<RadioButton labelText={type} value={type} />
					))}
				</RadioButtonGroup>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button>Download</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DownloadTemplateModal;
