import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import useResponsive from '@hooks/useResponsive';

interface FilterRadioGroupProps {
	filterName: 'lastReview' | 'lastModify';
	withNever?: boolean;
}

const FilterRadioGroup = ({ filterName, withNever }: FilterRadioGroupProps) => {
	const { t } = useTranslation('management');
	const { setFilters, filtersAvailable, filters } = useManagementApps();
	const filterOption = filtersAvailable[filterName];
	let selectedValue;

	if (withNever) {
		selectedValue =
			filterOption.find(f => f.enabled)?.date ?? filters[filterName] === 'never'
				? 'never'
				: '';
	} else {
		selectedValue = filterOption.find(f => f.enabled)?.date ?? '';
	}

	return (
		<RadioButtonGroup
			name={filterName}
			orientation='vertical'
			valueSelected={selectedValue}
			onChange={(value, group) => setFilters({ [group]: value || undefined })}
		>
			<RadioButton labelText={t('all')} value='' id={`${filterName}-all`} />
			{withNever ? (
				<RadioButton
					labelText={t('never-done')}
					value='never'
					id={`${filterName}-never`}
				/>
			) : (
				<div />
			)}
			{filterOption.map(filter => (
				<RadioButton
					key={filter.value}
					labelText={filter.value}
					value={filter.date}
					id={`${filterName}-${filter.value}`}
				/>
			))}
		</RadioButtonGroup>
	);
};

const ApplicationsFilters = () => {
	const { t } = useTranslation('management');
	const { filtersAvailable, setFilters } = useManagementApps();
	const { md } = useResponsive();

	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			owner:
				action === 'add'
					? [...(old.owner ?? []), filter]
					: (old.owner ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title={t('last-review')} className='border-0' open={md}>
					<FilterRadioGroup filterName='lastReview' withNever />
				</AccordionItem>
				<AccordionItem title={t('last-modify')} className='border-0' open={md}>
					<FilterRadioGroup filterName='lastModify' />
				</AccordionItem>
				<AccordionItem title={t('owner')} className='border-0' open={md}>
					<Checkbox
						labelText={t('all')}
						id='owner-all'
						checked={filtersAvailable.owner.every(f => f.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								owner: checked ? filtersAvailable.owner.map(({ owner }) => owner) : []
							})
						}
					/>
					{filtersAvailable.owner.map(filter => (
						<Checkbox
							key={filter.owner}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilter(id, checked ? 'add' : 'remove')
							}
							id={filter.owner}
							labelText={filter.owner}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default ApplicationsFilters;
