import Asset from '@model/Asset';
import { Grid, Column, TextInput, Layer, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
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
};

const AssetTileForm = ({ asset, register, index, watch }: AssetTileFormProps) => {
	const { t } = useTranslation(['applicationInstances', 'modals']);

	return (
		<Layer>
			<Grid narrow fullWidth className='space-y-5'>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-hostname-input`}
						labelText='Hostname *'
						{...register(`assets.${index}.hostname`, {
							required: { value: true, message: t('modals:field-required') }
						})}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ip-input`}
						labelText='IP *'
						{...register(`assets.${index}.ip`, {
							required: { value: true, message: t('modals:field-required') }
						})}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ports-input`}
						labelText={t('applicationInstances:ports')}
						placeholder={t('applicationInstances:ports-input-placeholder')}
						{...register(`assets.${index}.ports`)}
					/>
				</FullWidthColumn>
				<Column lg={8} md={4} sm={4}>
					<Select
						id={`${asset.id}-os-select`}
						labelText={`${t('applicationInstances:operating-system')} *`}
						{...register(`assets.${index}.os`, {
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
						id={`${asset.id}-type-select`}
						labelText={`${t('applicationInstances:asset-type')} *`}
						{...register(`assets.${index}.type`, {
							required: { value: true, message: t('modals:field-required') }
						})}
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
						disabled={watch(`assets.${index}.type`) === 'OS'}
						{...register(`assets.${index}.dbVersion`, {
							required: {
								value: watch(`assets.${index}.type`) !== 'OS',
								message: t('modals:field-required')
							}
						})}
					/>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-type-input`}
						labelText={`${t('applicationInstances:db-type')} ${
							watch(`assets.${index}.type`) !== 'OS' ? ' *' : ''
						}`}
						disabled={watch(`assets.${index}.type`) === 'OS'}
						{...register(`assets.${index}.dbType`, {
							required: {
								value: watch(`assets.${index}.type`) !== 'OS',
								message: t('modals:field-required')
							}
						})}
					/>
				</Column>
			</Grid>
		</Layer>
	);
};
export default AssetTileForm;
