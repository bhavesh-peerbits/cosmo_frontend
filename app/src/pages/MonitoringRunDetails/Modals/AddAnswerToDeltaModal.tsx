import {
	Form,
	Select,
	SelectItem,
	RadioButtonGroup,
	RadioButton,
	TextArea,
	Layer,
	TextInput
} from '@carbon/react';
import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import FileLink from '@model/FileLink';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AddAnswerToDeltaModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
	isIgnore: boolean;
	monitoringName: string;
	runNumber: number;
	filesAnswers?: FileLink[];
};
const AddAnswerToDeltaModal = ({
	isOpen,
	setIsOpen,
	isIgnore,
	monitoringName,
	runNumber,
	filesAnswers
}: AddAnswerToDeltaModalProps) => {
	const { t } = useTranslation([
		'modals',
		'runDetails',
		'userRevalidation',
		'changeMonitoring'
	]);
	const [inputOptions, setInputOptions] = useState(1);
	const { control } = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});
	const { register } = useForm<{ fileId: string }>({
		defaultValues: { fileId: '' }
	});

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
					<RadioButtonGroup
						name='select-file'
						orientation='vertical'
						legendText={t('runDetails:select-file-method')}
						defaultSelected='1'
						className='fix-width-radio'
					>
						<RadioButton
							labelText={
								<TextInput
									id='input-text-answer'
									labelText='ADD LABEL'
									placeholder='ADD PPLACEHOLDER'
									disabled={inputOptions !== 1}
								/>
							}
							value='1'
							onClick={() => setInputOptions(1)}
						/>
						<RadioButton
							labelText={
								<div className='space-y-3'>
									<p>{t('runDetails:upload-new-file')}</p>
									<Layer>
										<UploaderS3Monitoring
											control={control}
											disabled={inputOptions !== 2}
										/>
									</Layer>
								</div>
							}
							value='2'
							onClick={() => setInputOptions(2)}
						/>
						<RadioButton
							labelText={
								<div className='w-full space-y-3'>
									<p className='whitespace-nowrap'>
										{t('runDetails:file-already-uploaded')}
									</p>
									<Layer level={1}>
										<Select
											id='file-selection'
											noLabel
											disabled={inputOptions !== 3}
											{...register('fileId')}
										>
											{filesAnswers?.length === 0 && (
												<SelectItem text={t('runDetails:no-files')} hidden value='' />
											)}
											{filesAnswers?.map(file => (
												<SelectItem text={file.name ?? ''} value={file.id} />
											))}
										</Select>
									</Layer>
								</div>
							}
							className='flex w-full justify-start'
							value='3'
							onClick={() => setInputOptions(3)}
						/>
					</RadioButtonGroup>
					// <div className='space-y-7'>
					// 	<TextInput
					// 		id='answer'
					// 		labelText='CHANGE LABEL'
					// 		placeholder='CHANGE PLACEHOLDER'
					// 	/>

					// 	<div className='space-y-3'>
					// 		<p className='text-heading-compact-1'>{t('runDetails:upload-file')}</p>

					// 		<FileUploaderDropContainer
					// 			labelText={t('userRevalidation:upload-instructions')}
					// 		/>
					// 	</div>
					// </div>
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default AddAnswerToDeltaModal;
