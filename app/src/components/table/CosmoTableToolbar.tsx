import {
	TableBatchAction,
	TableBatchActions,
	TableToolbar,
	TableToolbarContent
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { CosmoTableToolbarProps } from '@components/table/types';
import { TableGenerics } from '@tanstack/react-table';

const CosmoTableToolbar = <T extends TableGenerics>({
	selectionIds,
	onCancel,
	toolbarBatchActions,
	toolbarContent
}: CosmoTableToolbarProps<T>) => {
	const { t } = useTranslation('table');
	return (
		<TableToolbar>
			<TableBatchActions
				onCancel={onCancel}
				totalSelected={selectionIds.length}
				shouldShowBatchActions={selectionIds.length > 0}
				translateWithId={t}
			>
				{toolbarBatchActions.map(action => (
					<TableBatchAction
						key={action.id}
						renderIcon={action.icon}
						onClick={() => action.onClick(selectionIds)}
					>
						{action.label}
					</TableBatchAction>
				))}
			</TableBatchActions>
			{toolbarContent && <TableToolbarContent>{toolbarContent}</TableToolbarContent>}
		</TableToolbar>
	);
};

export default CosmoTableToolbar;
