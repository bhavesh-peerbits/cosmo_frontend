import { Button, ButtonSet, Dropdown, Tag, TextInput } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import { FormEvent, useState } from 'react';
import { GlobalFilter } from '@components/AddSelect/utilities';

const AddSelectFilter = ({
	appliedFilters,
	clearFiltersText,
	filterOpts,
	handleFilter,
	handleSearch,
	hasFiltersApplied,
	iconDescription,
	inputLabel,
	inputPlaceholder,
	placeholder,
	primaryButtonText,
	searchTerm,
	secondaryButtonText
}: AddSelectFilterProps) => {
	const [filters, setFilters] = useState<
		Record<string, { value: string; label: string }>
	>({});
	const [open, setOpen] = useState(false);

	const searchHandler = (e: FormEvent<HTMLInputElement>) => {
		handleSearch((e.target as HTMLInputElement)?.value);
	};

	const onchangeHandler = (
		{ selectedItem }: { selectedItem: string },
		id: string,
		label: string
	) => {
		setFilters({
			...filters,
			[id]: { value: selectedItem, label }
		});
	};

	/**
	 * this component needs to manage it's own internal state of filters before they're applied
	 * setFilters manages the local filter state
	 * applyFilters adds the filter state to the parent
	 * resetFilters resets the local state
	 * clearFilters resets both
	 */
	const applyFilters = () => {
		handleFilter(filters);
		setOpen(false);
	};

	const resetFilters = () => {
		setFilters({});
	};

	const clearFilters = () => {
		resetFilters();
		handleFilter({});
	};

	const removeTag = (key: string) => {
		const newFilters = { ...filters };
		delete newFilters[key];
		setFilters(newFilters);
		handleFilter(newFilters);
	};

	const getSelectedItem = (id: string) => {
		return filters[id] || '';
	};

	const showFilter = Boolean(filterOpts?.length);

	return (
		<div>
			<div className='relative flex items-end'>
				<TextInput
					id='temp-id'
					labelText={inputLabel}
					placeholder={inputPlaceholder}
					value={searchTerm}
					onChange={searchHandler}
				/>
				{showFilter && (
					<Button
						renderIcon={Filter}
						hasIconOnly
						kind='ghost'
						onClick={() => setOpen(!open)}
						iconDescription={iconDescription}
						className='border-b-border-strong-1 bg-field-2 hover:bg-field-1'
						size='md'
					/>
				)}
				{open && (
					<div className='absolute right-0 z-[6000] w-full max-w-[40rem] translate-y-full bg-field-1 shadow shadow-md shadow-background'>
						<div className='p-5'>
							<p>Filters</p>
							<div className='grid grid-cols-2 gap-y-5 gap-x-7'>
								{filterOpts?.map(ops => (
									<Dropdown
										id={ops.id}
										key={ops.id}
										titleText={ops.label}
										items={(ops.opts as string[]) || []}
										onChange={value => onchangeHandler(value, ops.id, ops.label)}
										selectedItem={getSelectedItem(ops.id).value}
										label={placeholder}
									/>
								))}
							</div>
						</div>
						<ButtonSet>
							<Button
								kind='secondary'
								className='max-w-none flex-1'
								onClick={resetFilters}
							>
								{secondaryButtonText}
							</Button>
							<Button kind='primary' className='max-w-none flex-1' onClick={applyFilters}>
								{primaryButtonText}
							</Button>
						</ButtonSet>
					</div>
				)}
			</div>
			{hasFiltersApplied && (
				<div className='flex items-center bg-background-selected p-3'>
					{Object.entries(appliedFilters).map(([filterType, { value, label }]) => (
						<Tag
							key={filterType}
							type='gray'
							size='sm'
							onClose={() => removeTag(filterType)}
							filter
						>
							{`${label}: ${value}`}
						</Tag>
					))}
					<Button kind='ghost' size='sm' onClick={clearFilters}>
						{clearFiltersText}
					</Button>
				</div>
			)}
		</div>
	);
};

interface AddSelectFilterProps {
	appliedFilters: Record<string, { value: string; label: string }>;
	clearFiltersText?: string;
	filterOpts?: GlobalFilter[];
	handleFilter: (filters: Record<string, { value: string; label: string }>) => void;
	handleSearch: (searchTerm: string) => void;
	hasFiltersApplied?: boolean;
	iconDescription?: string;
	inputLabel?: string;
	inputPlaceholder?: string;
	placeholder?: string;
	primaryButtonText?: string;
	searchTerm?: string;
	secondaryButtonText?: string;
}

export default AddSelectFilter;
