import { FC, ReactNode } from 'react';
import { TableExpandedRow, TableExpandRow, TableRow } from '@carbon/react';
import { Row } from '@tanstack/react-table';

interface ExpandableRowProps<T> {
	isExpandable: boolean | undefined;
	row: Row<T>;
	SubComponent: FC<{ row: Row<T> }> | undefined;
	colSpan: number;
	children: ReactNode;
}

const ExpandableRow = <T extends object>({
	isExpandable,
	row,
	SubComponent,
	colSpan,
	children
}: ExpandableRowProps<T>) => {
	return isExpandable && SubComponent ? (
		<>
			<TableExpandRow
				id={row.id}
				ariaLabel={`row-${row.id}`}
				isExpanded={row.getIsExpanded()}
				onExpand={() => row.toggleExpanded()}
			>
				{children}
			</TableExpandRow>
			<TableExpandedRow colSpan={colSpan}>
				<SubComponent row={row} />
			</TableExpandedRow>
		</>
	) : (
		<TableRow>{children}</TableRow>
	);
};

export default ExpandableRow;
