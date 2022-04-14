import { Accordion, AccordionItem, Checkbox } from '@carbon/react';

type ApplicationFiltersProps = {
	handleFilters: (id: string) => void;
	idList: string[];
};

const ApplicationsFilters = ({ handleFilters, idList }: ApplicationFiltersProps) => {
	const categories = [
		{ id: 'id1', category: 'Category1' },
		{ id: 'id2', category: 'Category2' },
		{ id: 'id3', category: 'Category3' }
	];

	const getCategoryName = (id: string) => {
		const category = categories.find(el => id === el.id);
		return category ? handleFilters(category?.category) : '';
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title='Filter' className='border-0'>
					{categories.map(obj => (
						<Checkbox
							checked={idList.includes(obj.category)}
							onChange={() => getCategoryName(obj.id)}
							id={obj.id}
							labelText={obj.category}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default ApplicationsFilters;
