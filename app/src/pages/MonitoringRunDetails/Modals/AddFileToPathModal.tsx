import {
	RadioButton,
	RadioButtonGroup,
	Select,
	SelectItem,
	FileUploaderDropContainer,
	Layer
} from '@carbon/react';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';
import { useState } from 'react';
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

	const cleanUp = () => {
		setAddFileInfo(old => ({ ...old, isOpen: false, path: '' }));
	};

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
					>
						<RadioButton
							labelText={t('runDetails:use-last-run')}
							value='1'
							onClick={() => setInputOptions(1)}
						/>
						<RadioButton
							labelText={t('runDetails:file-already-uploaded')}
							value='2'
							onClick={() => setInputOptions(2)}
						/>
						<RadioButton
							labelText={t('runDetails:upload-new-file')}
							value='3'
							onClick={() => setInputOptions(3)}
						/>
					</RadioButtonGroup>
				)}
				{inputOptions === 2 && (
					<Layer level={0}>
						<Select size='lg' id='file-selection'>
							<SelectItem text='file1' value='file1' />
						</Select>
					</Layer>
				)}
				{inputOptions === 3 && (
					<div className='space-y-3'>
						<p className='text-heading-compact-1'>{t('runDetails:upload-file')}</p>
						<FileUploaderDropContainer
							labelText={t('userRevalidation:upload-instructions')}
						/>
					</div>
				)}
			</div>
		</TearsheetNarrow>
	);
};
export default AddFileToPathModal;
