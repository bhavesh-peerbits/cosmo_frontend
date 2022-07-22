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
	const { t: tRevalidation } = useTranslation('newRevalidation');
	const [, setTypeSelected] = useState('');
	const cleanUp = () => {
		setIsOpen(false);
	};
	const revalidationTypes = ['User Access Review', 'SUID', 'Firefight'];
	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title='Download file' closeModal={cleanUp} />
			<ModalBody className='m-0 pb-9'>
				<div className='space-y-5'>
					<p>{`${tRevalidation('download-modal-body')}.`}</p>
					<RadioButtonGroup
						orientation='vertical'
						name='revalidation-types'
						legendText={`${tRevalidation('revalidation-type')} *`}
						onChange={value => setTypeSelected(value.toString())}
						defaultSelected={revalidationTypes[0]}
					>
						{revalidationTypes.map(type => (
							<RadioButton labelText={type} value={type} />
						))}
					</RadioButtonGroup>
				</div>
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
