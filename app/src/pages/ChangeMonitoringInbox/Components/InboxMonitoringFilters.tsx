import { Checkbox, Layer, Button, TextInput, Form } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import { FrequencyFrequencyTypesEnum } from 'cosmo-api/src/v1';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';

type MonitoringFiltersForm = {
	minStartDate: Date;
	maxStartDate: Date;
	minEndDate: Date;
	maxEndDate: Date;
	currentRun: string;
	totalRuns: string;
};
const InboxMonitoringFilters = () => {
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest',
		'userSelect'
	]);
	const { filtersAvailable, setFilters } = useInboxMonitorings();

	const { register, control, reset, handleSubmit } = useForm<MonitoringFiltersForm>({
		defaultValues: {
			minStartDate: undefined,
			maxStartDate: undefined,
			minEndDate: undefined,
			maxEndDate: undefined,
			currentRun: undefined,
			totalRuns: undefined
		}
	});
	const [frequencyChecked, setFrequencyChecked] = useState(['']);

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
						label={t('changeMonitoring:min-start-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='maxStartDate'
						label={t('changeMonitoring:max-start-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='minEndDate'
						label={t('changeMonitoring:min-end-date')}
					/>
					<DatePickerWrapper
						control={control}
						name='maxEndDate'
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
								// checked={filter.enabled}
								onChange={(_, { checked, id }) =>
									setFrequencyChecked(old => (checked ? [...old, id] : old))
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

export default InboxMonitoringFilters;
