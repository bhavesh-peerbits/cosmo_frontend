import {
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Button,
	RadioButton,
	RadioButtonGroup,
	Select,
	SelectItem,
	FileUploaderDropContainer,
	SwitcherDivider
} from '@carbon/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

type AddFileToPathModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	id: string;
	includeLastRun?: boolean;
};
const AddFileToPathModal = ({
	isOpen,
	setIsOpen,
	id,
	includeLastRun
}: AddFileToPathModalProps) => {
	const { t } = useTranslation(['modals', 'runDetails', 'userRevalidation']);
	const [includeNewFile, setIncludeNewFile] = useState(true);

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader
				title={t('runDetails:add-file-path')}
				label={`Monitoring Name - Run ${id}`}
			>
				<p className='text-text-secondary text-body-long-1'>
					{includeLastRun
						? t('runDetails:add-file-last-run')
						: t('runDetails:add-file-path-description')}
				</p>
			</ModalHeader>
			<ModalBody className='space-y-7'>
				{includeLastRun && (
					<RadioButtonGroup
						name='select-file'
						orientation='vertical'
						legendText={t('runDetails:select-file')}
						defaultSelected='new-file'
					>
						<RadioButton
							labelText={t('runDetails:use-last-run')}
							value='previous-run-file'
							onClick={() => setIncludeNewFile(false)}
						/>
						<RadioButton
							labelText={t('runDetails:new-file')}
							value='new-file'
							onClick={() => setIncludeNewFile(true)}
						/>
					</RadioButtonGroup>
				)}
				{includeNewFile && (
					<div className='space-y-5'>
						<Select id='file-selection'>
							<SelectItem text='file1' value='file1' />
						</Select>
						<div className='flex w-full'>
							<SwitcherDivider className='w-full' /> {t('runDetails:or')}
							<SwitcherDivider className='w-full' />
						</div>
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
export default AddFileToPathModal;
