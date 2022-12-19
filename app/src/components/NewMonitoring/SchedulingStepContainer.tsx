import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	TimePicker,
	TimePickerSelect,
	DatePicker,
	DatePickerInput,
	MultiSelect
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import useGetDateFormat from '@hooks/useGetDateFormat';
import { startOfToday } from 'date-fns';
import { formatDate } from '@i18n';
import { useState } from 'react';
import DayMonthRadioSelection from './DayMonthRadioSelection';

type SchedulingFormData = {
	frequency: string;
	date: Date[];
	startHour: string;
	timeFormat: string;
	dayOfWeek: string | string[];
	dayOfMonth: string;
};

// TODO Fix id of components when BE is ready
const SchedulingStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const { format, placeholder, localeCode } = useGetDateFormat();
	const [, setSelectedRadio] = useState<string | number>();

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
					<Select
						id='select-day-week'
						labelText={`${t('days-of-week')} *`}
						className='w-1/2'
						onChange={e => setValue('dayOfWeek', e.currentTarget.value)}
					>
						{daysOfWeek.map(day => (
							<SelectItem value={day.value} text={day.text} />
						))}
					</Select>
				);
			case 'biweekly':
				return (
					<MultiSelect
						id='select-day-week'
						titleText={`${t('days-of-week')} *`}
						label={t('select-two-days')}
						className='w-1/2'
						items={daysOfWeek}
						itemToString={item => item.text}
						onChange={e =>
							setValue(
								'dayOfWeek',
								e.selectedItems.map(item => item.value)
							)
						}
						invalid={Array.isArray(watch('dayOfWeek')) && watch('dayOfWeek').length > 2}
						invalidText={t('invalid-days-select')}
					/>
				);
			case 'monthly':
				return (
					<DayMonthRadioSelection
						name='monthly'
						setSelectedRadio={setSelectedRadio}
						daysOfWeek={daysOfWeek}
					/>
				);
			case 'quarterly':
				return (
					<DayMonthRadioSelection
						name='quarterly'
						setSelectedRadio={setSelectedRadio}
						daysOfWeek={daysOfWeek}
					/>
				);

			case 'semiannual':
				return (
					<DayMonthRadioSelection
						name='semiannual'
						setSelectedRadio={setSelectedRadio}
						daysOfWeek={daysOfWeek}
					/>
				);

			case 'annual':
				return (
					<DayMonthRadioSelection
						name='annual'
						setSelectedRadio={setSelectedRadio}
						daysOfWeek={daysOfWeek}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<FullWidthColumn className='space-y-7'>
			<Layer className='xlg:w-1/2'>
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
			</Layer>

			<Layer className='flex w-fit space-x-5'>
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
								labelText={`${t('start-date')} *`}
								size='md'
							/>
							<DatePickerInput
								id='end-date'
								placeholder={placeholder}
								labelText={
									selectedFrequency === 'on-demand' ? t('end-date') : `${t('end-date')} *`
								}
								disabled={selectedFrequency === 'on-demand'}
								size='md'
							/>
						</DatePicker>
					)}
				/>
				<TimePicker
					id='select-time'
					labelText={`${t('start-time')} *`}
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
