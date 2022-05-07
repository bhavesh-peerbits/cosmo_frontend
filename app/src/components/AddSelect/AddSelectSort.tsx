import { unstable_OverflowMenuV2 as OverflowMenuV2 } from '@carbon/react';
import { ArrowsVertical } from '@carbon/react/icons';
import { ItemNoChildren, ItemType } from '@components/AddSelect/utilities';
import { MenuItem, renderMenuItem } from '@components/menuUtil';

const AddSelectSort = ({
	items,
	setSortAttribute,
	setSortDirection,
	sortDirection,
	sortAttribute
}: AddSelectSortProps) => {
	// sorting
	const sortBy = items.find(item => item.sortBy)?.sortBy;
	const sortByOpts = sortBy
		? sortBy.map(({ label, attribute }) => ({
				name: attribute.toString(),
				label
		  }))
		: [];

	const sortOptions = [
		{ name: 'asc' as const, label: 'Ascending' },
		{ name: 'desc' as const, label: 'Descending' }
	];

	const menItem: MenuItem[] = [
		{
			id: 'sort-by',
			type: 'radiogroup',
			label: 'Sort by',
			items: sortByOpts,
			initialSelectedItem: sortAttribute.toString(),
			onChange: val => setSortAttribute(val.name)
		},
		{ type: 'divider', id: 'divider' },
		{
			id: 'sort-direction',
			type: 'radiogroup',
			label: 'Sort order',
			items: sortOptions,
			initialSelectedItem: sortDirection,
			onChange: val => setSortDirection(val.name as 'asc' | 'desc')
		}
	];

	return (
		<div>
			{sortByOpts.length > 0 && (
				<OverflowMenuV2
					className='bg-field-2 hover:bg-field-1'
					renderIcon={ArrowsVertical}
				>
					{menItem.map(renderMenuItem)}
				</OverflowMenuV2>
			)}
		</div>
	);
};

interface AddSelectSortProps {
	items: ItemNoChildren[];
	setSortAttribute: (attribute: keyof ItemType) => void;
	setSortDirection: (direction: 'asc' | 'desc') => void;
	sortDirection: 'asc' | 'desc';
	sortAttribute: keyof ItemType;
}

export default AddSelectSort;
