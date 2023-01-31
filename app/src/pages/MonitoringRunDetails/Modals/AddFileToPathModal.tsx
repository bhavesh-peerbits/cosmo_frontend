import useAddFileAlreadyUpForDelta from '@api/change-monitoring-analyst/useAddFileAlreadyUpForDelta';
import useAddFileForDelta from '@api/change-monitoring-analyst/useAddFileForDelta';
import useAddOldRunFileForDelta from '@api/change-monitoring-analyst/useAddOldRunFileForDelta';
import { RadioButton, RadioButtonGroup, Select, SelectItem, Layer } from '@carbon/react';
import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { fromFiletoFileLink } from '@model/FileLink';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type AddFileToPathModalProps = {
	orderNumber: string;
	includeLastRun?: boolean;
	assetId: string;
};
const AddFileToPathModal = ({
	orderNumber,
	includeLastRun,
	assetId
}: AddFileToPathModalProps) => {
	const { t } = useTranslation(['modals', 'runDetails', 'userRevalidation']);
	const [addFileInfo, setAddFileInfo] = useRecoilState(addFileToRunAssetStore);
	const [inputOptions, setInputOptions] = useState(orderNumber === '1' ? 2 : 1);
	const { monitoringId = '', runId = '' } = useParams();
	const { mutate: mutateAU } = useAddFileAlreadyUpForDelta();
	const { mutate: mutateNew } = useAddFileForDelta();
	const { mutate: mutateOld } = useAddOldRunFileForDelta();

	const { control, getValues, reset } = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});

	const { register, getValues: getValuesSelect } = useForm<{ fileId: string }>({
		defaultValues: { fileId: '' }
	});

	const cleanUp = () => {
		reset({ files: [] });
		setAddFileInfo(old => ({ ...old, isOpen: false, path: [] }));
	};

	const generatePathS3 = (old: boolean) => {
		return `${new Date().getFullYear()}/change_monitoring/monitoring/${monitoringId}/run/${runId}/${orderNumber}/asset/${assetId}/${(
			Math.random() * 100000000
		).toFixed()}/${old ? 'previous' : 'current'}`;
	};

	const handleSave = () => {
		if (inputOptions === 1) {
			mutateOld(
				{
					assetId,
					runId,
					fileForDelta: { old: addFileInfo.old, path: addFileInfo.path }
				},
				{ onSuccess: cleanUp }
			);
		}
		if (inputOptions === 2) {
			mutateNew(
				{
					assetId,
					file: getValues('files')[0],
					fileForDelta: {
						fileLink: fromFiletoFileLink(
							getValues('files')[0],
							generatePathS3(addFileInfo.old)
						),
						old: addFileInfo.old,
						path: addFileInfo.path
					},
					runId
				},
				{ onSuccess: cleanUp }
			);
		}
		if (inputOptions === 3) {
			mutateAU(
				{
					assetId,
					runId,
					fileLinkId: getValuesSelect('fileId'),
					fileForDelta: { old: addFileInfo.old, path: addFileInfo.path }
				},
				{ onSuccess: cleanUp }
			);
		}
	};
	return (
		<TearsheetNarrow
			open={addFileInfo.isOpen}
			onClose={cleanUp}
			hasCloseIcon
			title={`${t('runDetails:add-file-path')}: ${addFileInfo.path}`}
			label={`Monitoring Name - Run ${orderNumber}`}
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
					id: 'create',
					onClick: handleSave
				}
			]}
		>
			<div className='space-y-8 p-5'>
				{includeLastRun && (
					<RadioButtonGroup
						name='select-file'
						orientation='vertical'
						legendText={t('runDetails:select-file-method')}
						defaultSelected={orderNumber === '1' || !addFileInfo.old ? '2' : '1'}
						className='fix-width-radio'
					>
						{/* {addFileInfo.old && ( */}
						<RadioButton
							labelText={t('runDetails:use-last-run')}
							value='1'
							disabled={orderNumber === '1'}
							onClick={() => setInputOptions(1)}
						/>
						{/* )} */}
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
										<Select
											id='file-selection'
											noLabel
											disabled={inputOptions !== 3}
											{...register('fileId')}
										>
											{(addFileInfo.old
												? addFileInfo.possiblePreviousFiles
												: addFileInfo.possibleCurrentFiles
											).length === 0 && (
												<SelectItem text={t('runDetails:no-files')} hidden value='' />
											)}
											{[
												...new Map(
													(addFileInfo.old
														? addFileInfo.possiblePreviousFiles
														: addFileInfo.possibleCurrentFiles
													).map(item => [item.id, item])
												).values()
											].map(file => (
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
				)}
			</div>
		</TearsheetNarrow>
	);
};
export default AddFileToPathModal;
