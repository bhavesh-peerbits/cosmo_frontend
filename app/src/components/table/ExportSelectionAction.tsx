import { DocumentPdf, TableSplit } from '@carbon/react/icons';
import { useBoolean } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { OverflowMenu, TableBatchAction } from '@carbon/react';
import AvailableFileType from './types/FileType';

const ExportSelectionAction = ({
	exportFn
}: {
	exportFn: (fileType: AvailableFileType, all: 'selection') => void;
}) => {
	const [val, { setTrue, setFalse }] = useBoolean(false);
	const { t } = useTranslation('table');
	const actions = [
		{
			id: 'pdf',
			label: t('download-pdf'),
			onClick: () => {
				exportFn('pdf', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		},
		{
			id: 'xlsx',
			label: t('download-xlsx'),
			onClick: () => {
				exportFn('xlsx', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		},
		{
			id: 'csv',
			label: t('download-csv'),
			onClick: () => {
				exportFn('csv', 'selection');
				setFalse();
			},
			icon: DocumentPdf
		}
	];
	return (
		<TableBatchAction renderIcon={TableSplit} onClick={() => setTimeout(() => setTrue())}>
			{t('export')}
			<OverflowMenu
				menuOffsetFlip={{ top: 20, left: -50 }}
				open={val}
				onClose={() => setFalse()}
				className='h-0 w-0 opacity-0'
				iconDescription=''
				ariaLabel=''
				flipped
			>
				{actions.map(action => (
					<li key={action.id}>
						<TableBatchAction
							className='z-[1] -mt-1 w-full outline outline-1'
							renderIcon={action.icon}
							onClick={action.onClick}
						>
							{action.label}
						</TableBatchAction>
					</li>
				))}
			</OverflowMenu>
		</TableBatchAction>
	);
};

export default ExportSelectionAction;
