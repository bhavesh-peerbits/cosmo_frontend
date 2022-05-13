import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import useReviewApps from '@hooks/review/useReviewApps';
import { useEffect, useState } from 'react';

interface FilterRadioGroupProps {
	filterName: 'startDate' | 'dueDate';
	withNever?: boolean;
}

const FilterRadioGroup = ({ filterName, withNever }: FilterRadioGroupProps) => {
	const { setFilters, filtersAvailable, filters } = useReviewApps();
	const filterOption = filtersAvailable[filterName];
	const [selectedValue, setSelectedValue] = useState<
		'never' | 'in-progress' | '' | number
	>('');

	useEffect(() => {
		if (withNever) {
			setSelectedValue(
				(filters[filterName] === 'never' && 'never') ||
					(filters[filterName] === 'in-progress' && 'in-progress') ||
					''
			);
		} else {
			setSelectedValue(filterOption.find(f => f.enabled)?.date ?? '');
		}
	}, [filterName, filterOption, filters, withNever]);

	return (
		<RadioButtonGroup
			name={filterName}
			orientation='vertical'
			valueSelected={selectedValue}
			onChange={(value, group) => setFilters({ [group]: value || undefined })}
		>
			<RadioButton labelText='All' value='' id={`${filterName}-all`} />
			{filterName === 'startDate' ? (
				<RadioButton
					labelText='In Progress'
					value='in-progress'
					id={`${filterName}-in-progress`}
				/>
			) : (
				<div />
			)}

			{withNever ? (
				<RadioButton labelText='Not Started' value='never' id={`${filterName}-never`} />
			) : (
				<div />
			)}
			{filterName === 'dueDate' ? (
				filterOption.map(filter => (
					<RadioButton
						key={filter.value}
						labelText={filter.value}
						value={filter.date}
						id={`${filterName}-${filter.value}`}
					/>
				))
			) : (
				<div />
			)}
			{/* {filterOption.map(filter => (
				<RadioButton
					key={filter.value}
					labelText={filter.value}
					value={filter.date}
					id={`${filterName}-${filter.value}`}
				/>
			))} */}
		</RadioButtonGroup>
	);
};

const ReviewsFilters = () => {
	const { filtersAvailable, setFilters } = useReviewApps();
	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			analyst:
				action === 'add'
					? [...(old.analyst ?? []), filter]
					: (old.analyst ?? []).filter((f: string) => f !== filter)
		}));
	};
	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title='Analyst' className='border-0'>
					<Checkbox
						labelText='All'
						id='analyst-all'
						checked={filtersAvailable.analyst.every(f => f.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								analyst: checked
									? filtersAvailable.analyst.map(({ analyst }) => analyst)
									: []
							})
						}
					/>
					{filtersAvailable.analyst.map(filter => (
						<Checkbox
							key={filter.analyst}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilter(id, checked ? 'add' : 'remove')
							}
							id={filter.analyst}
							labelText={filter.analyst}
						/>
					))}
				</AccordionItem>
				<AccordionItem title='Status' className='border-0 '>
					<FilterRadioGroup filterName='startDate' withNever />
				</AccordionItem>
				<AccordionItem title='Due Date' className='border-0 '>
					<FilterRadioGroup filterName='dueDate' />
					{/* <Checkbox labelText='Today' id='today' />
					<Checkbox labelText='Tomorrow' id='tomorrow' />
					<Checkbox labelText='This Week' id='this-week' />
					<Checkbox labelText='Next Week' id='next-week' />
					<Checkbox labelText='Next 14 days ' id='next-14-days' /> */}
				</AccordionItem>
			</Accordion>
		</div>
	);
};
export default ReviewsFilters;
