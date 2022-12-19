import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	TimePicker,
	TimePickerSelect,
	DatePicker,
	DatePickerInput,
	MultiSelect,
	RadioButtonGroup,
	RadioButton,
	NumberInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import useGetDateFormat from '@hooks/useGetDateFormat';
import { startOfToday } from 'date-fns';
import { formatDate } from '@i18n';

type SchedulingFormData = {
	frequency: string;
	date: Date[];
	startHour: string;
	timeFormat: string;
};

// TODO Fix id of components when BE is ready
const SchedulingStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const { format, placeholder, localeCode } = useGetDateFormat();

	const { register, watch, control, setValue } = useForm<SchedulingFormData>();
	const selectedFrequency = watch('frequency');

	const frequencyList = [
		{
			text: t('on-demand'),
			value: 'on-demand'
		},
		{
			text: t('daily'),
			value: 'daily'
		},
		{
			text: t('weekly'),
			value: 'weekly'
		},
		{
			text: t('biweekly'),
			value: 'biweekly'
		},
		{
			text: t('monthly'),
			value: 'monthly'
		},
		{
			text: t('quarterly'),
			value: 'quarterly'
		},
		{
			text: t('semiannual'),
			value: 'semiannual'
		},
		{
			text: t('annual'),
			value: 'annual'
		},
		{
			text: t('multiple-times-day'),
			value: 'multiple-times-day'
		}
	];
	const daysOfWeek = [
		{
			value: 'monday',
			text: t('monday')
		},
		{
			value: 'tuesday',
			text: t('tuesday')
		},
		{
			value: 'wednesday',
			text: t('wednesday')
		},
		{
			value: 'thursday',
			text: t('thursday')
		},
		{
			value: 'friday',
			text: t('friday')
		},
		{
			value: 'saturday',
			text: t('saturday')
		},
		{
			value: 'sunday',
			text: t('sunday')
		}
	];
	const frequencySetup = () => {
		switch (selectedFrequency) {
			case 'daily':
				return null;
			case 'weekly':
				return (
					<Select id='select-day-week' labelText={t('days-of-week')} className='w-1/2'>
						{daysOfWeek.map(day => (
							<SelectItem value={day.value} text={day.text} />
						))}
					</Select>
				);
			case 'biweekly':
				return (
					<MultiSelect
						id='select-day-week'
						titleText={t('days-of-week')}
						label={t('select-two-days')}
						className='w-1/2'
						items={daysOfWeek}
						itemToString={item => item.text}
					/>
				);
			case 'monthly':
				return (
					<RadioButtonGroup name='ciao' orientation='vertical'>
						<RadioButton
							labelText={
								<NumberInput
									id='day-mssonth'
									label='Day of the month'
									size='sm'
									value={1}
									min={1}
									max={31}
									className='w-min'
								/>
							}
							value='day-month'
						/>
						<RadioButton
							labelText={
								<div className='flex space-x-3'>
									<Select id='custom-day-month-order' size='sm' hideLabel>
										<SelectItem text={t('first')} value='first' />
										<SelectItem text={t('second')} value='second' />
										<SelectItem text={t('third')} value='third' />
										<SelectItem text={t('last')} value='last' />
									</Select>
									<Select id='custom-day-month-select' size='sm' hideLabel>
										{daysOfWeek.map(day => (
											<SelectItem value={day.value} text={day.text} />
										))}
									</Select>
								</div>
							}
							value='custom-day-month'
						/>
					</RadioButtonGroup>
				);
			case 'quarterly':
				return (
					<RadioButtonGroup name='quarterly-radio' orientation='vertical'>
						<RadioButton
							labelText={
								<NumberInput
									id='quarterly-day-month-input'
									label='Day of the month'
									size='sm'
									value={1}
									min={1}
									max={31}
									className='w-min'
								/>
							}
							value='quarterly-day-month'
						/>
						<RadioButton
							labelText={
								<div className='flex space-x-3'>
									<Select id='quarterly-day-month-order' size='sm' hideLabel>
										<SelectItem text={t('first')} value='first' />
										<SelectItem text={t('second')} value='second' />
										<SelectItem text={t('third')} value='third' />
										<SelectItem text={t('last')} value='last' />
									</Select>
									<Select id='quarterly-day-week-select' size='sm' hideLabel>
										{daysOfWeek.map(day => (
											<SelectItem value={day.value} text={day.text} />
										))}
									</Select>
								</div>
							}
							value='custom-quarterly-day-month'
						/>
					</RadioButtonGroup>
				);
			case 'semiannual':
				return (
					<RadioButtonGroup name='semiannual-radio' orientation='vertical'>
						<RadioButton
							labelText={
								<NumberInput
									id='semiannual-day-month-input'
									label='Day of the month'
									size='sm'
									value={1}
									min={1}
									max={31}
									className='w-min'
								/>
							}
							value='semiannual-day-month'
						/>
						<RadioButton
							labelText={
								<div className='flex space-x-3'>
									<Select id='semiannual-day-month-order' size='sm' hideLabel>
										<SelectItem text={t('first')} value='first' />
										<SelectItem text={t('second')} value='second' />
										<SelectItem text={t('third')} value='third' />
										<SelectItem text={t('last')} value='last' />
									</Select>
									<Select id='semiannual-day-week-select' size='sm' hideLabel>
										{daysOfWeek.map(day => (
											<SelectItem value={day.value} text={day.text} />
										))}
									</Select>
								</div>
							}
							value='custom-semiannual-day-month'
						/>
					</RadioButtonGroup>
				);
			case 'annual':
				return (
					<RadioButtonGroup name='annual-radio' orientation='vertical'>
						<RadioButton
							labelText={
								<NumberInput
									id='annual-day-month-input'
									label='Day of the month'
									size='sm'
									value={1}
									min={1}
									max={31}
									className='w-min'
								/>
							}
							value='annual-day-month'
						/>
						<RadioButton
							labelText={
								<div className='flex space-x-3'>
									<Select id='annual-day-month-order' size='sm' hideLabel>
										<SelectItem text={t('first')} value='first' />
										<SelectItem text={t('second')} value='second' />
										<SelectItem text={t('third')} value='third' />
										<SelectItem text={t('last')} value='last' />
									</Select>
									<Select id='annual-day-week-select' size='sm' hideLabel>
										{daysOfWeek.map(day => (
											<SelectItem value={day.value} text={day.text} />
										))}
									</Select>
								</div>
							}
							value='custom-annual-day-month'
						/>
					</RadioButtonGroup>
				);
			default:
				return null;
		}
	};

	return (
		<FullWidthColumn className='space-y-7'>
			<Layer className='flex space-x-5'>
				<Select
					id='frequency-select'
					labelText={`${t('frequency')} *`}
					className='w-full'
					{...register('frequency', {
						required: {
							value: true,
							message: `${t('field-required')}`
						}
					})}
				>
					<SelectItem text={t('select-frequency-type')} value='select' hidden />
					{frequencyList.map(option => (
						<SelectItem text={option.text} value={option.value} />
					))}
				</Select>

				<Controller
					control={control}
					name='date'
					rules={{
						required: {
							value: true,
							message: `${t('field-required')}`
						}
					}}
					render={({ field }) => (
						<DatePicker
							{...field}
							locale={localeCode}
							dateFormat={format}
							datePickerType='range'
							allowInput
							className='w-full'
							minDate={formatDate(startOfToday(), 'P')}
						>
							<DatePickerInput
								id='start-date'
								placeholder={placeholder}
								labelText={t('start-date')}
								size='md'
							/>
							<DatePickerInput
								id='end-date'
								placeholder={placeholder}
								labelText={t('end-date')}
								disabled={selectedFrequency === 'on-demand'}
								size='md'
							/>
						</DatePicker>
					)}
				/>
				<TimePicker
					id='select-time'
					labelText={t('start-time')}
					onChange={e => setValue('startHour', e.currentTarget.value)}
				>
					<TimePickerSelect
						id='hour-format-select'
						onChange={e => setValue('timeFormat', e.currentTarget.value)}
					>
						<SelectItem value='AM' text='AM' />
						<SelectItem value='PM' text='PM' />
					</TimePickerSelect>
					<TimePickerSelect id='time-zone-select'>
						<SelectItem value='Time zone 1' text='Time zone 1' />
						<SelectItem value='Time zone 2' text='Time zone 2' />
					</TimePickerSelect>
				</TimePicker>
			</Layer>
			<Layer>{frequencySetup()}</Layer>
		</FullWidthColumn>
	);
};
export default SchedulingStepContainer;
