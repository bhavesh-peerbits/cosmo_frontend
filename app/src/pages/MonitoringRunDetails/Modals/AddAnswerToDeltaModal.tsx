import {
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Button,
	Select,
	SelectItem,
	FileUploaderDropContainer,
	TextInput,
	TextArea
} from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type AddAnswerToDeltaModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
	isIgnore: boolean;
};
const AddAnswerToDeltaModal = ({
	isOpen,
	setIsOpen,
	isIgnore
}: AddAnswerToDeltaModalProps) => {
	const { t } = useTranslation([
		'modals',
		'runDetails',
		'userRevalidation',
		'changeMonitoring'
	]);

	const cleanUp = () => {
		setIsOpen('');
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('runDetails:add-file-path')} label={`Monitoring Name - Run `}>
				<p className='text-secondary text-body-long-1'>
					{isIgnore
						? t('runDetails:ignore-description')
						: t('runDetails:add-answer-description')}
				</p>
			</ModalHeader>
			<ModalBody className='space-y-6'>
				{isIgnore && <TextArea labelText={t('changeMonitoring:note')} />}
				{!isIgnore && (
					<div className='space-y-7'>
						<TextInput
							id='answer'
							labelText='CHANGE LABEL'
							placeholder='CHANGE PLACEHOLDER'
						/>
						<Select
							id='select-file-delta'
							labelText={t('runDetails:select-from-uploaded')}
						>
							<SelectItem text='file' value='item' />
						</Select>
						<div className='space-y-3'>
							<p className='text-heading-compact-1'>{t('runDetails:upload-file')}</p>

							<FileUploaderDropContainer
								labelText={t('userRevalidation:upload-instructions')}
							/>
						</div>
					</div>
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button>{t('modals:save')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default AddAnswerToDeltaModal;
