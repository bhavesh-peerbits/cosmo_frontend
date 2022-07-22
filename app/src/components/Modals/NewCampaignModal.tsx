import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	RadioButton,
	RadioButtonGroup,
	TextInput,
	Select,
	SelectItem
} from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type NewCampaignModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewCampaignModal = ({ isOpen, setIsOpen }: NewCampaignModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tRevalidation } = useTranslation('newRevalidation');
	const [, setTypeSelected] = useState('');
	const [, setLayerSelected] = useState('');
	const cleanUp = () => {
		setIsOpen(false);
	};
	const revalidationTypes = ['User Access Review', 'SUID', 'Firefight'];
	const layers = ['OS', 'DB', 'Software'];
	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={tRevalidation('create-new')} closeModal={cleanUp} />
			<ModalBody className='m-0 space-y-4 pb-9'>
				<TextInput
					id='campaign-name'
					labelText={tRevalidation('campaign-name')}
					placeholder={tRevalidation('name-placeholder')}
				/>
				<Select
					id='revalidation-types'
					labelText={`${tRevalidation('revalidation-type')} *`}
					onChange={value => setTypeSelected(value.toString())}
				>
					{revalidationTypes.map(type => (
						<SelectItem text={type} value={type} />
					))}
				</Select>
				<RadioButtonGroup
					orientation='vertical'
					name='layers'
					legendText={`${tRevalidation('layer')} *`}
					onChange={value => setLayerSelected(value.toString())}
					defaultSelected={layers[0]}
				>
					{layers.map(layer => (
						<RadioButton labelText={layer} value={layer} />
					))}
				</RadioButtonGroup>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button>{tRevalidation('create-campaign')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default NewCampaignModal;
