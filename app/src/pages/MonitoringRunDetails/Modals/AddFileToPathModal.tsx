import { RadioButton, RadioButtonGroup, Select, SelectItem, Layer } from '@carbon/react';
import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

type AddFileToPathModalProps = {
	id: string;
	includeLastRun?: boolean;
};
const AddFileToPathModal = ({ id, includeLastRun }: AddFileToPathModalProps) => {
	const { t } = useTranslation(['modals', 'runDetails', 'userRevalidation']);
	const [addFileInfo, setAddFileInfo] = useRecoilState(addFileToRunAssetStore);
	const [inputOptions, setInputOptions] = useState(1);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { control, getValues } = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});

	const cleanUp = () => {
		setAddFileInfo(old => ({ ...old, isOpen: false, path: '' }));
	};

	// const handleSave = () => {

	// }

	return (
		<TearsheetNarrow
			open={addFileInfo.isOpen}
			onClose={cleanUp}
			hasCloseIcon
			title={`${t('runDetails:add-file-path')}: ${addFileInfo.path}`}
			label={`Monitoring Name - Run ${id}`}
			description={
				<p className='text-text-secondary text-body-long-1'>
					{includeLastRun
						? t('runDetails:add-file-last-run')
						: t('runDetails:add-file-path-description')}
				</p>
			}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel'
				},
				{
					label: t('runDetails:confirm'),
					id: 'create'
				}
			]}
		>
			<div className='space-y-8 p-5'>
				{includeLastRun && (
					<RadioButtonGroup
						name='select-file'
						orientation='vertical'
						legendText={t('runDetails:select-file-method')}
						defaultSelected='1'
						className='fix-width-radio'
					>
						<RadioButton
							labelText={t('runDetails:use-last-run')}
							value='1'
							onClick={() => setInputOptions(1)}
						/>
						<RadioButton
							disabled={
								(addFileInfo.old
									? addFileInfo.possiblePreviousFiles
									: addFileInfo.possibleCurrentFiles
								).length === 0
							}
							labelText={
								<div className='w-full space-y-3'>
									<p className='whitespace-nowrap'>
										{t('runDetails:file-already-uploaded')}
									</p>
									<Layer level={1}>
										<Select id='file-selection' noLabel disabled={inputOptions !== 2}>
											<SelectItem text='no file present' hidden value='' />
											{(addFileInfo.old
												? addFileInfo.possiblePreviousFiles
												: addFileInfo.possibleCurrentFiles
											).map(file => (
												<SelectItem text={file.name ?? ''} value={file.id} />
											))}
										</Select>
									</Layer>
								</div>
							}
							className='flex w-full justify-start'
							value='2'
							onClick={() => setInputOptions(2)}
						/>
						<RadioButton
							labelText={
								<div className='space-y-3'>
									<p>{t('runDetails:upload-new-file')}</p>
									<Layer>
										<UploaderS3Monitoring
											control={control}
											disabled={inputOptions !== 3}
										/>
									</Layer>
								</div>
							}
							value='3'
							onClick={() => setInputOptions(3)}
						/>
					</RadioButtonGroup>
				)}
			</div>
		</TearsheetNarrow>
	);
};
export default AddFileToPathModal;
