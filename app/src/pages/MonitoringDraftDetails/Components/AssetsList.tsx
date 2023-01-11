import {
	StructuredListCell,
	StructuredListBody,
	StructuredListRow,
	StructuredListWrapper,
	StructuredListHead
} from '@carbon/react';
import Asset from '@model/Asset';
import { useTranslation } from 'react-i18next';

type AssetListProps = {
	assets: Asset[];
};
const AssetsList = ({ assets }: AssetListProps) => {
	const { t } = useTranslation('changeMonitoring');
	return (
		<StructuredListWrapper>
			<StructuredListHead>
				<StructuredListRow head>
					<StructuredListCell head>Hostname</StructuredListCell>
					<StructuredListCell head>IP</StructuredListCell>
					<StructuredListCell head>{t('type')}</StructuredListCell>
					<StructuredListCell head>{t('operating-system')}</StructuredListCell>
					{assets.some(a => a.type === 'DB') && (
						<StructuredListCell head>{t('db-type')}</StructuredListCell>
					)}
					{assets.some(a => a.type === 'DB') && (
						<StructuredListCell head>{t('db-version')}</StructuredListCell>
					)}
					<StructuredListCell head>CPE</StructuredListCell>
				</StructuredListRow>
			</StructuredListHead>

			<StructuredListBody>
				{assets.map(asset => (
					<StructuredListRow>
						<StructuredListCell noWrap>{asset.hostname}</StructuredListCell>
						<StructuredListCell>{asset.ip}</StructuredListCell>
						<StructuredListCell>{asset.type}</StructuredListCell>
						<StructuredListCell>{asset.os}</StructuredListCell>
						<StructuredListCell>{asset.dbType ?? '-'}</StructuredListCell>
						<StructuredListCell>{asset.dbVersion ?? '-'}</StructuredListCell>
						<StructuredListCell>HERE GOES CPE</StructuredListCell>
					</StructuredListRow>
				))}
			</StructuredListBody>
		</StructuredListWrapper>
	);
};
export default AssetsList;
