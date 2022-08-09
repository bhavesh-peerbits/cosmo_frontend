/* eslint-disable react/no-array-index-key */
import { forwardRef, ReactNode, useEffect, useState } from 'react';
import Tearsheet from '@components/Tearsheet';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Tag } from '@carbon/react';
import {
	flatten,
	getGlobalFilterValues,
	GlobalFilter,
	ItemElement,
	ItemNoChildren,
	ItemType,
	normalize,
	NormalizeItem
} from '@components/AddSelect/utilities';
import Centered from '@components/Centered';
import AddSelectSidebar from './AddSelectSidebar';
import AddSelectBreadcrumbs from './AddSelectBreadcrumbs';
import AddSelectList from './AddSelectList';
import AddSelectColumn from './AddSelectColumn';
import AddSelectFilter from './AddSelectFilter';

const AddSelect = forwardRef<HTMLDivElement, AddSelectProps>(
	(
		{
			className,
			clearFiltersText,
			columnInputPlaceholder,
			description,
			globalFilters,
			globalFiltersIconDescription,
			globalFiltersPlaceholderText,
			globalFiltersPrimaryButtonText,
			globalFiltersSecondaryButtonText,
			globalSearchLabel,
			globalSearchPlaceholder,
			influencerTitle,
			influencerItemTitle,
			influencerItemSubtitle,
			items = { entries: [] as ItemType[] },
			itemsLabel,
			multi,
			noResultsDescription,
			noResultsTitle,
			noSelectionDescription,
			noSelectionTitle,
			onClose,
			onCloseButtonText,
			onSubmit,
			onSubmitButtonText,
			open,
			portalTarget,
			removeIconDescription,
			searchResultsLabel,
			title,
			selectedItems = { entries: [] as ItemType[] },

			// Collect any other property values passed in.
			...rest
		},
		ref
	) => {
		// hooks
		const [path, setPath] = useState<{ id: string; title: string }[]>([]);
		const [singleSelection, setSingleSelection] = useState('');
		const [multiSelection, setMultiSelection] = useState<string[]>([]);
		const [searchTerm, setSearchTerm] = useState('');
		const [normalizedItems, setNormalizedItems] = useState<Record<string, NormalizeItem>>(
			{}
		);
		const [useNormalizedItems, setUsedNormalizedItems] = useState(false);
		const [flatItems, setFlatItems] = useState<ItemNoChildren[]>([]);
		const [globalFilterOpts, setGlobalFilterOpts] = useState<GlobalFilter[]>([]);
		const [appliedGlobalFilters, setAppliedGlobalFilters] = useState<
			Record<string, { label: string; value: string }>
		>({});

		useEffect(() => {
			if (!open && selectedItems.entries.length === 0) {
				setSingleSelection('');
				setMultiSelection([]);
			} else if (open && selectedItems.entries.length > 0) {
				setMultiSelection(selectedItems.entries.map(entry => entry.id));
			}
		}, [open, selectedItems.entries, selectedItems.entries.length]);

		useEffect(() => {
			const { entries } = items;
			// flatItems is just a single array of all entries including children
			const flattenedItems = flatten(entries);

			if (globalFilters?.length) {
				const globalFilterValues = getGlobalFilterValues(globalFilters, flattenedItems);
				setGlobalFilterOpts(globalFilterValues);
			}
			if (multi) {
				// multi select with nested data needs to be normalized
				if (entries?.find(entry => entry.children)) {
					const newItems = normalize(items);
					setNormalizedItems(newItems);
					setUsedNormalizedItems(true);
				}
			}
			setFlatItems(flattenedItems);
		}, [items, multi, globalFilters]);

		// used to generate columns of results for multi select with hierarchy
		const getPages = () => {
			const pages: NormalizeItem[][] = [];
			const itemIds = Object.keys(normalizedItems);
			// top level items are just items with no parents so they're the top results
			const topLevelItems = itemIds
				.filter(id => !normalizedItems[id].parent)
				.map(id => normalizedItems[id]);
			pages.push(topLevelItems);
			if (path.length) {
				/**
				 * the path is set when you initially traverse the child entries
				 * path is an array of item id's
				 * when a path is present the normalized items are searched
				 * any item who's has a matching parent id is added to the results
				 * in the end you have an array of arrays for each column of the hierarchy
				 */
				const entries = path
					.map(p => p.id)
					.map(pathId =>
						itemIds
							.filter(itemId => normalizedItems[itemId].parent === pathId)
							.map(itemId => normalizedItems[itemId])
					);

				pages.push(...entries);
			}
			return pages;
		};

		const performSearch = (item: ItemType | ItemNoChildren) => {
			return (
				item.title.toLowerCase().includes(searchTerm) ||
				item.subtitle?.toLowerCase()?.includes(searchTerm)
			);
		};

		// item filtering
		const getFilteredItems = () => {
			const { entries } = items;
			const hasPath = path.length > 0;
			/**
			 * how to traverse the levels of items-
			 * the path represents the ids of each level / item / breadcrumb
			 * using this path we can drill down into the items until we get to the last one the user selected
			 */
			const itemsToFilter = hasPath
				? path.reduce(
						(prev, cur) => prev.find(item => item.id === cur.id)?.children?.entries || [],
						entries
				  )
				: entries;
			return itemsToFilter.filter(item =>
				!searchTerm
					? item
					: // otherwise use the default label filter
					  performSearch(item)
			);
		};

		const getDisplayItems = () => {
			// when global search or filter is in use the results are not in column format
			const filters = Object.keys(appliedGlobalFilters);
			if (searchTerm || filters.length) {
				return flatItems
					.filter(item => performSearch(item))
					.filter(item =>
						filters.every(filter => item[filter] === appliedGlobalFilters[filter].value)
					);
			}
			if (useNormalizedItems) {
				return getPages();
			}
			return getFilteredItems();
		};

		// only multi select with hierarchy requires the normalized items
		const itemsToDisplay = getDisplayItems();

		const commonListProps = {
			multi,
			multiSelection,
			path,
			setMultiSelection,
			setPath,
			setSingleSelection,
			singleSelection
		};

		// handlers
		const handleSearch = (term: string) => {
			setSearchTerm(term);
		};

		const handleFilter = (filters: Record<string, { value: string; label: string }>) => {
			setAppliedGlobalFilters(filters);
		};

		const submitHandler = () => {
			onSubmit(multi ? multiSelection : singleSelection);
		};

		const commonTearsheetProps = {
			className,
			open,
			title,
			description,
			onClose,
			closeIconDescription: 'Close',
			actions: [
				{
					id: 'close',
					label: onCloseButtonText,
					kind: 'secondary' as const,
					onClick: onClose
				},
				{
					id: 'submit',
					label: onSubmitButtonText,
					kind: 'primary' as const,
					onClick: submitHandler,
					disabled: multi ? multiSelection.length === 0 : !singleSelection
				}
			],
			portalTarget
		};
		const sidebarProps = {
			influencerTitle,
			influencerItemTitle,
			influencerItemSubtitle,
			items: flatItems,
			multiSelection,
			noSelectionDescription,
			noSelectionTitle,
			removeIconDescription,
			setMultiSelection
		};

		const setShowBreadsCrumbs = () => {
			if (searchTerm) {
				return false;
			}
			return !!path.length;
		};

		const setShowTags = () => {
			if (searchTerm) {
				return true;
			}
			return !useNormalizedItems;
		};

		const showBreadsCrumbs = setShowBreadsCrumbs();
		const showTags = setShowTags();
		const globalFiltersApplied = Object.keys(appliedGlobalFilters).length > 0;

		// main content
		const body = (
			<>
				<div className='border-solid border-border-subtle-1 px-5 pt-5 pb-0'>
					<AddSelectFilter
						inputLabel={globalSearchLabel}
						inputPlaceholder={globalSearchPlaceholder}
						searchTerm={searchTerm}
						handleSearch={handleSearch}
						filterOpts={globalFilterOpts}
						handleFilter={handleFilter}
						primaryButtonText={globalFiltersPrimaryButtonText}
						secondaryButtonText={globalFiltersSecondaryButtonText}
						placeholder={globalFiltersPlaceholderText}
						iconDescription={globalFiltersIconDescription}
						appliedFilters={appliedGlobalFilters}
						hasFiltersApplied={globalFiltersApplied}
						clearFiltersText={clearFiltersText}
					/>
					<div className='mt-5 mb-3 flex items-center'>
						{showBreadsCrumbs ? (
							<AddSelectBreadcrumbs
								itemsLabel={itemsLabel}
								path={path}
								setPath={setPath}
							/>
						) : (
							<p className='mr-3 p-0'>{searchTerm ? searchResultsLabel : itemsLabel}</p>
						)}
						{showTags && <Tag size='sm'>{itemsToDisplay.length}</Tag>}
					</div>
				</div>
				{useNormalizedItems && !searchTerm && !globalFiltersApplied ? (
					<div className='flex flex-row overflow-x-auto'>
						{(itemsToDisplay as NormalizeItem[][]).map((page, idx) => (
							<AddSelectColumn
								{...commonListProps}
								index={idx}
								key={`page-${idx}`}
								filteredItems={page}
								header={idx === 0 ? itemsLabel : path[idx - 1]?.title}
								columnInputPlaceholder={columnInputPlaceholder}
							/>
						))}
					</div>
				) : (
					<div>
						{itemsToDisplay.length > 0 ? (
							<AddSelectList
								index={-1}
								shrink={false}
								{...commonListProps}
								filteredItems={itemsToDisplay as ItemNoChildren[]}
								modifiers={items?.modifiers}
							/>
						) : (
							<Centered>
								<div className='flex flex-col p-5 text-body-2'>
									<span>{noResultsTitle}</span>
									<span>{noResultsDescription}</span>
								</div>
							</Centered>
						)}
					</div>
				)}
			</>
		);

		return (
			<div ref={ref} {...rest}>
				{multi ? (
					<Tearsheet
						{...commonTearsheetProps}
						influencer={multi && <AddSelectSidebar {...sidebarProps} />}
						influencerWidth='wide'
						influencerPosition='right'
					>
						{body}
					</Tearsheet>
				) : (
					<TearsheetNarrow {...commonTearsheetProps}>{body}</TearsheetNarrow>
				)}
			</div>
		);
	}
);

interface AddSelectProps {
	className?: string;
	clearFiltersText?: string;
	columnInputPlaceholder?: string;
	description?: string;
	globalFilters?: Array<{
		id: string;
		label: string;
	}>;
	globalFiltersIconDescription?: string;
	globalFiltersPlaceholderText?: string;
	globalFiltersPrimaryButtonText?: string;
	globalFiltersSecondaryButtonText?: string;
	globalSearchLabel?: string;
	globalSearchPlaceholder?: string;
	influencerTitle?: string;
	influencerItemTitle?: string;
	influencerItemSubtitle?: string;
	items?: ItemElement;
	itemsLabel?: string;
	multi?: boolean;
	noResultsDescription?: string;
	noResultsTitle?: string;
	noSelectionDescription?: string;
	noSelectionTitle?: string;
	onClose?: () => void;
	onCloseButtonText?: string;
	onSubmit: (selectItem: string | string[]) => void;
	onSubmitButtonText?: string;
	open?: boolean;
	/**
	 * portal target for the all tags modal
	 */
	portalTarget?: ReactNode;
	removeIconDescription?: string;
	searchResultsLabel?: string;
	title?: string;
	selectedItems?: ItemElement;
}

export default AddSelect;
