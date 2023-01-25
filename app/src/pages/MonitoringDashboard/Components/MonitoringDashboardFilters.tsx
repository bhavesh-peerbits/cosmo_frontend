import { Checkbox, Layer, Button, TextInput, Form } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import { FrequencyFrequencyTypesEnum } from 'cosmo-api/src/v1';

type MonitoringFiltersForm = {
	minStartDate: Date;
	maxStartDate: Date;
	minEndDate: Date;
	maxEndDate: Date;
	currentRun: string;
	totalRuns: string;
	frequency: string[];
};
const MonitoringDashboardFilters = () => {
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest',
		'userSelect'
	]);
	const { filtersAvailable, setFilters } = useStartedMonitorings();

	const {
		register,
		control,
		reset,
		getValues,
		handleSubmit,
		setValue,
		formState: { isDirty }
	} = useForm<MonitoringFiltersForm>({
		defaultValues: {
			minStartDate: undefined,
			maxStartDate: undefined,
			minEndDate: undefined,
			maxEndDate: undefined,
			currentRun: undefined,
			totalRuns: undefined,
			frequency: []
		}
	});
	const [frequencyChecked, setFrequencyChecked] = useState<string[]>([]);

	const saveFilters = (data: MonitoringFiltersForm) => {
		setFilters({
			frequency: frequencyChecked || [],
			minStartDate: data.minStartDate ? data.minStartDate.toDateString() : undefined,
			maxStartDate: data.maxStartDate ? data.maxStartDate.toDateString() : undefined,
			minEndDate: data.minEndDate ? data.minEndDate.toDateString() : undefined,
			maxEndDate: data.maxEndDate ? data.maxEndDate.toDateString() : undefined,
			currentRun: +data.currentRun || undefined,
			numberOfRun: +data.totalRuns || undefined
		});
	};

	useEffect(() => {
		setValue('frequency', frequencyChecked, { shouldDirty: frequencyChecked.length > 0 });
	}, [setValue, frequencyChecked]);

	return (
		<CosmoFiltersPanel flipped>
			<Form
				onReset={() => {
					reset();
					setFilters({
						frequency: [],
						numberOfRun: undefined,
						minStartDate: undefined,
						maxStartDate: undefined,
						minEndDate: undefined,
						maxEndDate: undefined,
						currentRun: undefined
					});
					setFrequencyChecked([]);
				}}
			>
				<Layer className='space-y-5'>
					<p className='text-body-short-2'>{t('userSelect:filters')}:</p>
					<DatePickerWrapper
						control={control}
						name='minStartDate'
						maxDate={getValues('maxStartDate')}
						label={t('changeMonitoring:min-start-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='maxStartDate'
						minDate={getValues('minStartDate')}
						label={t('changeMonitoring:max-start-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='minEndDate'
						maxDate={getValues('maxEndDate')}
						label={t('changeMonitoring:min-end-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='maxEndDate'
						minDate={getValues('minEndDate')}
						label={t('changeMonitoring:max-end-date')}
					/>
					<div className='space-y-3'>
						<p className='text-text-secondary text-label-1'>
							{t('changeMonitoring:frequency')}
						</p>
						<Checkbox
							labelText={t('monitoringDashboard:all')}
							id='frequency-all'
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
								checked={frequencyChecked.includes(filter.frequency)}
								onChange={(_, { checked, id }) =>
									setFrequencyChecked(old =>
										checked ? [...old, id] : old.filter(f => f !== id)
									)
								}
								id={filter.frequency}
								labelText={t(
									`changeMonitoring:${filter.frequency as FrequencyFrequencyTypesEnum}`
								)}
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
						<div className='space-y-3'>
							<div className='w-full'>
								<Button
									className='w-full'
									size='sm'
									kind='secondary'
									type='reset'
									disabled={!isDirty}
								>
									Reset
								</Button>
							</div>
							<div className='w-full'>
								<Button
									className='w-full'
									size='sm'
									onClick={handleSubmit(saveFilters)}
									disabled={!isDirty}
								>
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
