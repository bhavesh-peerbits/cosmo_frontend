import { Accordion, AccordionItem, Checkbox } from '@carbon/react';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';

const ApplicationsFilters = () => {
	const { t } = useTranslation('management');
	const { categories, setFilters } = useManagementApps();

	const handleFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			categories:
				action === 'add'
					? [...(old.categories ?? []), filter]
					: (old.categories ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title={t('categories')} className='border-0'>
					{categories.map(filter => (
						<Checkbox
							key={filter.category}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleFilter(id, checked ? 'add' : 'remove')
							}
							id={filter.category}
							labelText={filter.category}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default ApplicationsFilters;
