import { Accordion, AccordionItem, Checkbox } from '@carbon/react';

const Filter = () => {
	return (
		<Accordion>
			<AccordionItem title='Filter' className='border-t-0'>
				<Checkbox id='Category 1' labelText='Category 1' />
				<Checkbox id='Category 2' labelText='Category 2' />
				<Checkbox id='Category 3' labelText='Category 3' />
			</AccordionItem>
		</Accordion>
	);
};
export default Filter;
