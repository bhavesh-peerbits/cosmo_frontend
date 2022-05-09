import { StructuredListBody, StructuredListWrapper } from '@carbon/react';
import { ComponentProps } from 'react';
import AddSelectListItem from '@components/AddSelect/AddSelectListItem';
import { ItemNoChildren } from '@components/AddSelect/utilities';

const AddSelectList = ({
	filteredItems,
	modifiers,
	multi,
	multiSelection = [],
	path,
	setMultiSelection,
	setPath,
	setSingleSelection,
	singleSelection,
	shrink,
	index
}: AddSelectListProps) => {
	const handleSingleSelection = (value: string) => {
		setSingleSelection?.(value);
	};

	const handleMultiSelection = (id: string, checked: boolean) => {
		if (checked) {
			const newValues = [...multiSelection, id];
			setMultiSelection?.(newValues);
		} else {
			const newValues = multiSelection.filter(v => v !== id);
			setMultiSelection?.(newValues);
		}
	};

	const onNavigateItem: SelectItemType['onNavigateItem'] = ({ id, title, parent }) => {
		// if multi select
		if (path && setPath) {
			if (multi) {
				// if top level reset the path
				if (!parent) {
					setPath([{ id, title }]);
				} else {
					const pathIds = path.map(p => p.id);
					// if item is already selected somewhere go back to that item
					if (pathIds.includes(id)) {
						const pathIdx = pathIds.findIndex(pathId => pathId === id);
						const newPath = [...path].splice(0, pathIdx + 1);
						setPath([...newPath]);
					} else if (path.find(p => p.parent === parent)) {
						// if the item is on the same level as another selected item start from the parent level
						const parentIdx = path.findIndex(p => p.id === parent);
						const newPath = [...path].splice(0, parentIdx + 1);
						setPath([...newPath, { id, title, parent }]);
					} else {
						setPath([...path, { id, title, parent }]);
					}
				}
			} else {
				setPath([...path, { id, title }]);
			}
		}
	};

	return (
		<div className='block'>
			<StructuredListWrapper selection>
				<StructuredListBody>
					{filteredItems.map(item => (
						<AddSelectListItem
							{...{
								item,
								handleMultiSelection,
								handleSingleSelection,
								multi,
								modifiers,
								singleSelection,
								multiSelection,
								onNavigateItem,
								shrink
							}}
							key={item.id}
							isFirstLevel={index === 0}
						/>
					))}
				</StructuredListBody>
			</StructuredListWrapper>
		</div>
	);
};

type SelectItemType = ComponentProps<typeof AddSelectListItem>;
interface AddSelectListProps
	extends Pick<
		SelectItemType,
		'modifiers' | 'multi' | 'multiSelection' | 'singleSelection' | 'shrink'
	> {
	index: number;
	filteredItems: Array<ItemNoChildren>;
	path?: Array<{ id: string; title: string; parent?: string }>;
	setPath?: (value: NonNullable<AddSelectListProps['path']>) => void;
	setSingleSelection?: (value: string) => void;
	setMultiSelection?: (values: string[]) => void;
}

export default AddSelectList;
