/* eslint-disable @typescript-eslint/ban-ts-comment */
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import {
	Column,
	ColumnDef,
	ColumnMeta,
	flexRender,
	ModalInfo
} from '@tanstack/react-table';
import {
	TextInput,
	SwitcherDivider,
	NumberInput,
	Dropdown,
	DatePicker,
	Button,
	DatePickerInput
} from '@carbon/react';
import cx from 'classnames';
import SingleUserSelect from '@components/SingleUserSelect';
import {
	FieldValues,
	SubmitHandler,
	UnpackNestedValue,
	UseFormReturn
} from 'react-hook-form';
import MultipleUserSelect from '@components/MultipleUserSelect';
import { useMemo } from 'react';
import { Add } from '@carbon/react/icons';

interface TableFormTearsheetProps<T, F extends FieldValues> {
	isOpen: boolean;
	columns: Column<T>[];
	title?: string;
	description?: string;
	label?: string;
	onClose: () => void;
	form: UseFormReturn<F>;
	onSubmit: SubmitHandler<F>;
}

type MetaColumn<T extends object, F extends FieldValues> = Column<T> & {
	columnDef: ColumnDef<T, unknown, F> & {
		meta: ColumnMeta<T, unknown, F> & {
			modalInfo: ModalInfo<F>;
		};
	};
};

const TableFormTearsheet = <T extends object, F extends FieldValues>({
	isOpen,
	columns,
	title,
	description,
	label,
	form,
	onClose,
	onSubmit
}: TableFormTearsheetProps<T, F>) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		formState: { touchedFields, errors, isValid, isSubmitting }
	} = form;

	const cleanUp = () => {
		reset(
			Object.keys(touchedFields).reduce(
				(acc, n) => ({ ...acc, [n]: null }),
				{} as UnpackNestedValue<F>
			)
		);
		onClose();
	};

	const allColumns = useMemo(
		() =>
			columns
				.filter((col): col is MetaColumn<T, F> =>
					Boolean(col.columnDef.meta && col.columnDef.meta.modalInfo)
				)
				.sort((a, b) =>
					a.columnDef.meta.modalInfo.fieldOrder !== undefined &&
					b.columnDef.meta.modalInfo.fieldOrder !== undefined
						? a.columnDef.meta.modalInfo.fieldOrder -
						  b.columnDef.meta.modalInfo.fieldOrder
						: 1
				),
		[columns]
	);

	return (
		<TearsheetNarrow
			open={isOpen}
			title={title}
			label={label}
			description={description}
			onClose={cleanUp}
			hasCloseIcon
			actions={[
				{
					label: 'cancel',
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel'
				},
				{
					label: 'create',
					id: 'create',
					onClick: handleSubmit(onSubmit),
					disabled: !isValid && isSubmitting
				}
			]}
		>
			<>
				<SwitcherDivider className='mx-0 mt-5 w-full' />
				<div className='mt-5 grid grid-cols-2 gap-x-7 gap-y-5 px-5'>
					{allColumns.map(col => {
						const modInfo = col.columnDef.meta.modalInfo;
						const inputLabel =
							// @ts-ignore
							modInfo.label || flexRender(col.columnDef.header, { col }) || col.id;
						const placeholder = modInfo.placeholder ?? inputLabel;
						const widthClass = cx({
							'col-span-1': !modInfo.fullWidth,
							'col-span-2': modInfo.fullWidth
						});

						if (modInfo.type === 'number') {
							return (
								<NumberInput
									className={widthClass}
									invalidText={errors[modInfo.id]?.message}
									invalid={Boolean(errors[modInfo.id])}
									labelText={inputLabel}
									id={modInfo.id}
									// @ts-ignore
									placeholder={placeholder}
									{...register(modInfo.id, modInfo.validation)}
								/>
							);
						}
						if (modInfo.type === 'select') {
							const { onChange, ...restRegister } = register(
								modInfo.id,
								modInfo.validation
							);
							return (
								<Dropdown
									className={widthClass}
									id={modInfo.id}
									titleText={inputLabel}
									label={placeholder}
									items={modInfo.values}
									itemToString={val => (typeof val === 'string' ? val : val.label)}
									invalidText={errors[modInfo.id]?.message}
									invalid={Boolean(errors[modInfo.id])}
									{...restRegister}
									selectedItem={
										watch(modInfo.id) as unknown as string | { id: string; label: string }
									}
									onChange={({ selectedItem }) =>
										onChange({
											target: {
												value: selectedItem,
												name: modInfo.id
											}
										})
									}
								/>
							);
						}
						if (modInfo.type === 'date' && isOpen) {
							// to reset the input
							const { onChange, ...restRegister } = register(
								modInfo.id,
								modInfo.validation
							);
							return (
								<div className={cx('table-modal-form', widthClass)}>
									<DatePicker
										id={modInfo.id}
										datePickerType='single'
										dateFormat='d/m/Y'
										maxDate={modInfo.validation.maxDate}
										minDate={modInfo.validation.minDate}
										onChange={e =>
											onChange({ target: { value: e[0], name: modInfo.id } })
										}
										{...restRegister}
									>
										<DatePickerInput
											labelText={inputLabel}
											invalidText={errors[modInfo.id]?.message}
											invalid={Boolean(errors[modInfo.id])}
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
								<div className={cx('table-modal-form', widthClass)}>
									{/* @ts-ignore */}
									<SingleUserSelect
										control={control}
										label={inputLabel}
										name={modInfo.id}
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
								<div className={cx('table-modal-form', widthClass)}>
									{/* @ts-ignore */}
									<MultipleUserSelect
										control={control}
										label={inputLabel}
										name={modInfo.id}
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
								className={widthClass}
								autoComplete='off'
								invalidText={errors[modInfo.id]?.message}
								invalid={Boolean(errors[modInfo.id])}
								labelText={inputLabel}
								id={modInfo.id}
								// @ts-ignore
								placeholder={placeholder}
								{...register(modInfo.id, modInfo.validation)}
							/>
						);
					})}

					{/* <Button */}
					{/*	type='button' */}
					{/*	renderIcon={Add} */}
					{/*	size='md' */}
					{/*	kind='primary' */}
					{/*	onClick={() => {}} */}
					{/* > */}
					{/*	Add */}
					{/* </Button> */}
				</div>
			</>
		</TearsheetNarrow>
	);
};
export default TableFormTearsheet;
