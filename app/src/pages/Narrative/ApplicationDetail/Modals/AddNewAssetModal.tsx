import ApiError from '@api/ApiError';
import useGetAllAssetsTenant from '@api/asset/useGetAllAssetsTenant';
import useCreateAsset from '@api/instance-asset/useCreateAsset';
import {
	Form,
	Grid,
	TextInput,
	Column,
	Select,
	SelectItem,
	InlineNotification
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import Instance from '@model/Instance';
import { AssetDtoTypeEnum, AssetDtoOsEnum } from 'cosmo-api/src/v1';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewAssetFormData = {
	hostname: string;
	ports: string;
	type: AssetDtoTypeEnum;
	os: AssetDtoOsEnum;
	ip: string;
	dbVersion: string;
	dbType: string;
	cpe: string;
};

type AddNewAssetModalProps = {
	isOpen: 'new' | 'existing' | undefined;
	setIsOpen: Dispatch<SetStateAction<'new' | 'existing' | undefined>>;
	instance: Instance;
};
const AddNewAssetModal = ({ isOpen, setIsOpen, instance }: AddNewAssetModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);
	const { mutate, isError, error, isLoading, reset: resetApi } = useCreateAsset();

	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { isValid, errors }
	} = useForm<NewAssetFormData>({ mode: 'onChange' });

	const cleanUp = () => {
		setIsOpen(undefined);
		resetApi();
		reset();
	};
	const { data: allAssets } = useGetAllAssetsTenant();
	const allHostnameIpPairs = allAssets?.map(asset => {
		return { hostname: asset.hostname, ip: `${asset.ip}` };
	});

	const createAsset = (data: NewAssetFormData) => {
		const { dbType, dbVersion, hostname, ip, os, type, ports, cpe } = data;
		return mutate(
			{
				appId: instance.application.id,
				instanceId: instance.id,
				asset: {
					id: '',
					paths: [],
					dbType,
					dbVersion,
					hostname,
					ip,
					os,
					cpe,
					ports: ports.replace(/,*$/, ''),
					type
				}
			},
			{ onSuccess: () => cleanUp() }
		);
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			label={instance.name}
			title={t('applicationInstances:add-new-asset-instance')}
			open={isOpen === 'new'}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-send-focal-point'
				},
				{
					label: t('modals:create'),
					id: 'send-focal-point',
					disabled: !isValid || isLoading,
					onClick: handleSubmit(createAsset)
				}
			]}
		>
			<Form className='space-y-5 pl-5'>
				<Grid narrow fullWidth className='space-y-5'>
					<FullWidthColumn>
						<TextInput
							id='new-asset-hostname-input'
							labelText='Hostname *'
							autoComplete='off'
							placeholder={t('applicationInstances:hostname-placeholder')}
							invalid={Boolean(errors.hostname)}
							invalidText={errors.hostname?.message}
							{...register('hostname', {
								required: { value: true, message: t('modals:field-required') },
								validate: hostname =>
									!allHostnameIpPairs?.find(
										asset => asset.hostname === hostname && asset.ip === watch('ip')
									) || t('applicationInstances:hostname-ip-error')
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						<TextInput
							id='new-asset-ip-input'
							labelText='IP *'
							autoComplete='off'
							placeholder={t('applicationInstances:ip-placeholder')}
							invalid={Boolean(errors.ip)}
							invalidText={errors.ip?.message}
							{...register('ip', {
								required: { value: true, message: t('modals:field-required') },
								validate: ip =>
									!allHostnameIpPairs?.find(
										asset => asset.hostname === watch('hostname') && asset.ip === ip
									) || t('applicationInstances:hostname-ip-error'),
								pattern: {
									message: 'Should be ipv4 o ipv6',
									value:
										/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/
								}
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						<TextInput
							id='new-asset-cpe-input'
							labelText='CPE'
							autoComplete='off'
							placeholder='Customer Premises Equipment'
							{...register('cpe')}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						<TextInput
							id='new-asset-ports-input'
							labelText={t('applicationInstances:ports')}
							autoComplete='off'
							placeholder={t('applicationInstances:ports-input-placeholder')}
							invalid={Boolean(errors.ports)}
							invalidText={errors.ports?.message}
							{...register('ports', {
								pattern: {
									value: /^([0-9]+,?)+$/,
									message: t('applicationInstances:error-ports-input')
								},
								validate: ports =>
									ports.length > 0
										? ports.split(',').every(port => +port < 65535) ||
										  t('applicationInstances:erros-ports-greater')
										: undefined
							})}
						/>
					</FullWidthColumn>
					<Column lg={8} md={4} sm={4}>
						<Select
							id='new-asset-os-select'
							labelText={`${t('applicationInstances:operating-system')} *`}
							{...register(`os`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						>
							<SelectItem text='Windows' value='WINDOWS' />
							<SelectItem text='Unix' value='UNIX' />
							<SelectItem text='Mainframe' value='MAINFRAME' />
						</Select>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<Select
							id='new-asset-type-select'
							labelText={`${t('applicationInstances:asset-type')} *`}
							{...register(`type`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						>
							<SelectItem text={t('applicationInstances:operating-system')} value='OS' />
							<SelectItem text='Database' value='DB' />
						</Select>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id='new-asset-db-version-input'
							labelText={`${t('applicationInstances:db-version')} ${
								watch(`type`) !== 'OS' ? ' *' : ''
							}`}
							autoComplete='off'
							invalid={Boolean(errors.dbVersion)}
							invalidText={errors.dbVersion?.message}
							disabled={watch(`type`) === 'OS'}
							{...register(`dbVersion`, {
								required: {
									value: watch(`type`) !== 'OS',
									message: t('modals:field-required')
								}
							})}
						/>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id='new-asset-db-type-input'
							labelText={`${t('applicationInstances:db-type')} ${
								watch(`type`) !== 'OS' ? ' *' : ''
							}`}
							autoComplete='off'
							invalid={Boolean(errors.dbType)}
							invalidText={errors.dbType?.message}
							disabled={watch(`type`) === 'OS'}
							{...register(`dbType`, {
								required: {
									value: watch(`type`) !== 'OS',
									message: t('modals:field-required')
								}
							})}
						/>
					</Column>
					{isError && (
						<FullWidthColumn className='mt-5 flex items-center justify-center'>
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(error as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						</FullWidthColumn>
					)}
				</Grid>
			</Form>
		</TearsheetNarrow>
	);
};
export default AddNewAssetModal;
