import Asset from '@model/Asset';
import { Grid, Column, TextInput, Layer, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AssetDtoTypeEnum, AssetDtoOsEnum } from 'cosmo-api/src/v1';

export interface ApplicationInstanceFormData {
	name: string;
	description: string;
	assets: {
		hostname: string;
		ports: string;
		type: AssetDtoTypeEnum;
		os: AssetDtoOsEnum;
		ip: string;
		dbVersion: string;
		dbType: string;
		key: string;
	}[];
}

type AssetTileFormProps = {
	asset: Asset;
	register: UseFormRegister<ApplicationInstanceFormData>;
	index: number;
	watch: UseFormWatch<ApplicationInstanceFormData>;
	errors: FieldErrors<ApplicationInstanceFormData>;
	readOnly?: boolean;
};

// TODO remove last comma in ports

const AssetTileForm = ({
	asset,
	register,
	index,
	watch,
	errors,
	readOnly
}: AssetTileFormProps) => {
	const { t } = useTranslation(['applicationInstances', 'modals']);

	return (
		<Layer>
			<Grid narrow fullWidth className='space-y-5'>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-hostname-input`}
						placeholder={t('applicationInstances:hostname-placeholder')}
						labelText='Hostname *'
						invalid={Boolean(errors.assets?.[index]?.hostname)}
						invalidText={errors.assets?.[index]?.hostname?.message}
						{...register(`assets.${index}.hostname`, {
							required: { value: true, message: t('modals:field-required') }
						})}
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ip-input`}
						labelText='IP *'
						placeholder={t('applicationInstances:ip-placeholder')}
						invalid={Boolean(errors.assets?.[index]?.ip)}
						invalidText={errors.assets?.[index]?.ip?.message}
						{...register(`assets.${index}.ip`, {
							required: { value: true, message: t('modals:field-required') }
						})}
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ports-input`}
						labelText={t('applicationInstances:ports')}
						placeholder={t('applicationInstances:ports-input-placeholder')}
						invalid={Boolean(errors.assets?.[index]?.ports)}
						invalidText={errors.assets?.[index]?.ports?.message}
						{...register(`assets.${index}.ports`, {
							pattern: {
								value: /^([0-9]+,?)+$/,
								message: t('applicationInstances:error-ports-input')
							},
							validate: ports =>
								ports.length > 0 &&
								(ports.split(',').every(port => +port < 65535) ||
									t('applicationInstances:erros-ports-greater'))
						})}
						readOnly={readOnly}
					/>
				</FullWidthColumn>
				<Column lg={8} md={4} sm={4}>
					<Select
						id={`${asset.id}-os-select`}
						labelText={`${t('applicationInstances:operating-system')} *`}
						{...register(`assets.${index}.os`, {
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
						{...register(`assets.${index}.type`, {
							required: { value: true, message: t('modals:field-required') }
						})}
						readOnly={readOnly}
					>
						<SelectItem text={t('applicationInstances:operating-system')} value='OS' />
						<SelectItem text='Database' value='DB' />
					</Select>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-version-input`}
						labelText={`${t('applicationInstances:db-version')} ${
							watch(`assets.${index}.type`) !== 'OS' ? ' *' : ''
						}`}
						placeholder='here goes placeholder'
						invalid={Boolean(errors.assets?.[index]?.dbVersion)}
						invalidText={errors.assets?.[index]?.dbVersion?.message}
						disabled={watch(`assets.${index}.type`) === 'OS'}
						{...register(`assets.${index}.dbVersion`, {
							required: {
								value: watch(`assets.${index}.type`) !== 'OS',
								message: t('modals:field-required')
							}
						})}
						readOnly={readOnly}
					/>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-type-input`}
						labelText={`${t('applicationInstances:db-type')} ${
							watch(`assets.${index}.type`) !== 'OS' ? ' *' : ''
						}`}
						placeholder='here goes placeholder'
						invalid={Boolean(errors.assets?.[index]?.dbType)}
						invalidText={errors.assets?.[index]?.dbType?.message}
						disabled={watch(`assets.${index}.type`) === 'OS'}
						{...register(`assets.${index}.dbType`, {
							required: {
								value: watch(`assets.${index}.type`) !== 'OS',
								message: t('modals:field-required')
							}
						})}
						readOnly={readOnly}
					/>
				</Column>
			</Grid>
		</Layer>
	);
};
export default AssetTileForm;
