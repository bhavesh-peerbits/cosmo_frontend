/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, Overwrite, Render } from '@tanstack/react-table';
import { ReactElement, ReactNode } from 'react';

export type AvailableFileType = 'csv' | 'xlsx' | 'pdf';

export type ExportProperties = {
	disableExport?: boolean;
	exportableFn?: (info: any) => string;
	exportLabel?: () => string;
};

export type TB<D> = Overwrite<
	{
		Renderer: Render;
		Rendered: ReactNode | JSX.Element;
		Row: unknown;
		ColumnMeta: unknown;
	},
	{
		Row: D;
		ColumnMeta: ExportProperties;
	}
>;

export type CellProperties<D extends object, V> = Parameters<
	NonNullable<Exclude<ColumnDef<TB<D> & { Value: V }>['cell'], string>>
>[0];

export interface CosmoTableToolbarProps<T extends object> {
	selectionIds?: T[];
	onCancel?: () => void;
	toolbarBatchActions?: Array<{
		id: string;
		icon: (() => ReactElement) | ReactElement;
		label: string;
		onClick: (selectionIds: T[]) => void;
	}>;
	onExportClick: (fileType: AvailableFileType, all?: boolean | 'selection') => void;
	toolbarContent?: ReactNode;
	disableExport?: boolean;
	excludeCurrentView?: boolean;
}
