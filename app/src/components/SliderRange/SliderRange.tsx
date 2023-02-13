import { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { TextInput } from '@carbon/react';
import {
	FieldValues,
	Path,
	PathValue,
	UnpackNestedValue,
	UseFormGetValues,
	UseFormSetValue
} from 'react-hook-form';
import './slider-range.scss';

interface DoubleSliderProps<TFormValues extends FieldValues> {
	name: Path<TFormValues>;
	labelText: string;
	getValues: UseFormGetValues<TFormValues>;
	setValue: UseFormSetValue<TFormValues>;
	min?: number;
	size?: 'sm' | 'md';
	max?: number;
	idDS: string;
}

const DoubleSlider = <TFormValues extends FieldValues>({
	name,
	labelText,
	getValues,
	setValue,
	size = 'md',
	min = 0,
	max = 3,
	idDS
}: DoubleSliderProps<TFormValues>) => {
	const getValuesForSlider = () => {
		const range = getValues(name);
		if (!range) return [min, max];
		return range;
	};

	const [values, setValues] = useState<number[]>(getValuesForSlider());

	const parseValue = (range: PathValue<TFormValues, Path<TFormValues>>, id: number) => {
		if (!range) return '';
		return range[id];
	};

	return (
		<div className='flex flex-col'>
			<div className='cds--label'>{labelText}</div>
			<div className=' flex w-full flex-row space-x-4' id='slider-container'>
				<TextInput
					id={`${idDS}min`}
					type='number'
					labelText='min'
					hideLabel
					size={size}
					autoComplete='off'
					value={parseValue(getValues(name), 0)}
					placeholder={`${min}`}
					onChange={e => {
						const val = e.currentTarget.value ? Number(e.currentTarget.value) : undefined;
						if (val !== undefined && val >= min && val <= max) {
							setValues(old => [val, old[1]].sort((a, b) => a - b));
							setValue(
								name,
								[val, values[1]].sort((a, b) => a - b) as UnpackNestedValue<
									PathValue<TFormValues, Path<TFormValues>>
								>
							);
						} else if (val === undefined) {
							setValues(old => [min, old[1]]);
							setValue(name, [val, values[1]] as UnpackNestedValue<
								PathValue<TFormValues, Path<TFormValues>>
							>);
						}
					}}
				/>
				<div className='flex w-full items-center space-x-2'>
					<SliderPrimitive.Root
						className='relative flex h-5 w-full cursor-pointer touch-none select-none items-center p-3'
						defaultValue={getValuesForSlider()}
						value={getValuesForSlider()}
						max={max}
						min={min}
						step={1}
						aria-label='Range'
						onValueChange={value => {
							setValues(value);
							setValue(
								name,
								value as UnpackNestedValue<PathValue<TFormValues, Path<TFormValues>>>
							);
						}}
					>
						<SliderPrimitive.Track className='relative h-[2px] flex-grow rounded-full bg-border-subtle-1'>
							<SliderPrimitive.Range className='absolute h-full rounded-full bg-layer-selected-inverse focus:bg-interactive' />
						</SliderPrimitive.Track>
						<SliderPrimitive.Thumb className='slider-thumb block h-[14px] w-[14px] rounded-full bg-layer-selected-inverse focus:bg-interactive' />
						<SliderPrimitive.Thumb className='slider-thumb block h-[14px] w-[14px] rounded-full bg-layer-selected-inverse focus:bg-interactive' />
					</SliderPrimitive.Root>
				</div>
				<TextInput
					id={`${idDS}max`}
					type='number'
					labelText='max'
					hideLabel
					size={size}
					autoComplete='off'
					placeholder={`${max}`}
					value={parseValue(getValues(name), 1)}
					onChange={e => {
						const val = e.currentTarget.value ? Number(e.currentTarget.value) : undefined;
						if (val && val >= min && val <= max) {
							setValues(old => [old[0], val].sort((a, b) => a - b));
							setValue(
								name,
								[values[0], val].sort((a, b) => a - b) as UnpackNestedValue<
									PathValue<TFormValues, Path<TFormValues>>
								>
							);
						} else if (!val) {
							setValues(old => [old[0], max]);
							setValue(name, [values[0], val] as UnpackNestedValue<
								PathValue<TFormValues, Path<TFormValues>>
							>);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default DoubleSlider;
