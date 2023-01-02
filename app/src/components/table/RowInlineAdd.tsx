import { ColumnDef } from '@tanstack/react-table';
import { TableCell } from '@carbon/react';

interface RowInlineAddProps<T> {
	columns: ColumnDef<T>[];
	// setAddingInline: (addingInline: boolean) => void;
}

const RowInlineAdd = <T extends object>({
	columns
}: // setAddingInline
RowInlineAddProps<T>) => {
	return (
		<>
			{columns.map(col => {
				// const colType = col.meta?.type;
				// if (colType === 'string') {
				// return (
				// 	<TableCell key={col.id}>
				// 		<div className='flex h-full w-full items-center'>
				// 			<TextInput id={col.id ?? `input${index}`} labelText='' />
				// 		</div>
				// 	</TableCell>
				// );
				// }
				return (
					<TableCell key={col.id}>
						<div className='flex h-full w-full items-center'> </div>
					</TableCell>
				);
			})}
		</>
	);
};

export default RowInlineAdd;
