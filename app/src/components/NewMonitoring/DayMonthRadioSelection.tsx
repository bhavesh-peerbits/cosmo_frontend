import {
	RadioButtonGroup,
	RadioButton,
	NumberInput,
	Select,
	SelectItem
} from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type DayMonthRadioSelectionProps = {
	name: string;
	setSelectedRadio: Dispatch<SetStateAction<string | number | undefined>>;
	daysOfWeek: {
		value: string;
		text: string;
	}[];
};

const DayMonthRadioSelection = ({
	name,
	setSelectedRadio,
	daysOfWeek
}: DayMonthRadioSelectionProps) => {
	const { t } = useTranslation('changeMonitoring');
	return (
		<RadioButtonGroup
			name={`${name}-radio`}
			orientation='vertical'
			onChange={value => setSelectedRadio(value)}
		>
			<RadioButton
				labelText={
					<NumberInput
						id={`${name}-day-month-input`}
						label={t('day-of-month')}
						size='sm'
						value={1}
						min={1}
						max={31}
						className='w-min'
					/>
				}
				value={`${name}-day-month`}
			/>
			<RadioButton
				labelText={
					<div className='flex space-x-3'>
						<Select id={`${name}-custom-day-month-order`} size='sm' hideLabel>
							<SelectItem text={t('first')} value='first' />
							<SelectItem text={t('second')} value='second' />
							<SelectItem text={t('third')} value='third' />
							<SelectItem text={t('last')} value='last' />
						</Select>
						<Select id={`${name}-custom-day-week-select`} size='sm' hideLabel>
							{daysOfWeek.map(day => (
								<SelectItem value={day.value} text={day.text} />
							))}
						</Select>
					</div>
				}
				value={`custom-${name}-day-month`}
			/>
		</RadioButtonGroup>
	);
};
export default DayMonthRadioSelection;
