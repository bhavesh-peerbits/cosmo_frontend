import Asset from '@model/Asset';
import { Grid, Column, TextInput, Layer, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AssetDtoTypeEnum, AssetDtoOsEnum, PathDto } from 'cosmo-api/src/v1';
import useGetAllAssetsTenant from '@api/asset/useGetAllAssetsTenant';

export interface AssetFormData {
	hostname: string;
	ports: string;
	type: AssetDtoTypeEnum;
	os: AssetDtoOsEnum;
	ip: string;
	dbVersion: string;
	dbType: string;
	cpe: string;
	paths: PathDto[];
}

type AssetTileFormProps = {
	asset: Asset;
	readOnly?: boolean;
	register: UseFormRegister<AssetFormData>;
	watch: UseFormWatch<AssetFormData>;
	errors: FieldErrors<AssetFormData>;
};

const AssetTileForm = ({
	asset,
	readOnly,
	register,
	watch,
	errors
}: AssetTileFormProps) => {
	const { t } = useTranslation(['applicationInstances', 'modals']);
	const { data: allAssets } = useGetAllAssetsTenant();
	const allHostnameIpPairs = allAssets?.map(a => {
		return { hostname: a.hostname, ip: `${a.ip}` };
	});

	return (
		<Layer>
			<Grid narrow fullWidth className='space-y-5'>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-hostname-input`}
						placeholder={t('applicationInstances:hostname-placeholder')}
						labelText='Hostname *'
						invalid={Boolean(errors.hostname)}
						invalidText={errors.hostname?.message}
						{...register('hostname', {
							required: { value: true, message: t('modals:field-required') },
							validate: hostname =>
								!allHostnameIpPairs?.find(
									a => a.hostname === hostname && a.ip === watch('ip')
								) || t('applicationInstances:hostname-ip-error')
						})}
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ip-input`}
						labelText='IP *'
						placeholder={t('applicationInstances:ip-placeholder')}
						invalid={Boolean(errors.ip)}
						invalidText={errors.ip?.message}
						{...register('ip', {
							required: { value: true, message: t('modals:field-required') },
							validate: ip =>
								!allHostnameIpPairs?.find(
									a => a.hostname === watch('hostname') && a.ip === ip
								) || t('applicationInstances:hostname-ip-error'),
							pattern: {
								message: t('applicationInstances:ip-pattern-error'),
								value:
									/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/
							}
						})}
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-cpe-input`}
						labelText='CPE'
						placeholder='Customer Premises Equipment'
						readOnly={readOnly}
						{...register('cpe')}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ports-input`}
						labelText={t('applicationInstances:ports')}
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
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<Column lg={8} md={4} sm={4}>
					<Select
						id={`${asset.id}-os-select`}
						labelText={`${t('applicationInstances:operating-system')} *`}
						{...register('os', {
							required: { value: true, message: t('modals:field-required') }
						})}
						readOnly={readOnly}
					>
						<SelectItem text='Windows' value='WINDOWS' />
						<SelectItem text='Unix' value='UNIX' />
						<SelectItem text='Mainframe' value='MAINFRAME' />
					</Select>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<Select
						id={`${asset.id}-type-select`}
						labelText={`${t('applicationInstances:asset-type')} *`}
						{...register('type', {
							required: { value: true, message: t('modals:field-required') }
						})}
						readOnly={readOnly}
					>
						<SelectItem text={t('applicationInstances:operating-system')} value='OS' />
						<SelectItem text='Database' value='DB' />
					</Select>
				</Column>
				{watch('type') !== 'OS' && (
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id={`${asset.id}-db-version-input`}
							labelText={`${t('applicationInstances:db-version')} ${
								watch('type') !== 'OS' ? ' *' : ''
							}`}
							placeholder={t('applicationInstances:db-version-placeholder')}
							invalid={Boolean(errors.dbVersion)}
							invalidText={errors.dbVersion?.message}
							disabled={watch('type') === 'OS'}
							{...register('dbVersion', {
								required: {
									value: watch('type') !== 'OS',
									message: t('modals:field-required')
								}
							})}
							readOnly={readOnly}
						/>
					</Column>
				)}
				{watch('type') !== 'OS' && (
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id={`${asset.id}-db-type-input`}
							labelText={`${t('applicationInstances:db-type')} ${
								watch('type') !== 'OS' ? ' *' : ''
							}`}
							placeholder={t('applicationInstances:db-type-placeholder')}
							invalid={Boolean(errors.dbType)}
							invalidText={errors.dbType?.message}
							disabled={watch('type') === 'OS'}
							{...register('dbType', {
								required: {
									value: watch('type') !== 'OS',
									message: t('modals:field-required')
								}
							})}
							readOnly={readOnly}
						/>
					</Column>
				)}
			</Grid>
		</Layer>
	);
};
export default AssetTileForm;
