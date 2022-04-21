import { Accordion, AccordionItem, Checkbox } from '@carbon/react';

type Filter = {
	id: string;
	category: string;
};

type ApplicationFiltersProps = {
	handleSelect: (filter: Filter) => void;
	checkedFilters: Filter[];
};

const ApplicationsFilters = ({
	handleSelect,
	checkedFilters
}: ApplicationFiltersProps) => {
	const filters = [
		[
			{ id: 'id1', category: 'Category1' },
			{ id: 'id2', category: 'Category2' },
			{ id: 'id3', category: 'Category3' }
		],
		[
			{ id: 'id4', category: 'Category4' },
			{ id: 'id5', category: 'Category5' },
			{ id: 'id6', category: 'Category6' }
		],
		[
			{ id: 'id7', category: 'Category7' },
			{ id: 'id8', category: 'Category8' },
			{ id: 'id9', category: 'Category9' }
		]
	];

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				{filters.map((filter, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<AccordionItem key={`filter${index}`} title='Filter' className='border-0'>
						{filter.map(item => (
							<Checkbox
								key={item.id}
								checked={checkedFilters.some(
									checkedFilter => checkedFilter.id === item.id
								)}
								onChange={() => handleSelect(item)}
								id={item.id}
								labelText={item.category}
							/>
						))}
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default ApplicationsFilters;
