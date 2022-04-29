import {
	TableBatchAction,
	TableBatchActions,
	TableToolbar,
	TableToolbarContent
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { CosmoTableToolbarProps } from '@components/table/types';

const CosmoTableToolbar = ({
	selectionIds,
	onCancel,
	toolbarBatchActions,
	toolbarContent
}: CosmoTableToolbarProps) => {
	const { t } = useTranslation('table');
	return (
		<TableToolbar>
			<TableBatchActions
				onCancel={onCancel}
				totalSelected={selectionIds}
				shouldShowBatchActions={selectionIds > 0}
				translateWithId={t}
			>
				{toolbarBatchActions.map(action => (
					<TableBatchAction
						key={action.id}
						renderIcon={action.icon}
						onClick={action.onClick}
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
