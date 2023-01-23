import { Form, FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

interface UploaderS3MonitoringProps {
	control: Control<{ files: File[] }, any>;
	disabled: boolean;
}

const UploaderS3Monitoring = ({ control, disabled }: UploaderS3MonitoringProps) => {
	const { t } = useTranslation(['userRevalidation', 'uploaderS3']);
	const {
		field: { onChange, value: formValue }
	} = useController({
		name: 'files',
		control
	});
	const files = formValue as File[];
	return (
		<Form>
			<div className='space-y-5'>
				<div className='space-y-3'>
					<FileUploaderDropContainer
						disabled={disabled}
						labelText={t('userRevalidation:upload-instructions')}
						className='w-full'
						onAddFiles={(e, { addedFiles }) => {
							files.push(addedFiles[0]);
							onChange(files);
						}}
					/>
				</div>
				<div className='max-h-[160px] max-w-[20rem] space-y-3 overflow-y-auto'>
					{files?.map((file, index) => (
						<div
							className={cx('', { 'pointer-events-none opacity-60': disabled })}
							key={`${file.name}`}
						>
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
	);
};

export default UploaderS3Monitoring;
