import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	DatePicker,
	DatePickerInput,
	MultiSelect,
	NumberInput,
	TextInput,
	Button,
	InlineLoading
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import useGetDateFormat from '@hooks/useGetDateFormat';
import { startOfTomorrow, setHours } from 'date-fns';
import { formatDate } from '@i18n';
import { Dispatch, SetStateAction } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useSaveMonitoringDraft from '@api/change-monitoring/useSaveMonitoringDraft';
import ApiError from '@api/ApiError';
import { TranslateDayOfWeek, TranslateFrequency } from '@i18n/common/switchTranslation';

type SchedulingFormData = {
	frequency: SchedulingDtoFrequencyEnum;
	date: Date[];
	startHour: number;
	dayOfWeek: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth: number;
};

type SchedulingStepProps = {
	draft: MonitoringDraft;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const SchedulingStepContainer = ({ draft, setCurrentStep }: SchedulingStepProps) => {
	const { t } = useTranslation('changeMonitoring');
	const { format, placeholder, localeCode } = useGetDateFormat();
	const { mutate, isLoading, isError, isSuccess, error } = useSaveMonitoringDraft();

	const {
		register,
		watch,
		control,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<SchedulingFormData>({
		mode: 'onChange',
		defaultValues: {
			dayOfMonth: draft.scheduling?.dayOfMonth || 1,
			frequency: draft.scheduling?.frequency,
			date: [draft.scheduling?.startDate, draft.scheduling?.endDate],
			dayOfWeek: draft.scheduling?.dayOfWeek,
			startHour: draft.scheduling?.startDate.getHours()
		}
	});
	const selectedFrequency = watch('frequency');
	const frequencyList: SchedulingDtoFrequencyEnum[] = [
		'ONDEMAND',
		'DAILY',
		'WEEKLY',
		'BIWEEKLY',
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

	const frequencySetup = () => {
		if (selectedFrequency === 'WEEKLY') {
			return (
				<Select
					id={`${draft.id}-select-day-week`}
					labelText={`${t('days-of-week')} *`}
					className='w-1/2'
					onChange={e =>
						setValue('dayOfWeek', [e.currentTarget.value as SchedulingDtoDayOfWeekEnum])
					}
				>
					{daysOfWeek.map(day => (
						<SelectItem value={day} text={TranslateDayOfWeek(day)} />
					))}
				</Select>
			);
		}
		if (selectedFrequency === 'BIWEEKLY') {
			return (
				<MultiSelect
					id={`${draft.id}-select-day-week-multi`}
					titleText={`${t('days-of-week')} *`}
					label={t('select-two-days')}
					className='w-1/2'
					items={daysOfWeek}
					itemToString={item => TranslateDayOfWeek(item)}
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
							id={`${draft.id}-day-month-input`}
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

	const saveDraft = (data: SchedulingFormData) => {
		return mutate(
			{
				draft: {
					...draft,
					scheduling: {
						frequency: data.frequency,
						startDate: setHours(data.date[0], data.startHour + 1),
						endDate:
							data.date.length > 1 ? setHours(data.date[1], data.startHour) : undefined,
						dayOfMonth: data.frequency === 'MONTHLY' ? data.dayOfMonth : undefined,
						dayOfWeek:
							data.frequency === 'BIWEEKLY' || data.frequency === 'WEEKLY'
								? data.dayOfWeek
								: undefined
					}
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	return (
		<FullWidthColumn className='space-y-7 overflow-auto'>
			<Layer className='xlg:w-1/2'>
				<Select
					id={`${draft.id}-frequency-select`}
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
						<SelectItem text={TranslateFrequency(option)} value={option} />
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
							datePickerType={getValues('frequency') === 'ONDEMAND' ? 'single' : 'range'}
							allowInput
							minDate={formatDate(startOfTomorrow(), 'P')}
						>
							<DatePickerInput
								id={`${draft.id}-start-date`}
								placeholder={placeholder}
								labelText={`${t('start-date')} *`}
								size='md'
							/>
							{getValues('frequency') !== 'ONDEMAND' && (
								<DatePickerInput
									id={`${draft.id}-end-date`}
									placeholder={placeholder}
									labelText={
										selectedFrequency === 'ONDEMAND'
											? t('end-date')
											: `${t('end-date')} *`
									}
									disabled={selectedFrequency === 'ONDEMAND'}
									size='md'
								/>
							)}
						</DatePicker>
					)}
				/>
				<TextInput
					id={`${draft.id}-select-hour`}
					placeholder={t('hour-placeholder')}
					labelText={`${t('start-time')} *`}
					invalidText={errors.startHour?.message}
					invalid={Boolean(errors.startHour)}
					{...register('startHour', {
						required: {
							value: true,
							message: `${t('field-required')}`
						},
						max: {
							value: 23,
							message: t('error-hour-input')
						},
						min: {
							value: 0,
							message: t('error-hour-input')
						},
						pattern: { value: /[0-9]/, message: t('error-hour-input') }
					})}
				/>
			</Layer>
			<Layer>{frequencySetup()}</Layer>
			<div>
				<span className='text-productive-heading-2'>{t('total-runs')}: </span>
				<span>5</span>
			</div>
			<div className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<InlineLoadingStatus
					{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
				/>
				<div>{isLoading && <InlineLoading />}</div>
				<Button
					size='md'
					kind='secondary'
					className='w-full md:w-fit'
					onClick={() => setCurrentStep(old => old - 1)}
				>
					{t('back')}
				</Button>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={handleSubmit(saveDraft)}
					disabled={isLoading || !isValid}
				>
					{t('save-next')}
				</Button>
			</div>
		</FullWidthColumn>
	);
};
export default SchedulingStepContainer;
