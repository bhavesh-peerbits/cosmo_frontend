/* eslint-disable no-unsafe-optional-chaining */
import usePutASelectionOfFiles from '@api/uploaders3/usePutASelectionOfFiles';
import { FileUploaderDropContainer, FileUploaderItem, Form, Tag } from '@carbon/react';
import DeleteFileS3Modal from '@components/Modals/DeleteFileS3Modal';
import usePrompt from '@hooks/usePreventNavigatePrompt';
import FileLink, { fromFiletoFileLink } from '@model/FileLink';
import { useCallback, useEffect, useState } from 'react';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	useForm
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type CosmoFileUploaderProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends File[]
	? {
			label: string;
			save?: boolean;
			setSave?: (save: boolean) => void;
			alreadyUploaded?: FileLink[];
			parentFormDirty?: boolean;
			additionalInfo?: Record<string, string>;
	  }
	: never;

interface UploaderS3Form {
	files: File[];
}

const UploaderS3 = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	save,
	setSave,
	alreadyUploaded,
	parentFormDirty,
	additionalInfo
}: CosmoFileUploaderProps<T, TName>) => {
	const { mutate } = usePutASelectionOfFiles();
	const { t } = useTranslation('uploaderS3');
	const [deleteInfo, setDeleteInfo] = useState<{
		isOpen: boolean;
		fileId: string | undefined;
	}>({ isOpen: false, fileId: undefined });
	const {
		control,
		formState: { isDirty }
	} = useForm<UploaderS3Form>({
		defaultValues: { files: [] }
	});
	const {
		field: { onChange, value: formValue }
	} = useController({
		name: 'files',
		control
	});

	usePrompt(t('prevent-close'), isDirty || parentFormDirty);

	const files = formValue as File[];

	const handleSaveFile = useCallback(() => {
		if (files.length === 0 || !save) {
			save && setSave && setSave(!save);
			return;
		}

		additionalInfo?.stepId &&
			mutate(
				{
					stepId: +additionalInfo?.stepId,
					fileLinkDtoList: files.map(file => fromFiletoFileLink(file)),
					files
				},
				{
					onSuccess: () => {
						setSave && setSave(!save);
					}
				}
			);
	}, [additionalInfo?.stepId, files, mutate, save, setSave]);

	useEffect(() => {
		handleSaveFile();
	}, [handleSaveFile, save]);

	return (
		<>
			<div className='mt-5 space-y-5' id={`uploader__file__${label}`}>
				{alreadyUploaded ? (
					<div>
						<div>{t('already-uploaded')}</div>
						{alreadyUploaded.map(file => (
							<Tag
								filter
								size='md'
								onClose={() => {
									setDeleteInfo({ isOpen: true, fileId: file.id });
								}}
							>
								<Link to={file.link || ''}>{file.name}</Link>
							</Tag>
						))}
					</div>
				) : null}
				<Form>
					<div className=' space-y-5'>
						<div>{t('upload-file')}</div>
						<FileUploaderDropContainer
							labelText={label}
							className='w-full'
							onAddFiles={(e, { addedFiles }) => {
								files.push(addedFiles[0]);
								onChange(files);
							}}
						/>
						<div className='mt-2 max-h-[160px] max-w-[20rem] overflow-y-auto'>
							{files?.map((file, index) => (
								<div className='mt-2' key={`${file.name}`}>
									<FileUploaderItem
										name={file.name}
										onDelete={() => {
											files.length > 1
												? onChange(files.filter((_, i) => i !== index))
												: onChange([]);
										}}
										errorSubject='File not valid'
										status='edit'
									/>
								</div>
							))}
						</div>
					</div>
				</Form>
			</div>
			<DeleteFileS3Modal deleteInfo={deleteInfo} setDeleteInfo={setDeleteInfo} />
		</>
	);
};

export default UploaderS3;
