import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useResponsive from '@hooks/useResponsive';
import { useEffect, useState } from 'react';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';

interface FilterRadioGroupProps {
	filterName: 'startDate' | 'endDate';
}

const FilterRadioGroup = ({ filterName }: FilterRadioGroupProps) => {
	const { t } = useTranslation('monitoringDashboard');
	const { setFilters, filtersAvailable, filters } = useStartedMonitorings();
	const filterOption = filtersAvailable[filterName];
	const [selectedValue, setSelectedValue] = useState<number | ''>('');

	useEffect(() => {
		setSelectedValue(filterOption?.find(f => f.enabled)?.date ?? '');
	}, [filterName, filterOption, filters]);

	return (
		<RadioButtonGroup
			name={filterName}
			orientation='vertical'
			valueSelected={selectedValue}
			onChange={(value, group) => setFilters({ [group]: value || undefined })}
		>
			<RadioButton labelText={t('all')} value='' id={`${filterName}-all`} />
			{filterOption?.map(filter => {
				return (
					<RadioButton
						key={filter.value}
						labelText={filter.value}
						value={filter.date || ''}
						id={`${filterName}-${filter.value}`}
					/>
				);
			})}
		</RadioButtonGroup>
	);
};

const MonitoringDashboardFilters = () => {
	const { t } = useTranslation(['changeMonitoring', 'monitoringDashboard']);
	const { filtersAvailable, setFilters } = useStartedMonitorings();
	const { md } = useResponsive();

	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			frequency:
				action === 'add'
					? [...(old.frequency ?? []), filter]
					: (old.frequency ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem
					title={t('changeMonitoring:start-date')}
					className='border-0'
					open={md}
				>
					<FilterRadioGroup filterName='startDate' />
				</AccordionItem>
				<AccordionItem
					title={t('changeMonitoring:end-date')}
					className='border-0'
					open={md}
				>
					<FilterRadioGroup filterName='endDate' />
				</AccordionItem>
				<AccordionItem
					title={t('changeMonitoring:frequency')}
					className='border-0'
					open={md}
				>
					<Checkbox
						labelText={t('monitoringDashboard:all')}
						id='owner-all'
						checked={filtersAvailable.frequency.every(f => f.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								frequency: checked
									? filtersAvailable.frequency.map(({ frequency }) => frequency)
									: []
							})
						}
					/>
					{filtersAvailable.frequency.map(filter => (
						<Checkbox
							key={filter.frequency}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilter(id, checked ? 'add' : 'remove')
							}
							id={filter.frequency}
							labelText={filter.frequency}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default MonitoringDashboardFilters;
