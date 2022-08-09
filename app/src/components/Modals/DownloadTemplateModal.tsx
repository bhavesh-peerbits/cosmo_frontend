import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type DownloadTemplateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DownloadTemplateModal = ({ isOpen, setIsOpen }: DownloadTemplateModalProps) => {
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const [, setTypeSelected] = useState('');
	const cleanUp = () => {
		setIsOpen(false);
	};

	const revalidationTypes = useMemo(
		() => [
			{
				id: 'user-access',
				label: 'User Access Review'
			},
			{
				id: 'suid',
				label: 'SUID'
			},
			{ id: 'firefight', label: 'Firefight' }
		],
		[]
	);

	const downloadTemplate = () => {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	};
	const isLoading = false;

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title='Download file' closeModal={cleanUp} />
			<ModalBody className='m-0 pb-9'>
				<div className='space-y-5'>
					<p>{`${t('userRevalidation:download-modal-body')}.`}</p>
					<RadioButtonGroup
						orientation='vertical'
						name='revalidation-types'
						legendText={`${t('userRevalidation:revalidation-type')} *`}
						onChange={value => setTypeSelected(value.toString())}
						defaultSelected={revalidationTypes[0].id}
					>
						{revalidationTypes.map(({ id, label }) => (
							<RadioButton key={id} labelText={label} value={id} />
						))}
					</RadioButtonGroup>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button disabled={isLoading} onClick={downloadTemplate}>
					Download
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DownloadTemplateModal;
