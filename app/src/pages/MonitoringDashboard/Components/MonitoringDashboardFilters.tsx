import {
	Checkbox,
	Layer,
	DatePickerInput,
	DatePicker,
	Button,
	TextInput,
	Form
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

type MonitoringFiltersForm = {
	startDate: Date[];
	endDate: Date[];
	currentRun: string;
	totalRuns: string;
};
const MonitoringDashboardFilters = () => {
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest',
		'userSelect'
	]);
	const { filtersAvailable, setFilters, filters } = useStartedMonitorings();

	const { register, control, reset, handleSubmit } = useForm<MonitoringFiltersForm>();
	const [frequencyChecked, setFrequencyChecked] = useState(['']);

	const saveFilters = (data: MonitoringFiltersForm) => {
		setFilters({
			frequency: frequencyChecked,
			minStartDate: data.startDate ? data.startDate[0].toDateString() : undefined,
			maxStartDate: data.startDate ? data.startDate[1].toDateString() : undefined,
			minEndDate: data.endDate ? data.endDate[0].toDateString() : undefined,
			maxEndDate: data.endDate ? data.endDate[1].toDateString() : undefined,
			currentRun: +data.currentRun,
			numberOfRun: +data.totalRuns
		});
	};

	return (
		<CosmoFiltersPanel flipped>
			<Form onReset={() => reset()}>
				<Layer className='space-y-5'>
					<p className='text-body-short-2'>{t('userSelect:filters')}:</p>
					<Controller
						control={control}
						name='startDate'
						render={({ field }) => (
							<DatePicker
								{...field}
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
									autoComplete='off'
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
									autoComplete='off'
								/>
							</DatePicker>
						)}
					/>
					<Controller
						control={control}
						name='endDate'
						render={({ field }) => (
							<DatePicker
								{...field}
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
									autoComplete='off'
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
									autoComplete='off'
								/>
							</DatePicker>
						)}
					/>

					<div className='space-y-3'>
						<p className='text-text-secondary text-label-1'>
							{t('changeMonitoring:frequency')}
						</p>
						<Checkbox
							labelText={t('monitoringDashboard:all')}
							id='frequency-all'
							checked={filtersAvailable.frequency.every(f => f.enabled)}
							onChange={(_, { checked }) =>
								setFrequencyChecked(
									checked
										? filtersAvailable.frequency.map(({ frequency }) => frequency)
										: []
								)
							}
						/>
						{filtersAvailable.frequency.map(filter => (
							<Checkbox
								key={filter.frequency}
								checked={filter.enabled}
								onChange={(_, { checked, id }) =>
									setFrequencyChecked(old => (checked ? [...old, id] : old))
								}
								id={filter.frequency}
								labelText={filter.frequency}
							/>
						))}
					</div>
					<TextInput
						id='current-run-filter'
						labelText={t('monitoringDashboard:current-run')}
						placeholder={t('monitoringDashboard:number-placeholder')}
						{...register('currentRun')}
					/>
					<TextInput
						id='total-runs-filter'
						labelText={t('changeMonitoring:total-runs')}
						placeholder={t('monitoringDashboard:number-placeholder')}
						{...register('totalRuns')}
					/>
					<div>
						<div className='flex space-x-5'>
							<div className='w-full'>
								<Button className='w-full' size='sm' kind='secondary' type='reset'>
									Reset
								</Button>
							</div>
							<div className='w-full'>
								<Button className='w-full' size='sm' onClick={handleSubmit(saveFilters)}>
									{t('evidenceRequest:save')}
								</Button>
							</div>
						</div>
					</div>
				</Layer>
			</Form>
		</CosmoFiltersPanel>
	);
};

export default MonitoringDashboardFilters;
