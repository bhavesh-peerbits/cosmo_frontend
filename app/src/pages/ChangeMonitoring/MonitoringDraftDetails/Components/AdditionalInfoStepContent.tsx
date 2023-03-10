import { Layer, TextInput, Button, Tag } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AdditionalInfoAssetFormData = {
	extension: string;
	file: [];
};

type AdditionalInfoStepContentProps = {
	inTile?: boolean;
	setExtensions: Dispatch<SetStateAction<{ extensions: string[]; assetId?: string }[]>>;
	extensions?: { extensions: string[]; assetId?: string };
	inputLabel?: string;
};
const AdditionalInfoStepContent = ({
	inTile,
	setExtensions,
	extensions,
	inputLabel
}: AdditionalInfoStepContentProps) => {
	const { t } = useTranslation(['changeMonitoring', 'userRevalidation']);
	const [extensionsToAdd, setExtensionsToAdd] = useState<string[]>([]);

	const { register, watch, reset } = useForm<AdditionalInfoAssetFormData>();
	const extensionInput = watch('extension');

	const addExtension = () => {
		const newExtensions =
			extensionInput.length &&
			extensionInput
				.split(',')
				.filter(ex => !extensionsToAdd.includes(ex.toLowerCase()))
				.map(ex => ex.replace(/[^a-zA-Z0-9-, ]/g, ''));
		newExtensions &&
			setExtensionsToAdd(old => [
				...old,
				...newExtensions.map(newEx => newEx.toLowerCase())
			]);
		reset({ extension: '' });
	};

	useEffect(() => {
		extensions
			? setExtensions(old => [
					...old.filter(el => el.assetId !== extensions?.assetId),
					{
						...extensions,
						extensions: [
							...extensions.extensions,
							...extensionsToAdd.filter(ex => !extensions.extensions.includes(ex))
						]
					}
			  ])
			: setExtensions(old =>
					old.map(el => {
						return {
							assetId: el.assetId,
							extensions: [
								...el.extensions,
								...extensionsToAdd.filter(ex => !el.extensions.includes(ex))
							]
						};
					})
			  );
	}, [extensions, extensionsToAdd, setExtensions]);
	return (
		<FullWidthColumn className='m-0'>
			<Layer level={inTile ? 1 : 2} className={`${inTile ? 'space-y-5' : 'space-y-5'}`}>
				<FullWidthColumn className='m-0'>
					<Layer level={inTile ? 1 : 2}>
						<div className='flex items-end space-x-3'>
							<TextInput
								id='extensions-ignore'
								labelText={inputLabel || t('changeMonitoring:extensions-to-ignore')}
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
					{!extensions
						? extensionsToAdd.map(ex => (
								<Tag
									filter
									onClose={() => setExtensionsToAdd(old => old.filter(el => el !== ex))}
									key={ex}
								>
									{ex}
								</Tag>
						  ))
						: extensions.extensions.map(ex => (
								<Tag
									filter
									onClose={() =>
										setExtensions(old => [
											...old.filter(el => el.assetId !== extensions?.assetId),
											{
												...extensions,
												extensions: extensions.extensions.filter(
													el => ex.toLowerCase() !== el.toLowerCase()
												)
											}
										])
									}
									key={`${extensions.assetId}-${ex}`}
								>
									{ex}
								</Tag>
						  ))}
				</FullWidthColumn>
			</Layer>
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContent;
