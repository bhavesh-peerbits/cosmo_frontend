import CosmoTable, { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import FileLink from '@model/FileLink';
import { useCallback } from 'react';
import { Link } from '@carbon/react';
import { useTranslation } from 'react-i18next';

const FileLinkTable = ({ files }: { files: FileLink[] }) => {
	const { t } = useTranslation('evidenceRequest');

	const linkCell = useCallback(
		(
			info: CellProperties<
				FileLink,
				{ name: string | undefined; link: string | undefined }
			>
		) => (
			<div className='flex items-center space-x-2'>
				<Link href={info.getValue().link}>{info.getValue().name}</Link>
			</div>
		),
		[]
	);
	const columns: HeaderFunction<FileLink> = useCallback(
		table => [
			table.createDataColumn(row => ({ name: row.name, link: row.link }), {
				id: 'name',
				header: t('file-link-name'),
				cell: linkCell
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
		[linkCell, t]
	);
	return <CosmoTable createHeaders={columns} data={files} />;
};

export default FileLinkTable;
