/* eslint-disable no-nested-ternary */
import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	MultiSelect,
	NumberInput,
	Button,
	InlineLoading,
	Toggle,
	Tooltip
} from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { setHours, isBefore, startOfToday } from 'date-fns';
import { Dispatch, SetStateAction, Suspense } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';
import DatePickerWrapper from '@components/DatePickerWrapper';
import useSaveDraftScheduling from '@api/change-monitoring-analyst/useSaveDraftScheduling';
import { useParams } from 'react-router-dom';
import SchedulingTotalRunsContainer from './SchedulingTotalRunsContainer';

type SchedulingFormData = {
	frequency: SchedulingDtoFrequencyEnum;
	startDate: Date;
	endDate: Date;
	startHour: number;
	dayOfWeek: SchedulingDtoDayOfWeekEnum;
	daysOfWeek: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth: number;
};

type SchedulingStepProps = {
	draft: MonitoringDraft;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const SchedulingStepContainer = ({ draft, setCurrentStep }: SchedulingStepProps) => {
	const { t } = useTranslation('changeMonitoring');
	const { monitoringDraftId = '' } = useParams();
	const { mutate, isLoading, isError, isSuccess, error } = useSaveDraftScheduling();

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
			frequency: draft.scheduling?.frequency || 'ONDEMAND',
			startDate: draft.scheduling?.startDate,
			endDate: draft.scheduling?.endDate,
			dayOfWeek:
				draft.scheduling?.dayOfWeek?.length === 1
					? draft.scheduling?.dayOfWeek[0]
					: 'MONDAY',
			daysOfWeek:
				draft.scheduling?.dayOfWeek?.length === 2
					? draft.scheduling?.dayOfWeek
					: ['MONDAY', 'TUESDAY'],
			startHour: draft.scheduling?.startDate.getHours()
				? +draft.scheduling.startDate.getHours() - 1
				: 1
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
					className='w-full'
					onChange={e =>
						setValue('dayOfWeek', e.currentTarget.value as SchedulingDtoDayOfWeekEnum)
					}
					defaultValue='MONDAY'
				>
					{daysOfWeek.map(day => (
						<SelectItem value={day} text={t(day)} key={day} />
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
					items={daysOfWeek}
					itemToString={item => t(item)}
					onChange={e =>
						setValue(
							'daysOfWeek',
							e.selectedItems.map(item => item)
						)
					}
					invalid={Array.isArray(watch('daysOfWeek')) && watch('daysOfWeek').length > 2}
					invalidText={t('invalid-days-select')}
					className='w-full'
					initialSelectedItems={
						draft.scheduling?.dayOfWeek?.length === 2
							? draft.scheduling?.dayOfWeek
							: ['MONDAY', 'TUESDAY']
					}
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
							value: selectedFrequency === 'MONTHLY',
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
							label={`${t('day-of-month')} *`}
							className='w-full'
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
				monitoringId: monitoringDraftId,
				scheduling: {
					frequency: data.frequency,
					startDate: setHours(data.startDate, +data.startHour + 1),
					endDate:
						data.frequency !== 'ONDEMAND'
							? setHours(data.endDate, +data.startHour + 1)
							: setHours(data.startDate, +data.startHour + 1),
					dayOfMonth: data.frequency === 'MONTHLY' ? data.dayOfMonth : undefined,
					dayOfWeek:
						data.frequency === 'BIWEEKLY'
							? data.daysOfWeek
							: data.frequency === 'WEEKLY'
							? [data.dayOfWeek]
							: undefined
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	return (
		<>
			<FullWidthColumn className='space-y-7 overflow-auto'>
				<div className='w-full space-y-7 md:w-fit'>
					<Layer className='flex flex-col space-y-7 md:flex-row md:space-y-0 md:space-x-5'>
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
								<SelectItem text={t(option)} value={option} key={option} />
							))}
						</Select>
						{frequencySetup()}
					</Layer>
					<Layer className='flex flex-col space-y-7 sm:flex-col md:flex-row md:space-x-5 md:space-y-0 '>
						<div className='flex flex-col space-y-7 md:flex-row md:space-y-0 md:space-x-1'>
							<DatePickerWrapper
								control={control}
								name='startDate'
								label={`${t('start-date')} *`}
								rules={{
									required: {
										value: true,
										message: `${t('field-required')}`
									}
								}}
								minDate={startOfToday()}
							/>
							{selectedFrequency !== 'ONDEMAND' && (
								<DatePickerWrapper
									control={control}
									name='endDate'
									label={`${t('end-date')} *`}
									rules={{
										required: {
											value: true,
											message: `${t('field-required')}`
										}
									}}
									minDate={getValues('startDate')}
								/>
							)}
						</div>
						<Select
							id={`${draft.id}-select-hour`}
							labelText={`${t('start-time')} *`}
							{...register('startHour', {
								required: {
									value: true,
									message: `${t('field-required')}`
								}
							})}
						>
							{Array.from(Array(24).keys()).map(hour => (
								<SelectItem value={hour} text={`${hour}:00`} />
							))}
						</Select>
					</Layer>
				</div>
			</FullWidthColumn>

			{isBefore(
				new Date(watch('startDate')).setHours(watch('startHour')),
				new Date()
			) && (
				<FullWidthColumn>
					<Toggle
						id='toggle-start-today'
						labelA='No'
						labelB={t('yes')}
						labelText={
							<div className='flex space-x-3'>
								<p className='text-label-1'>{t('start-run-today')}</p>
								<Tooltip align='top' label={t('toggle-start-today')}>
									<button type='button' onClick={e => e.preventDefault()}>
										<Information />
									</button>
								</Tooltip>
							</div>
						}
						aria-label='Toggle start today'
					/>
				</FullWidthColumn>
			)}

			<FullWidthColumn>
				<Suspense>
					{watch('startDate') && (
						<SchedulingTotalRunsContainer
							scheduling={{
								frequency: watch('frequency'),
								startDate: setHours(watch('startDate'), +watch('startHour') + 1),
								endDate:
									watch('frequency') !== 'ONDEMAND'
										? setHours(watch('endDate'), +watch('startHour') + 1)
										: setHours(watch('startDate'), +watch('startHour') + 1),
								dayOfMonth:
									watch('frequency') === 'MONTHLY' ? watch('dayOfMonth') : undefined,
								dayOfWeek:
									watch('frequency') === 'BIWEEKLY'
										? watch('daysOfWeek')
										: watch('frequency') === 'WEEKLY'
										? [watch('dayOfWeek')]
										: undefined
							}}
						/>
					)}
				</Suspense>
			</FullWidthColumn>

			<FullWidthColumn className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
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
					disabled={
						isLoading ||
						!isValid ||
						(watch('frequency') === 'BIWEEKLY' && watch('daysOfWeek').length < 2)
					}
				>
					{t('save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default SchedulingStepContainer;
