/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useRef } from 'react';
import { Column, flexRender, RowData } from '@tanstack/react-table';
import DateFilter from '@components/table/filter/DateFilter';
import NumberFilter from '@components/table/filter/NumberFilter';
import InputFilter from '@components/table/filter/InputFilter';
import CheckboxFilter from '@components/table/filter/CheckboxFilter';
import RadioFilter from '@components/table/filter/RadioFilter';
import DropdownFilter from '@components/table/filter/DropdownFilter';

interface FilterElementProps<T extends object> {
	column: Column<T, RowData>;
	prefilteredValue: unknown;
	filterContainerRef: HTMLElement;
	filteredValue: unknown;
	onFilterChange: (value: unknown) => void;
	tableId: string;
}

const FilterElement = <T extends object>({
	column,
	prefilteredValue,
	filterContainerRef,
	filteredValue,
	onFilterChange,
	tableId
}: FilterElementProps<T>) => {
	const firstValue = useRef(prefilteredValue).current;
	const facetUniqueValues = column.getFacetedUniqueValues().keys();

	const sortedUniqueValues = useMemo(
		() => (typeof firstValue === 'string' ? Array.from(facetUniqueValues).sort() : []),
		[facetUniqueValues, firstValue]
	);

	const label =
		(column.columnDef.meta?.filter?.enabled && column.columnDef.meta?.filter?.label) ||
		// @ts-ignore
		flexRender(column.columnDef.header, { column }) ||
		column.id;

	const filterProps = {
		onFilterChange,
		filteredValue,
		column,
		tableId,
		label
	};

	switch (typeof firstValue) {
		case 'number':
			return <NumberFilter {...filterProps} />;
		case 'string':
			if (
				column.columnDef.meta?.filter &&
				column.columnDef.meta.filter.enabled !== false
			) {
				if (column.columnDef.meta.filter.type === 'checkbox') {
					return (
						<CheckboxFilter {...filterProps} sortedUniqueValues={sortedUniqueValues} />
					);
				}
				if (column.columnDef.meta.filter.type === 'radio') {
					return <RadioFilter {...filterProps} sortedUniqueValues={sortedUniqueValues} />;
				}
				if (column.columnDef.meta.filter.type === 'dropdown') {
					return (
						<DropdownFilter {...filterProps} sortedUniqueValues={sortedUniqueValues} />
					);
				}
			}
			return <InputFilter {...filterProps} sortedUniqueValues={sortedUniqueValues} />;
		case 'object':
			if (firstValue instanceof Date) {
				return <DateFilter {...filterProps} filterContainerRef={filterContainerRef} />;
			}
			return null;
		default:
			return null;
	}
};
export default FilterElement;
