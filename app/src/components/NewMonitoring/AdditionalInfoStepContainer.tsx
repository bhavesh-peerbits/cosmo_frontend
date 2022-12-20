import FullWidthColumn from '@components/FullWidthColumn';
import {
	Toggle,
	Tooltip,
	FileUploaderDropContainer,
	TextArea,
	Layer,
	TextInput,
	Button,
	Tag
} from '@carbon/react';
import { Information, Add } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type AdditionalInfoFormData = {
	extension: string;
	note: string;
};
const AdditionalInfoStepContainer = () => {
	const { t } = useTranslation(['changeMonitoring', 'userRevalidation']);
	const [sameSetup, setSameSetup] = useState(false);
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
		<FullWidthColumn className='space-y-7'>
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('changeMonitoring:different')}
					labelB={t('changeMonitoring:same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('changeMonitoring:asset-setup-toggle')}</p>
							<Tooltip align='top' label='Inserisci descrizione'>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer className='flex items-end space-x-3 lg:w-1/2'>
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
					<Button renderIcon={Add} size='md' onClick={addExtension} disabled={!extension}>
						{t('changeMonitoring:add')}
					</Button>
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
				<Layer>
					<TextArea labelText={t('changeMonitoring:note')} {...register('note')} />
				</Layer>
			</FullWidthColumn>
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContainer;
