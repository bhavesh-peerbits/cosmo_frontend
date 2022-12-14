import {
	SkeletonText,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@carbon/react';
import { Column, HeaderGroup } from '@tanstack/react-table';
import ColumnHeader from './ColumnHeader';
import TableSize from './types/TableSize';

interface TableBodySkeletonProps<T> {
	headerGroups: HeaderGroup<T>[];
	isSelectable: boolean | undefined;
	tableSize: TableSize;
	allLeafColumns: Column<T>[];
	isExpandable: boolean | undefined;
}

const TableBodySkeleton = <T extends object>({
	tableSize,
	headerGroups,
	isSelectable,
	allLeafColumns,
	isExpandable
}: TableBodySkeletonProps<T>) => {
	return (
		<Table size={tableSize} className='overflow-hidden bg-layer-1'>
			<TableHead>
				{headerGroups.map((headerGroup, index) => (
					<TableRow key={`skeleton${headerGroup.id}`}>
						{isSelectable && headerGroups.length - 1 === index && (
							<TableHeader className='w-[48px]' scope='col' />
						)}
						{headerGroup.headers.map(header =>
							header.isPlaceholder ? (
								<TableHeader key={header.id} scope='col' />
							) : (
								<ColumnHeader key={header.id} header={header} />
							)
						)}
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{[...Array(40).keys()].map(el => (
					<TableRow key={el}>
						{isSelectable && (
							<TableCell className='pr-2'>
								<SkeletonText />
							</TableCell>
						)}
						{isExpandable && (
							<TableCell className='pr-2'>
								<SkeletonText />
							</TableCell>
						)}
						{allLeafColumns.map(c => (
							<TableCell key={`skeleton${el}${c.id}`}>
								<SkeletonText />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TableBodySkeleton;
