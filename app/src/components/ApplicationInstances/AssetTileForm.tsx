import Asset from '@model/Asset';
import { Grid, Column, TextInput, Layer, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
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
};

const AssetTileForm = ({ asset, register, index }: AssetTileFormProps) => {
	const { t } = useTranslation('applicationInstances');

	return (
		<Layer>
			<Grid narrow fullWidth className='space-y-5'>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-hostname-input`}
						labelText='Hostname *'
						{...register(`assets.${index}.hostname`, {
							required: true
						})}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ip-input`}
						labelText='IP *'
						{...register(`assets.${index}.ip`, {
							required: true
						})}
					/>
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput
						id={`${asset.id}-ports-input`}
						labelText={`${t('ports')} *`}
						{...register(`assets.${index}.ports`, {
							required: true
						})}
					/>
				</FullWidthColumn>
				<Column lg={8} md={4} sm={4}>
					<Select
						id={`${asset.id}-os-select`}
						labelText={`${t('operating-system')} *`}
						{...register(`assets.${index}.os`, {
							required: true
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
						labelText={`${t('asset-type')} *`}
						{...register(`assets.${index}.type`, {
							required: true
						})}
					>
						<SelectItem text={t('operating-system')} value='OS' />
						<SelectItem text='Database' value='DB' />
					</Select>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-version-input`}
						labelText={`${t('db-version')} *`}
						{...register(`assets.${index}.dbVersion`, {
							required: true
						})}
					/>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-type-input`}
						labelText={`${t('db-type')} *`}
						{...register(`assets.${index}.dbType`, {
							required: true
						})}
					/>
				</Column>
			</Grid>
		</Layer>
	);
};
export default AssetTileForm;
