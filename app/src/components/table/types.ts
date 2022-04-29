import { ColumnDef, Renderable, Table } from '@tanstack/react-table';
import { ReactElement, ReactNode } from 'react';

type TableType<D extends object> = {
	Render: <TProps extends object>(
		Comp: Renderable<TProps>,
		props: TProps
	) => React.ReactNode;
	Row: D;
};

export type CellProperties<D extends object, V> = Parameters<
	NonNullable<Exclude<ColumnDef<TableType<D> & { Value: V | undefined }>['cell'], string>>
>[0];

export type HeaderFunction<D extends object> = (
	tableInstance: Table<TableType<D>>
) => ColumnDef<TableType<D>>[];

export interface CosmoTableToolbarProps {
	selectionIds: number;
	onCancel: () => void;
	toolbarBatchActions: Array<{
		id: string;
		icon: (() => ReactElement) | ReactElement;
		label: string;
		onClick: () => void;
	}>;
	toolbarContent?: ReactNode;
}
