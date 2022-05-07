import { ChangeEvent, useEffect, useState } from 'react';
import {
	Checkbox,
	Tag,
	TextInput,
	unstable_OverflowMenuV2 as OverflowMenuV2
} from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import {
	ItemNoChildren,
	ItemType,
	NormalizeItem,
	sortItems
} from '@components/AddSelect/utilities';
import { MenuItem, renderMenuItem } from '@components/menuUtil';
import AddSelectList from './AddSelectList';
import AddSelectSort from './AddSelectSort';

const AddSelectColumn = ({
	columnInputPlaceholder,
	filteredItems,
	header,
	multiSelection = [],
	setMultiSelection,
	index,
	...props
}: AddSelectColumnProps) => {
	const [allSelected, setAllSelected] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortAttribute, setSortAttribute] = useState<keyof ItemType>('');
	const [filters, setFilters] = useState<string[]>([]);

	useEffect(() => {
		const isAllSelected = filteredItems.every(item => multiSelection.includes(item.id));
		setAllSelected(isAllSelected);
	}, [filteredItems, multiSelection]);

	// filtering
	const colFilterBy = filteredItems.find(item => item.filterBy)?.filterBy;
	const filterByOpts = colFilterBy
		? filteredItems.map(item => item[colFilterBy.attribute] as string)
		: [];

	const selectAllHandler = (checked: boolean) => {
		const itemIds = filteredItems.map(item => item.id);
		if (checked) {
			setMultiSelection?.([...multiSelection, ...itemIds]);
		} else {
			const newItems = multiSelection.filter(i => !itemIds.includes(i));
			setMultiSelection?.(newItems);
		}
	};

	const filterHandler = (checked: boolean, opt: string) => {
		if (checked) {
			const newFilters = [...filters, opt];
			setFilters(newFilters);
		} else {
			const newFilters = filters.filter(o => o !== opt);
			setFilters(newFilters);
		}
	};

	// filter and sort array functions
	const filterBySearch = (item: ItemNoChildren) =>
		item.title.toLowerCase().includes(searchTerm);

	const filterByAttribute = (item: ItemNoChildren) => {
		const { filterBy } = item;
		if (filters.length === 0 || !filterBy) {
			return true;
		}
		const filterByValue = item[filterBy.attribute];
		return filters.some(filter => filter === filterByValue);
	};

	const sortFn = sortItems(sortAttribute, sortDirection);

	const colItems = filteredItems
		.filter(filterBySearch) // first check if the item meets the search
		.filter(filterByAttribute) // then check if the item is included in the filter
		.sort(sortFn); // then sort the items by whatever criteria

	const menuItems: MenuItem[] = [
		{
			type: 'item',
			id: colFilterBy?.toString() || '',
			label: colFilterBy?.label || '',
			children: filterByOpts.map(i => ({
				type: 'selectable',
				id: i,
				label: i,
				initialChecked: filters.includes(i),
				onChange: checked => filterHandler(checked, i)
			}))
		}
	];
	return (
		<div className='max-w-[15rem] flex-[1_0_15rem] overflow-auto border-t-[1px] border-r-[1px] border-solid border-border-subtle-1 p-5'>
			<div className='flex items-end justify-end bg-field-2'>
				<TextInput
					value={searchTerm}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					placeholder={columnInputPlaceholder}
					id={`${index}-add-select`}
					labelText=''
				/>
				<div className='flex border-b-[1px] border-solid border-border-strong-1'>
					<AddSelectSort
						items={filteredItems}
						setSortAttribute={setSortAttribute}
						setSortDirection={setSortDirection}
						sortDirection={sortDirection}
						sortAttribute={sortAttribute}
					/>
					{filterByOpts.length > 0 && (
						<OverflowMenuV2 renderIcon={Filter} label='filter'>
							{menuItems.map(opt => renderMenuItem(opt))}
						</OverflowMenuV2>
					)}
				</div>
			</div>
			<div className='relative mt-5 mb-3 flex w-full items-center'>
				<Checkbox
					id={`${index}-checkbox-select-all`}
					checked={allSelected}
					onChange={(e, { checked }) => selectAllHandler(checked)}
					className='w-full'
					labelText={
						<div className='w-full'>
							<span className='ml-3'>{header}</span>
							<Tag className='absolute right-0 top-0' type='gray' size='sm'>
								{colItems.length}
							</Tag>
						</div>
					}
				/>
			</div>
			<AddSelectList
				{...props}
				shrink
				index={index}
				filteredItems={colItems}
				setMultiSelection={setMultiSelection}
				multiSelection={multiSelection}
			/>
		</div>
	);
};

interface AddSelectColumnProps {
	index: number;
	columnInputPlaceholder?: string;
	filteredItems: NormalizeItem[];
	header?: string;
	multiSelection?: string[];
	setMultiSelection?: (multiSelection: string[]) => void;
}

export default AddSelectColumn;
