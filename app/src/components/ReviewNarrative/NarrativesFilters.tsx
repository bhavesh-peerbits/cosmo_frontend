import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';

const NarrativesFilters = () => {
	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title='Analyst' className='border-0'>
					<Checkbox labelText='Analyst1' id='analyst-1' />
					<Checkbox labelText='Analyst2' id='analyst-2' />
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
export default NarrativesFilters;
