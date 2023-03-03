import { memo, RowData, Table } from '@tanstack/react-table';

export default function getFacetedUniqueValues<TData extends RowData>(): (
	table: Table<TData>,
	columnId: string
) => () => Map<any, number> {
	return (table, columnId) =>
		memo(
			() => [table.getPreFilteredRowModel().rows],
			facetedRowModel => {
				if (!facetedRowModel) return new Map();

				const facetedUniqueValues = new Map<any, number>();

				facetedRowModel.forEach(facetedRow => {
					const values = facetedRow.getUniqueValues<number>(columnId);
					values.forEach(value => {
						if (facetedUniqueValues.has(value)) {
							facetedUniqueValues.set(value, (facetedUniqueValues.get(value) ?? 0) + 1);
						} else {
							facetedUniqueValues.set(value, 1);
						}
					});
				});

				return facetedUniqueValues;
			},
			{
				key:
					process.env.NODE_ENV === 'development' && `getFacetedUniqueValues_${columnId}`,
				debug: () => table.options.debugAll ?? table.options.debugTable,
				onChange: () => {}
			}
		);
}
