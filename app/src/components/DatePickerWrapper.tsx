import { DatePicker, DatePickerInput } from '@carbon/react';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import useGetDateFormat from '@hooks/useGetDateFormat';
import { format as formatDate } from 'date-fns';

interface DatePickerWrapperProps<T extends FieldValues, TName extends FieldPath<T>> {
	control: UseControllerProps<T, TName>['control'];
	name: TName;
	minDate?: Date;
	label: string;
	rules?: UseControllerProps<T, TName>['rules'];
}

const DatePickerWrapper = <T extends FieldValues, TName extends FieldPath<T>>({
	control,
	label,
	rules,
	name,
	minDate
}: DatePickerWrapperProps<T, TName>) => {
	const { format, placeholder, localeCode, locale } = useGetDateFormat();
	const formatShort = (date: Date) => formatDate(date, 'P', { locale });

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<DatePicker
					locale={localeCode}
					dateFormat={format}
					datePickerType='single'
					onBlur={onBlur}
					onChange={v => onChange(v[0])}
					allowInput
					className='w-full'
					minDate={minDate ? formatShort(minDate) : undefined}
					value={value}
				>
					<DatePickerInput id={name} placeholder={placeholder} labelText={label} />
				</DatePicker>
			)}
		/>
	);
};

export default DatePickerWrapper;