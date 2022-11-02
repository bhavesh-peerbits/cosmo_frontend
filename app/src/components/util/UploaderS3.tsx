import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import FileLink from '@model/FileLink';
import { useEffect } from 'react';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	useForm
} from 'react-hook-form';
import { Link } from 'react-router-dom';

type CosmoFileUploaderProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends File[]
	? {
			label: string;
			save?: boolean;
			alreadyUploaded?: FileLink[];
	  }
	: never;

interface UploaderS3Form {
	files: File[];
}

const handleSaveFile = () => {};

const UploaderS3 = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	save,
	alreadyUploaded
}: CosmoFileUploaderProps<T, TName>) => {
	// const { t } = useTranslation('uploaderS3');
	const { control, handleSubmit } = useForm<UploaderS3Form>({
		defaultValues: { files: [] }
	});
	const {
		field: { onChange, value: formValue }
	} = useController({
		name: 'files',
		control
	});
	const files = formValue as File[];
	useEffect(() => {
		handleSubmit(handleSaveFile);
	}, [handleSubmit, save]);
	return (
		<div className='mt-5 space-y-5'>
			{alreadyUploaded ? (
				<div>
					{/* <div>{t('already-uploaded')}</div> */}
					{alreadyUploaded.map(file => (
						<Link to={file.link || ''}>{file.name}</Link>
					))}
				</div>
			) : null}
			<div className=' space-y-5'>
				{/* <div>{t('upload-file')}</div> */}
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
		</div>
	);
};

export default UploaderS3;
