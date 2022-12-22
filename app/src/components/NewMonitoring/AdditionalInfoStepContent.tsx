import { FileUploaderDropContainer, Layer, TextInput, Button, Tag } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AdditionalInfoAssetFormData = {
	extension: string;
	file: [];
};

type AdditionalInfoStepContentProps = {
	inTile?: boolean;
};
const AdditionalInfoStepContent = ({ inTile }: AdditionalInfoStepContentProps) => {
	const { t } = useTranslation(['changeMonitoring', 'userRevalidation']);
	const [extensions, setExtensions] = useState<string[]>([]);

	const { register, watch, reset } = useForm<AdditionalInfoAssetFormData>();

	const extensionInput = watch('extension');
	const addExtension = () => {
		const newExtensions = extensionInput
			.split(',')
			.filter(ex => !extensions.includes(ex.toLowerCase()))
			.map(ex => ex.replace(/[^a-zA-Z0-9-, ]/g, ''));
		newExtensions &&
			setExtensions(old => [...old, ...newExtensions.map(newEx => newEx.toLowerCase())]);
		reset({ extension: '' });
	};
	return (
		<FullWidthColumn>
			<Layer level={inTile ? 1 : 2} className={`${inTile ? 'space-y-5' : 'space-y-7'}`}>
				<FullWidthColumn>
					<Layer level={inTile ? 1 : 2}>
						<div className='flex items-end space-x-3'>
							<TextInput
								id='extensions-ignore'
								labelText={t('changeMonitoring:extensions-to-ignore')}
								placeholder={t('changeMonitoring:placeholder-extensions')}
								onKeyDown={e => e.key === 'Enter' && addExtension()}
								{...register('extension')}
							/>
							<Button
								renderIcon={Add}
								size='md'
								onClick={addExtension}
								disabled={!extensionInput}
							>
								{t('changeMonitoring:add')}
							</Button>
						</div>
					</Layer>
					{extensions.map(ex => (
						<Tag filter onClose={() => setExtensions(old => old.filter(el => el !== ex))}>
							{ex}
						</Tag>
					))}
				</FullWidthColumn>
				<FullWidthColumn className='space-y-5'>
					<div className='flex flex-col space-y-3'>
						<span className='text-heading-compact-1'>
							{t('changeMonitoring:first-run-file')}
						</span>
						<span className='text-text-secondary text-body-compact-1'>
							{t('changeMonitoring:first-run-file-description')}
						</span>
					</div>
					<FileUploaderDropContainer
						labelText={t('userRevalidation:upload-instructions')}
					/>
				</FullWidthColumn>
			</Layer>
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContent;
