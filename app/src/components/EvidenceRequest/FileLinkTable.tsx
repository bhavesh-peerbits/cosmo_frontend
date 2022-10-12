import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import FileLink from '@model/FileLink';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const FileLinkTable = ({ files }: { files: FileLink[] }) => {
	const { t } = useTranslation('evidenceRequest');
	const columns: HeaderFunction<FileLink> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('file-link-name')
			}),
			table.createDataColumn(row => row.type, {
				id: 'type',
				header: t('file-link-type')
			}),
			table.createDataColumn(row => row.dimension, {
				id: 'owner',
				header: t('file-link-dimension')
			})
		],
		[t]
	);
	return <CosmoTable createHeaders={columns} data={files} />;
};

export default FileLinkTable;
