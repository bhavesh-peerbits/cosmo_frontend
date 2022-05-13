import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import useReviewApps from '@hooks/review/useReviewApps';

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
					<RadioButtonGroup name='status' orientation='vertical'>
						<RadioButton value='All' labelText='All' id='all' />
						<RadioButton value='Not Started' labelText='Not Started' id='not-started' />
						<RadioButton value='In Progress' labelText='In Progress' id='in-progress' />
					</RadioButtonGroup>
				</AccordionItem>
				<AccordionItem title='Due Date' className='border-0 '>
					<Checkbox labelText='Today' id='today' />
					<Checkbox labelText='Tomorrow' id='tomorrow' />
					<Checkbox labelText='This Week' id='this-week' />
					<Checkbox labelText='Next Week' id='next-week' />
					<Checkbox labelText='Next 14 days ' id='next-14-days' />
				</AccordionItem>
			</Accordion>
		</div>
	);
};
export default ReviewsFilters;
