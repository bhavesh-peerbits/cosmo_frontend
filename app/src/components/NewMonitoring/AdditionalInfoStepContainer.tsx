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
};
const AdditionalInfoStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const [extensions, setExtensions] = useState<string[]>([]);

	const { register, watch, reset } = useForm<AdditionalInfoFormData>();

	const extension = watch('extension');
	const addExtension = () => {
		setExtensions(old => [...old, extension]);
		reset({ extension: '' });
	};
	return (
		<>
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('different')}
					labelB={t('same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('asset-setup-toggle')}</p>
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
						labelText='Extensions to ignore'
						onKeyDown={e =>
							e.key === 'Enter'
								? (setExtensions(old => [...old, extension]), reset({ extension: '' }))
								: {}
						}
						{...register('extension')}
					/>
					<Button renderIcon={Add} size='md' onClick={addExtension}>
						Add
					</Button>
				</Layer>
				{extensions.map(ex => (
					<Tag filter onClose={() => setExtensions(old => old.filter(el => el !== ex))}>
						{ex}
					</Tag>
				))}
			</FullWidthColumn>
			<FullWidthColumn>
				<FileUploaderDropContainer labelText='Monitoring file' />
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer>
					<TextArea labelText='Note' />
				</Layer>
			</FullWidthColumn>
		</>
	);
};
export default AdditionalInfoStepContainer;
