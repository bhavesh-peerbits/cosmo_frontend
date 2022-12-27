import {
	Accordion,
	AccordionItem,
	Checkbox,
	Layer,
	DatePickerInput,
	DatePicker,
	Button,
	Form,
	TextInput
} from '@carbon/react';
import { Reset } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import useResponsive from '@hooks/useResponsive';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';

const MonitoringDashboardFilters = () => {
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest'
	]);
	const { filtersAvailable, setFilters, filters } = useStartedMonitorings();
	const { md } = useResponsive();

	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			frequency:
				action === 'add'
					? [...(old.frequency ?? []), filter]
					: (old.frequency ?? []).filter((f: string) => f !== filter)
		}));
	};

	const handleDateFilter = (
		filter: string,
		property: 'minStartDate' | 'maxStartDate' | 'minEndDate' | 'maxEndDate'
	) => {
		setFilters(old => ({
			...old,
			[property]: filter
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
					<Layer>
						<Form className='space-y-5'>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0].toDateString(), 'minStartDate')}
								maxDate={
									filters.maxStartDate
										? new Date(filters.maxStartDate).toLocaleDateString()
										: new Date('1/1/3000')
								}
								value={
									filters.minStartDate
										? new Date(filters.minStartDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText={t('evidenceRequest:before')}
									id='min'
									size='sm'
									autoComplete='off'
									placeholder='dd/mm'
								/>
							</DatePicker>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0]?.toDateString(), 'maxStartDate')}
								minDate={
									filters.minStartDate
										? new Date(filters.minStartDate).toLocaleDateString()
										: new Date(0)
								}
								value={
									filters.maxStartDate
										? new Date(filters.maxStartDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText={t('evidenceRequest:after')}
									id='max'
									size='sm'
									autoComplete='off'
									placeholder='dd/mm'
								/>
							</DatePicker>

							<Button
								type='reset'
								kind='tertiary'
								className='mt-3 w-full max-w-[212px]'
								size='sm'
								renderIcon={Reset}
								onClick={() => {
									setFilters(() => ({
										maxStartDate: undefined,
										minStartDate: undefined
									}));
								}}
							>
								Reset
							</Button>
						</Form>
					</Layer>
				</AccordionItem>
				<AccordionItem
					title={t('changeMonitoring:end-date')}
					className='border-0'
					open={md}
				>
					<Layer>
						<Form className='space-y-5'>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0].toDateString(), 'minStartDate')}
								maxDate={
									filters.maxEndDate
										? new Date(filters.maxEndDate).toLocaleDateString()
										: new Date('1/1/3000')
								}
								value={
									filters.minEndDate
										? new Date(filters.minEndDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText={t('evidenceRequest:before')}
									id='min'
									size='sm'
									autoComplete='off'
									placeholder='dd/mm'
								/>
							</DatePicker>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0]?.toDateString(), 'maxEndDate')}
								minDate={
									filters.minEndDate
										? new Date(filters.minEndDate).toLocaleDateString()
										: new Date(0)
								}
								value={
									filters.maxEndDate
										? new Date(filters.maxEndDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText={t('evidenceRequest:after')}
									id='max'
									size='sm'
									autoComplete='off'
									placeholder='dd/mm'
								/>
							</DatePicker>

							<Button
								type='reset'
								kind='tertiary'
								className='mt-3 w-full max-w-[212px]'
								size='sm'
								renderIcon={Reset}
								onClick={() => {
									setFilters(() => ({
										maxEndDate: undefined,
										minEndDate: undefined
									}));
								}}
							>
								Reset
							</Button>
						</Form>
					</Layer>
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
				<AccordionItem title={t('monitoringDashboard:current-run')}>
					<Layer>
						<TextInput
							id='current-run-filter'
							labelText={t('monitoringDashboard:current-run')}
							hideLabel
							onChange={e => setFilters({ currentRun: +e.currentTarget.value })}
							placeholder={t('monitoringDashboard:number-placeholder')}
						/>
					</Layer>
				</AccordionItem>
				<AccordionItem title={t('changeMonitoring:total-runs')}>
					<Layer>
						<TextInput
							id='total-runs-filter'
							labelText={t('changeMonitoring:total-runs')}
							hideLabel
							onChange={e => setFilters({ numberOfRun: +e.currentTarget.value })}
							placeholder={t('monitoringDashboard:number-placeholder')}
						/>
					</Layer>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default MonitoringDashboardFilters;
