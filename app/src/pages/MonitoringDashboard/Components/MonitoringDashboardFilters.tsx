import {
	Checkbox,
	Layer,
	DatePickerInput,
	DatePicker,
	Button,
	TextInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';

const MonitoringDashboardFilters = () => {
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest',
		'userSelect'
	]);
	const { filtersAvailable, setFilters, filters } = useStartedMonitorings();

	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			frequency:
				action === 'add'
					? [...(old.frequency ?? []), filter]
					: (old.frequency ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<CosmoFiltersPanel flipped>
			<Layer className='space-y-5'>
				<p className='text-body-short-2'>{t('userSelect:filters')}:</p>
				<DatePicker
					datePickerType='range'
					allowInput
					className='w-full'
					maxDate={
						filters.maxStartDate
							? new Date(filters.maxStartDate).toLocaleDateString()
							: new Date('1/1/3000')
					}
					minDate={
						filters.minStartDate
							? new Date(filters.minStartDate).toLocaleDateString()
							: new Date(0)
					}
				>
					<DatePickerInput
						id='start-date'
						placeholder={t('changeMonitoring:from')}
						labelText={t('changeMonitoring:start-date')}
						size='md'
						value={
							filters.minStartDate
								? new Date(filters.minStartDate).toLocaleDateString().slice(0, -5)
								: undefined
						}
					/>
					<DatePickerInput
						id='end-date'
						placeholder={t('changeMonitoring:to')}
						labelText=' '
						size='md'
						value={
							filters.maxStartDate
								? new Date(filters.maxStartDate).toLocaleDateString().slice(0, -5)
								: undefined
						}
					/>
				</DatePicker>
				<DatePicker
					datePickerType='range'
					allowInput
					className='w-full'
					maxDate={
						filters.maxStartDate
							? new Date(filters.maxStartDate).toLocaleDateString()
							: new Date('1/1/3000')
					}
					minDate={
						filters.minStartDate
							? new Date(filters.minStartDate).toLocaleDateString()
							: new Date(0)
					}
					dateFormat='d/m/y'
				>
					<DatePickerInput
						id='start-date'
						labelText={t('changeMonitoring:end-date')}
						placeholder={t('changeMonitoring:from')}
						size='md'
						value={
							filters.minStartDate
								? new Date(filters.minStartDate).toLocaleDateString().slice(0, -5)
								: undefined
						}
					/>
					<DatePickerInput
						id='end-date'
						labelText=' '
						placeholder={t('changeMonitoring:to')}
						size='md'
						value={
							filters.maxStartDate
								? new Date(filters.maxStartDate).toLocaleDateString().slice(0, -5)
								: undefined
						}
					/>
				</DatePicker>

				<div className='space-y-3'>
					<p className='text-text-secondary text-label-1'>
						{t('changeMonitoring:frequency')}
					</p>
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
				</div>
				<TextInput
					id='current-run-filter'
					labelText={t('monitoringDashboard:current-run')}
					onChange={e => setFilters({ currentRun: +e.currentTarget.value })}
					placeholder={t('monitoringDashboard:number-placeholder')}
				/>
				<TextInput
					id='total-runs-filter'
					labelText={t('changeMonitoring:total-runs')}
					onChange={e => setFilters({ numberOfRun: +e.currentTarget.value })}
					placeholder={t('monitoringDashboard:number-placeholder')}
				/>
				<div>
					<div className='flex space-x-5'>
						<div className='w-full'>
							<Button className='w-full' size='sm' kind='secondary'>
								Reset
							</Button>
						</div>
						<div className='w-full'>
							<Button className='w-full' size='sm'>
								{t('evidenceRequest:save')}
							</Button>
						</div>
					</div>
				</div>
			</Layer>
		</CosmoFiltersPanel>
	);
};

export default MonitoringDashboardFilters;
