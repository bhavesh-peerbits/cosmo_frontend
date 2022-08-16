import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import useRevalidationsOngoing from '@hooks/user-revalidation/useRevalidationsOngoing';
import { useResponsive } from 'ahooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterRadioGroupProps {
	filterName: 'dueDate';
}

const FilterRadioGroup = ({ filterName }: FilterRadioGroupProps) => {
	const { t } = useTranslation('management');
	const { setFilters, filtersAvailable } = useRevalidationsOngoing();
	const filterOption = filtersAvailable.dueDate;
	const [selectedValue, setSelectedValue] = useState<'' | number>('');

	useEffect(() => {
		setSelectedValue(filterOption.find(f => f.enabled)?.date ?? '');
	}, [filterOption]);

	return (
		<RadioButtonGroup
			name={filterName}
			orientation='vertical'
			valueSelected={selectedValue}
			onChange={(value, group) => setFilters({ [group]: value || undefined })}
		>
			<RadioButton labelText={t('all')} value='' id={`${filterName}-all`} />
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

const RevalidationsOngoingFilters = () => {
	const { t } = useTranslation('userRevalidation');
	const { filtersAvailable, setFilters } = useRevalidationsOngoing();
	const { md } = useResponsive();

	const handleCheckFilterType = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			revalidationType:
				action === 'add'
					? [...(old.revalidationType ?? []), filter]
					: (old.revalidationType ?? []).filter((f: string) => f !== filter)
		}));
	};
	const handleCheckFilterLayer = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			layer:
				action === 'add'
					? [...(old.layer ?? []), filter]
					: (old.layer ?? []).filter((f: string) => f !== filter)
		}));
	};
	const handleCheckFilterStatus = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			status:
				action === 'add'
					? [...(old.status ?? []), filter]
					: (old.status ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title={t('due-date')} className='border-0' open={md}>
					<FilterRadioGroup filterName='dueDate' />
				</AccordionItem>
				<AccordionItem title={t('revalidation-type')} className='border-0' open={md}>
					{filtersAvailable.revalidationType.map(filter => (
						<Checkbox
							key={filter.type}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterType(id, checked ? 'add' : 'remove')
							}
							id={filter.type}
							labelText={filter.type}
						/>
					))}
				</AccordionItem>
				<AccordionItem title={t('layer')} className='border-0' open={md}>
					{filtersAvailable.layer.map(filter => (
						<Checkbox
							key={filter.layer}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterLayer(id, checked ? 'add' : 'remove')
							}
							id={filter.layer}
							labelText={filter.layer}
						/>
					))}
				</AccordionItem>
				<AccordionItem title={t('status')} className='border-0' open={md}>
					{filtersAvailable.status.map(filter => (
						<Checkbox
							key={filter.status}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterStatus(id, checked ? 'add' : 'remove')
							}
							id={filter.status}
							labelText={filter.status}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};
export default RevalidationsOngoingFilters;
