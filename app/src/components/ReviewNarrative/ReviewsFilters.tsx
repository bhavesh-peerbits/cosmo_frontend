import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import useAppsInReview from '@hooks/review/useAppsInReview';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterRadioGroupProps {
	filterName: 'startNarrativeReview' | 'dueDate';
	withNever?: boolean;
}

const FilterRadioGroup = ({ filterName, withNever }: FilterRadioGroupProps) => {
	const { t } = useTranslation('reviewNarrative');
	const { setFilters, filtersAvailable, filters } = useAppsInReview();
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
			<RadioButton labelText={t('all')} value='' id={`${filterName}-all`} />
			{filterName === 'startNarrativeReview' ? (
				<RadioButton
					labelText={t('in-progress')}
					value='in-progress'
					id={`${filterName}-in-progress`}
				/>
			) : (
				<div />
			)}

			{withNever ? (
				<RadioButton
					labelText={t('not-started')}
					value='never'
					id={`${filterName}-never`}
				/>
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
		</RadioButtonGroup>
	);
};

const ReviewsFilters = () => {
	const { t } = useTranslation('reviewNarrative');
	const { filtersAvailable, setFilters } = useAppsInReview();
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
				<AccordionItem title={t('owner')} className='border-0'>
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
				<AccordionItem title={t('due-date')} className='border-0 '>
					<FilterRadioGroup filterName='dueDate' />
				</AccordionItem>
			</Accordion>
		</div>
	);
};
export default ReviewsFilters;
