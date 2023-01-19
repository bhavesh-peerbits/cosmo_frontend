import Asset from '@model/Asset';
import { Grid, Column, TextInput, Layer, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

type AssetTileFormProps = {
	asset: Asset;
};

const AssetTileForm = ({ asset }: AssetTileFormProps) => {
	const { t } = useTranslation('applicationInstances');

	return (
		<Layer>
			<Grid narrow fullWidth className='space-y-5'>
				<FullWidthColumn>
					<TextInput id={`${asset.id}-hostname-input`} labelText='Hostname *' />
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput id={`${asset.id}-ip-input`} labelText='IP *' />
				</FullWidthColumn>
				<FullWidthColumn>
					<TextInput id={`${asset.id}-ports-input`} labelText={`${t('ports')} *`} />
				</FullWidthColumn>
				<Column lg={8} md={4} sm={4}>
					<Select id={`${asset.id}-os-select`} labelText={`${t('operating-system')} *`}>
						<SelectItem text='Windows' value='WINDOWS' />
						<SelectItem text='Unix' value='UNIX' />
						<SelectItem text='Mainframe' value='MAINFRAME' />
					</Select>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<Select id={`${asset.id}-type-select`} labelText={`${t('asset-type')} *`}>
						<SelectItem text={t('operating-system')} value='OS' />
						<SelectItem text='Database' value='DB' />
					</Select>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput
						id={`${asset.id}-db-version-input`}
						labelText={`${t('db-version')} *`}
					/>
				</Column>
				<Column lg={8} md={4} sm={4}>
					<TextInput id={`${asset.id}-db-type-input`} labelText={`${t('db-type')} *`} />
				</Column>
			</Grid>
		</Layer>
	);
};
export default AssetTileForm;
