/* eslint-disable @typescript-eslint/ban-ts-comment */
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import {
	Column,
	ColumnDef,
	ColumnMeta,
	flexRender,
	ModalInfo
} from '@tanstack/react-table';
import cx from 'classnames';
import {
	TextInput,
	NumberInput,
	Dropdown,
	DatePicker,
	DatePickerInput
} from '@carbon/react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

export type MetaColumn<T extends object, F extends FieldValues> = Column<T> & {
	columnDef: ColumnDef<T, unknown, F> & {
		meta: ColumnMeta<T, unknown, F> & {
			modalInfo: ModalInfo<F>;
		};
	};
};

interface ColumnInputProps<T extends object, F extends FieldValues> {
	column: MetaColumn<T, F>;
	controlId: FieldPath<F>;
	register: UseFormReturn<F>['register'];
	control: UseFormReturn<F>['control'];
	watch: UseFormReturn<F>['watch'];
	errors: UseFormReturn<F>['formState']['errors'];
	isOpen: boolean;
}

const ColumnInput = <T extends object, F extends FieldValues>({
	column: col,
	controlId,
	register,
	control,
	errors,
	watch,
	isOpen
}: ColumnInputProps<T, F>) => {
	const modInfo = col.columnDef.meta.modalInfo;
	const inputLabel =
		// @ts-ignore
		modInfo.label || flexRender(col.columnDef.header, { col }) || col.id;
	const placeholder = modInfo.placeholder || inputLabel;
	const widthClass = cx('w-full', {
		'col-span-1': modInfo.fullWidth === false,
		'col-span-2': modInfo.fullWidth !== false
	});

	if (modInfo.type === 'number') {
		return (
			<NumberInput
				key={col.id}
				className={widthClass}
				invalidText={errors[controlId]?.message}
				invalid={Boolean(errors[controlId])}
				labelText={inputLabel}
				id={controlId}
				// @ts-ignore
				placeholder={placeholder}
				{...register(controlId, modInfo.validation)}
			/>
		);
	}
	if (modInfo.type === 'select') {
		const { onChange, ...restRegister } = register(controlId, modInfo.validation);
		return (
			<Dropdown
				key={col.id}
				className={widthClass}
				id={controlId}
				titleText={inputLabel}
				label={
					<span className='text-text-placeholder text-body-compact-1'>{placeholder}</span>
				}
				items={modInfo.values}
				itemToString={val => (typeof val === 'string' ? val : val.label)}
				invalidText={errors[controlId]?.message}
				invalid={Boolean(errors[controlId])}
				{...restRegister}
				selectedItem={
					watch(controlId) as unknown as string | { id: string; label: string }
				}
				onChange={({ selectedItem }) =>
					onChange({
						target: {
							value: selectedItem,
							name: controlId
						}
					})
				}
			/>
		);
	}
	if (modInfo.type === 'date' && isOpen) {
		// to reset the input
		const { onChange, ...restRegister } = register(controlId, modInfo.validation);
		return (
			<div key={col.id} className={cx('table-modal-form', widthClass)}>
				<DatePicker
					id={controlId}
					datePickerType='single'
					dateFormat='d/m/Y'
					maxDate={modInfo.validation.maxDate}
					minDate={modInfo.validation.minDate}
					onChange={e => onChange({ target: { value: e[0], name: controlId } })}
					{...restRegister}
				>
					<DatePickerInput
						labelText={inputLabel}
						invalidText={errors[controlId]?.message}
						invalid={Boolean(errors[controlId])}
						id='min'
						size='md'
						autoComplete='off'
						placeholder='dd/mm/yyyy'
					/>
				</DatePicker>
			</div>
		);
	}
	if (modInfo.type === 'user') {
		return (
			<div key={col.id} className={cx('table-modal-form', widthClass)}>
				{/* @ts-ignore */}
				<SingleUserSelect
					control={control}
					label={inputLabel}
					name={controlId}
					level={2}
					rules={modInfo.validation}
					getUserFn={modInfo.userFn}
					excludedUsers={modInfo.excludedUsers}
				/>
			</div>
		);
	}
	if (modInfo.type === 'users') {
		return (
			<div key={col.id} className={cx('table-modal-form', widthClass)}>
				{/* @ts-ignore */}
				<MultipleUserSelect
					control={control}
					label={inputLabel}
					name={controlId}
					level={2}
					rules={modInfo.validation}
					getUserFn={modInfo.userFn}
					excludedUsers={modInfo.excludedUsers}
				/>
			</div>
		);
	}
	return (
		<TextInput
			key={col.id}
			className={widthClass}
			autoComplete='off'
			invalidText={errors[controlId]?.message}
			invalid={Boolean(errors[controlId])}
			labelText={inputLabel}
			id={controlId}
			// @ts-ignore
			placeholder={placeholder}
			{...register(controlId, modInfo.validation)}
		/>
	);
};

export default ColumnInput;
