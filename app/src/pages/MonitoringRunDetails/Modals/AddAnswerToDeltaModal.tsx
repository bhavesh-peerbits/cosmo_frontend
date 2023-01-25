import {
	Form,
	Select,
	SelectItem,
	FileUploaderDropContainer,
	TextInput,
	TextArea
} from '@carbon/react';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type AddAnswerToDeltaModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
	isIgnore: boolean;
	monitoringName: string;
	runNumber: number;
};
const AddAnswerToDeltaModal = ({
	isOpen,
	setIsOpen,
	isIgnore,
	monitoringName,
	runNumber
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
		<TearsheetNarrow
			hasCloseIcon
			title={isIgnore ? t('runDetails:ignore') : t('runDetails:add-file-path')}
			label={`${monitoringName} - RUN ${runNumber}`}
			description={
				isIgnore
					? t('runDetails:ignore-description')
					: t('runDetails:add-answer-description')
			}
			open={isOpen}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-add-answer'
				},
				{
					label: t('modals:save'),
					id: 'save-answer',
					onClick: () => {}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
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
			</Form>
		</TearsheetNarrow>
	);
};
export default AddAnswerToDeltaModal;
