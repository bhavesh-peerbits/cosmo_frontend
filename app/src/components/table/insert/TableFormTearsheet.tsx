import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Column } from '@tanstack/react-table';
import { SwitcherDivider, Button } from '@carbon/react';
import {
	FieldArray,
	FieldValues,
	SubmitHandler,
	UnpackNestedValue,
	useFieldArray,
	UseFormReturn
} from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { Add, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import ColumnInput, { MetaColumn } from '@components/table/insert/ColumnInput';
import cx from 'classnames';

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

	const { t } = useTranslation('table');

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

	const cleanUp = () => {
		reset(
			Object.keys(touchedFields).reduce(
				(acc, n) => ({ ...acc, [n]: undefined }),
				{} as UnpackNestedValue<F>
			)
		);
		onClose();
	};

	const { fields, append, remove } = useFieldArray({
		control,
		name: allColumns[0].columnDef.meta.modalInfo.id
	});

	const formatData: SubmitHandler<F> = (data, event) => {
		if (allColumns.length === 1) {
			const arrayVal = data[allColumns[0].columnDef.meta.modalInfo.id];
			onSubmit(
				{
					[allColumns[0].columnDef.meta.modalInfo.id]: arrayVal.map(
						(a: { value: string }) => a.value
					)
				} as UnpackNestedValue<F>,
				event
			);
		} else onSubmit(data, event);
	};

	useEffect(() => {
		if (allColumns.length === 1 && fields.length === 0) {
			append({ value: null } as UnpackNestedValue<FieldArray<F, never>>);
		}
	}, [allColumns.length, append, fields.length]);

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
					label: t('cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel'
				},
				{
					label: t('create'),
					id: 'create',
					onClick: handleSubmit((data, event) => formatData(data, event)),
					disabled: !isValid && isSubmitting
				}
			]}
		>
			<>
				<SwitcherDivider className='mx-0 mt-5 w-full' />
				<div className='mt-5 grid grid-cols-2 gap-x-7 gap-y-5 px-5'>
					{allColumns.length === 1 ? (
						<>
							{fields.map((item, index) => {
								const modInfo = allColumns[0].columnDef.meta.modalInfo;
								return (
									<div
										key={item.id}
										className={cx('flex items-start', {
											'col-span-2': modInfo.fullWidth !== false
										})}
									>
										<ColumnInput
											column={allColumns[0]}
											controlId={`${modInfo.id}.${index}.value` as const}
											errors={
												{
													[`${modInfo.id}.${index}.value`]:
														errors[modInfo.id]?.[index]?.value
												} as typeof errors
											}
											{...{
												isOpen,
												control,
												watch,
												register
											}}
										/>
										<Button
											className='mt-6'
											kind='ghost'
											size='md'
											disabled={index === 0}
											iconDescription={t('cancel')}
											hasIconOnly
											renderIcon={TrashCan}
											onClick={() => remove(index)}
										/>
									</div>
								);
							})}
							<Button
								type='button'
								className='col-span-2'
								renderIcon={Add}
								size='md'
								kind='primary'
								onClick={() => {
									append({ value: null } as UnpackNestedValue<FieldArray<F, never>>);
								}}
							>
								{t('add')}
							</Button>
						</>
					) : (
						allColumns.map(col => (
							<ColumnInput
								key={col.id}
								column={col}
								controlId={col.columnDef.meta.modalInfo.id}
								{...{
									isOpen,
									control,
									watch,
									errors,
									register
								}}
							/>
						))
					)}
				</div>
			</>
		</TearsheetNarrow>
	);
};
export default TableFormTearsheet;
