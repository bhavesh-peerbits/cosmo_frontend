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
	multi,
	placeholder,
	primaryButtonText,
	searchTerm,
	secondaryButtonText
}: AddSelectFilterProps) => {
	const [filters, setFilters] = useState<Record<string, string>>({});
	const [open, setOpen] = useState(false);

	const searchHandler = (e: FormEvent<HTMLInputElement>) => {
		handleSearch((e.target as HTMLInputElement)?.value);
	};

	const onchangeHandler = ({ selectedItem }: { selectedItem: string }, id: string) => {
		setFilters({
			...filters,
			[id]: selectedItem
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

	const showFilter = multi && Boolean(filterOpts?.length);

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
					<div className='absolute right-0 z-[6000] w-full max-w-[40rem] translate-y-full bg-field-1'>
						<div className='p-5'>
							<p>Filters</p>
							<div className='grid grid-cols-2 gap-y-5 gap-x-7'>
								{filterOpts?.map(ops => (
									<Dropdown
										id={ops.id}
										key={ops.id}
										titleText={ops.label}
										items={(ops.opts as string[]) || []}
										onChange={value => onchangeHandler(value, ops.id)}
										selectedItem={getSelectedItem(ops.id)}
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
					{Object.keys(appliedFilters).map(filterType => (
						<Tag
							key={filterType}
							type='gray'
							size='sm'
							onClose={() => removeTag(filterType)}
							filter
						>
							{`${filterType}: ${appliedFilters[filterType]}`}
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
	appliedFilters: Record<string, string>;
	clearFiltersText?: string;
	filterOpts?: GlobalFilter[];
	handleFilter: (filters: Record<string, string>) => void;
	handleSearch: (searchTerm: string) => void;
	hasFiltersApplied?: boolean;
	iconDescription?: string;
	inputLabel?: string;
	inputPlaceholder?: string;
	multi?: boolean;
	placeholder?: string;
	primaryButtonText?: string;
	searchTerm?: string;
	secondaryButtonText?: string;
}

export default AddSelectFilter;
