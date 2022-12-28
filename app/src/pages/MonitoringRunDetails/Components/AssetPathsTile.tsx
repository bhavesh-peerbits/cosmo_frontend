import AssetExpandableTile from '@components/NewMonitoring/AssetExpandableTile';
import { TextInput, Tag, Button, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Add } from '@carbon/react/icons';

type AssetPathsTileProps = {
	asset: string;
};
type AssetSetupFormData = {
	extension: string;
};
const AssetPathsTile = ({ asset }: AssetPathsTileProps) => {
	// TODO Add default values for extensions
	const { t } = useTranslation(['changeMonitoring']);
	const [extensions, setExtensions] = useState<string[]>([]);

	const { register, watch, reset } = useForm<AssetSetupFormData>();

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
		<AssetExpandableTile title={asset}>
			<div className='pb-5'>
				<Layer level={1}>
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
			</div>
			<div>TABLE GOES HERE</div>
		</AssetExpandableTile>
	);
};
export default AssetPathsTile;
