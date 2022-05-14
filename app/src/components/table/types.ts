import { ColumnDef, Overwrite, Render } from '@tanstack/react-table';
import { ReactElement, ReactNode } from 'react';

export type CellProperties<D extends object, V> = Parameters<
	NonNullable<
		Exclude<
			ColumnDef<
				Overwrite<
					{ Renderer: Render; Rendered: ReactNode | JSX.Element; Row: unknown },
					{ Row: D }
				> & { Value: V }
			>['cell'],
			string
		>
	>
>[0];

export interface CosmoTableToolbarProps<T extends object> {
	selectionIds: T[];
	onCancel: () => void;
	toolbarBatchActions: Array<{
		id: string;
		icon: (() => ReactElement) | ReactElement;
		label: string;
		onClick: (selectionIds: T[]) => void;
	}>;
	toolbarContent?: ReactNode;
}
