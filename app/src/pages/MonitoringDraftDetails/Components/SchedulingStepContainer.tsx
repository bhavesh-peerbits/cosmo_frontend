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
	NumberInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import useGetDateFormat from '@hooks/useGetDateFormat';
import { startOfTomorrow } from 'date-fns';
import { formatDate } from '@i18n';
import { Dispatch, SetStateAction } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import {
	FrequencyDtoFrequencyTypeEnum,
	SchedulingDtoDayOfWeekEnum
} from 'cosmo-api/src/v1';

type SchedulingFormData = {
	frequency: string;
	date: Date[];
	startHour: number;
	timeFormat: string;
	dayOfWeek: string | string[];
	dayOfMonth: number;
};

type SchedulingStepProps = {
	draft: MonitoringDraft;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

// TODO Fix id of components when BE is ready
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SchedulingStepContainer = ({ draft, setCurrentStep }: SchedulingStepProps) => {
	const { t } = useTranslation('changeMonitoring');
	const { format, placeholder, localeCode } = useGetDateFormat();

	const {
		register,
		watch,
		control,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<SchedulingFormData>({
		defaultValues: {
			dayOfMonth: 1
		}
	});
	const selectedFrequency = watch('frequency');
	const frequencyList: FrequencyDtoFrequencyTypeEnum[] = [
		'ONDEMAND',
		'DAILY',
		'WEEKLY',
		'BE_WEEKLY',
		'MONTHLY',
		'QUARTERLY',
		'SEMIANNUAL',
		'ANNUAL'
	];
	const daysOfWeek: SchedulingDtoDayOfWeekEnum[] = [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
		'SATURDAY',
		'SUNDAY'
	];

	const translateFrequency = (frequency: FrequencyDtoFrequencyTypeEnum) => {
		switch (frequency) {
			case 'ANNUAL':
				return t('annual');
			case 'BE_WEEKLY':
				return t('biweekly');
			case 'WEEKLY':
				return t('weekly');
			case 'DAILY':
				return t('daily');
			case 'MONTHLY':
				return t('monthly');
			case 'ONDEMAND':
				return t('on-demand');
			case 'QUARTERLY':
				return t('quarterly');
			case 'SEMIANNUAL':
				return t('semiannual');
			default:
				return t('daily');
		}
	};

	const translateDayOfWeek = (day: SchedulingDtoDayOfWeekEnum) => {
		switch (day) {
			case 'MONDAY':
				return t('monday');
			case 'TUESDAY':
				return t('tuesday');
			case 'WEDNESDAY':
				return t('wednesday');
			case 'THURSDAY':
				return t('thursday');
			case 'FRIDAY':
				return t('friday');
			case 'SATURDAY':
				return t('saturday');
			default:
				return t('sunday');
		}
	};

	const frequencySetup = () => {
		if (selectedFrequency === 'WEEKLY') {
			return (
				<Select
					id='select-day-week'
					labelText={`${t('days-of-week')} *`}
					className='w-1/2'
					onChange={e => setValue('dayOfWeek', e.currentTarget.value)}
				>
					{daysOfWeek.map(day => (
						<SelectItem value={day} text={translateDayOfWeek(day)} />
					))}
				</Select>
			);
		}
		if (selectedFrequency === 'BE_WEEKLY') {
			return (
				<MultiSelect
					id='select-day-week-multi'
					titleText={`${t('days-of-week')} *`}
					label={t('select-two-days')}
					className='w-1/2'
					items={daysOfWeek}
					itemToString={item => translateDayOfWeek(item)}
					onChange={e =>
						setValue(
							'dayOfWeek',
							e.selectedItems.map(item => item)
						)
					}
					invalid={Array.isArray(watch('dayOfWeek')) && watch('dayOfWeek').length > 2}
					invalidText={t('invalid-days-select')}
				/>
			);
		}
		if (selectedFrequency === 'MONTHLY') {
			return (
				<Controller
					control={control}
					name='dayOfMonth'
					defaultValue={getValues('dayOfMonth')}
					rules={{
						required: {
							value:
								selectedFrequency === 'MONTHLY' ||
								selectedFrequency === 'QUARTERLY' ||
								selectedFrequency === 'SEMIANNUAL' ||
								selectedFrequency === 'ANNUAL',
							message: `${t('field-required')}`
						}
					}}
					render={({ field }) => (
						<NumberInput
							{...field}
							min={1}
							max={31}
							onChange={(e, data) =>
								setValue('dayOfMonth', data.value as number, {
									shouldDirty: true,
									shouldValidate: true
								})
							}
							id='day-month-input'
							label={t('day-of-month')}
							size='sm'
							className='w-min'
							invalidText={t('error-day-number')}
							invalid={Boolean(errors.dayOfMonth)}
						/>
					)}
				/>
			);
		}

		return null;
	};

	return (
		<FullWidthColumn className='space-y-7 overflow-auto'>
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
						<SelectItem text={translateFrequency(option)} value={option} />
					))}
				</Select>
			</Layer>

			<Layer className='w-fit space-y-7 lg:flex lg:space-y-0 lg:space-x-5'>
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
							minDate={formatDate(startOfTomorrow(), 'P')}
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
									selectedFrequency === 'ONDEMAND' ? t('end-date') : `${t('end-date')} *`
								}
								disabled={selectedFrequency === 'ONDEMAND'}
								size='md'
							/>
						</DatePicker>
					)}
				/>
				<TimePicker
					id='select-time'
					placeholder='hh'
					labelText={`${t('start-time')} *`}
					invalidText={errors.dayOfMonth?.message}
					{...register('startHour', {
						required: {
							value: true,
							message: `${t('field-required')}`
						}
					})}
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
			<div>
				<span className='text-productive-heading-2'>{t('total-runs')}: </span>
				<span>5</span>
			</div>
		</FullWidthColumn>
	);
};
export default SchedulingStepContainer;
