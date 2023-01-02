import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { CheckmarkFilled, CheckmarkOutline, SubtractAlt } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellBoolean = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value && <CheckmarkFilled />;
};

type PathAssetTableProps = {
	isSameSetup?: boolean;
	data: { path: string; included: boolean }[];
	assetId?: string;
	canAdd?: boolean;
	setData?: Dispatch<
		SetStateAction<
			{
				included: boolean;
				path: string;
			}[]
		>
	>;
};
const PathAssetTable = ({
	isSameSetup,
	data,
	assetId,
	canAdd,
	setData
}: PathAssetTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);

	const columns = useMemo<ColumnDef<{ path: string; included: boolean }>[]>(() => {
		const ArrayCol: ColumnDef<{ path: string; included: boolean }>[] = [
			{
				id: isSameSetup ? 'included-same-setup' : `included-${assetId}`,
				accessorFn: row => row.included,
				cell: CellBoolean,
				header: t('changeMonitoring:included')
			},
			{
				id: isSameSetup ? 'path-same-setup' : `path-${assetId}`,
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1
			}
		];
		return ArrayCol;
	}, [assetId, isSameSetup, t]);

	const toolbarBatchActions = [
		{
			id: 'include',
			label: t('changeMonitoring:include'),
			icon: CheckmarkOutline,
			onClick: (selectionElements: { path: string; included: boolean }[]) => {
				setData &&
					setData(old =>
						old.map(element => {
							return selectionElements.includes(element)
								? { ...element, included: true }
								: element;
						})
					);
			}
		},
		{
			id: 'exclude',
			label: t('changeMonitoring:exclude'),
			icon: SubtractAlt,
			onClick: (selectionElements: { path: string; included: boolean }[]) => {
				setData &&
					setData(old =>
						old.map(element => {
							return selectionElements.includes(element)
								? { ...element, included: false }
								: element;
						})
					);
			}
		}
	];

	return (
		<CosmoTable
			tableId='path-asset-table'
			columns={columns}
			noDataMessage={t('table:no-data')}
			isColumnOrderingEnabled
			canAdd={canAdd}
			toolbar={{
				searchBar: true,
				toolbarBatchActions,
				toolbarTableMenus: []
			}}
			exportFileName={({ all }) => (all ? 'answers-all' : 'answers-selection')}
			data={data}
			isSelectable
		/>
	);
};
export default PathAssetTable;
