/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useRef, useState } from 'react';
import { Column, flexRender, RowData } from '@tanstack/react-table';
import DateFilter from '@components/table/filter/DateFilter';
import InputFilter from '@components/table/filter/InputFilter';
import CheckboxFilter from '@components/table/filter/CheckboxFilter';
import RadioFilter from '@components/table/filter/RadioFilter';
import DropdownFilter from '@components/table/filter/DropdownFilter';
import MultiSelectFilter from './MultiSelectFilter';
import SliderFilter from './SliderFilter';

interface FilterElementProps<T extends object> {
	column: Column<T, RowData>;
	filterContainerRef: HTMLElement;
	filteredValue: unknown;
	onFilterChange: (value: unknown) => void;
	tableId: string;
}

const FilterElement = <T extends object>({
	column,
	filterContainerRef,
	filteredValue,
	onFilterChange,
	tableId
}: FilterElementProps<T>) => {
	const [facetUniqueValues] = useState(
		[...column.getFacetedUniqueValues().keys()].filter(v => Boolean(v))
	);
	const firstValue = useRef(facetUniqueValues.at(0)).current;
	const sortedUniqueValues = useMemo(
		() => (typeof firstValue === 'string' ? facetUniqueValues.sort() : []),
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
			return <SliderFilter {...filterProps} />;
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
				if (column.columnDef.meta.filter.type === 'multiselect') {
					return (
						<MultiSelectFilter {...filterProps} sortedUniqueValues={sortedUniqueValues} />
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
