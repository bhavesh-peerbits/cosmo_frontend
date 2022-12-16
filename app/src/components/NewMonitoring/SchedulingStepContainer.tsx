import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	TimePicker,
	TimePickerSelect,
	DatePicker,
	DatePickerInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

// TODO Fix id of components when BE is ready
const SchedulingStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
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
	return (
		<FullWidthColumn>
			<Layer className='flex space-x-5'>
				<Select id='frequency-select' labelText={t('frequency')} className='w-full'>
					<SelectItem text={t('select-frequency-type')} value='select' hidden />
					{frequencyList.map(option => (
						<SelectItem text={option.text} value={option.value} />
					))}
				</Select>

				<DatePicker datePickerType='range' className=''>
					<DatePickerInput
						id='date-picker-input-id-start'
						placeholder='mm/dd/yyyy'
						labelText={t('start-date')}
						size='md'
					/>
					<DatePickerInput
						id='date-picker-input-id-finish'
						placeholder='mm/dd/yyyy'
						labelText={t('end-date')}
						size='md'
					/>
				</DatePicker>
				<TimePicker id='select-time' labelText={t('start-time')}>
					<TimePickerSelect id='time-picker-select-1'>
						<SelectItem value='AM' text='AM' />
						<SelectItem value='PM' text='PM' />7{' '}
					</TimePickerSelect>{' '}
					<TimePickerSelect id='time-picker-select-2'>
						<SelectItem value='Time zone 1' text='Time zone 1' />
						<SelectItem value='Time zone 2' text='Time zone 2' />{' '}
					</TimePickerSelect>
				</TimePicker>
			</Layer>
		</FullWidthColumn>
	);
};
export default SchedulingStepContainer;
