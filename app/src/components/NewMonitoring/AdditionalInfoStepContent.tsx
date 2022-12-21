import {
	FileUploaderDropContainer,
	TextArea,
	Layer,
	TextInput,
	Button,
	Tag
} from '@carbon/react';
import { Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AdditionalInfoFormData = {
	extension: string;
	note: string;
	level?: 0 | 1 | 2;
};

type AdditionalInfoStepContentProps = {
	inTile?: boolean;
};
const AdditionalInfoStepContent = ({ inTile }: AdditionalInfoStepContentProps) => {
	const { t } = useTranslation(['changeMonitoring', 'userRevalidation']);
	const [extensions, setExtensions] = useState<string[]>([]);

	const { register, watch, reset } = useForm<AdditionalInfoFormData>();

	const extension = watch('extension');
	const addExtension = () => {
		setExtensions(old =>
			!old.find(el => el === extension) ? [...old, extension] : [...old]
		);
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
								onKeyDown={e =>
									e.key === 'Enter' &&
									(setExtensions(old =>
										!old.find(el => el === extension) ? [...old, extension] : [...old]
									),
									reset({ extension: '' }))
								}
								{...register('extension')}
							/>
							<Button
								renderIcon={Add}
								size='md'
								onClick={addExtension}
								disabled={!extension}
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
				<FullWidthColumn>
					<TextArea labelText={t('changeMonitoring:note')} {...register('note')} />
				</FullWidthColumn>
			</Layer>
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContent;
