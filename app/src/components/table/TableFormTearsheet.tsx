import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import {
	ColumnDef,
	ModalInfoAllOrdered,
	ModalInfoDateOrdered,
	ModalInfoSelectOrdered,
	ModalInfoUserOrdered
} from '@tanstack/react-table';
import {
	TextInput,
	SwitcherDivider,
	NumberInput,
	Select,
	SelectItem,
	DatePicker,
	Button,
	DatePickerInput
} from '@carbon/react';
import cx from 'classnames';
import SingleUserSelect from '@components/SingleUserSelect';
import { useForm } from 'react-hook-form';
import User from '@model/User';
import useGetUsersByRole from '@api/user/useGetUsersByRole';
import MultipleUserSelect from '@components/MultipleUserSelect';
import { ChangeEvent, useState } from 'react';
import { Add } from '@carbon/react/icons';
import { UseMutationResult } from '@tanstack/react-query';

interface TableFormTearsheetProps<T> {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	columns: ColumnDef<T>[];
	title?: string;
	description?: string;
	label?: string;
	mutation: UseMutationResult<any, unknown, any, unknown>;
	setMutationResult?: (value: any) => void;
	mutationDefaultValues?: Record<string, any>;
}

const TableFormTearsheet = <T extends object>({
	isOpen,
	setIsOpen,
	columns,
	title,
	description,
	label,
	mutation,
	setMutationResult,
	mutationDefaultValues
}: TableFormTearsheetProps<T>) => {
	// managing object to send to mutation through this state, avoided useForm cause managing the different input programmatically was too difficult
	const [submitItem, setSubmitItem] = useState<Record<string, unknown>>(
		mutationDefaultValues ?? {}
	);
	const [multipleSubmitItem, setMultipleSubmitItem] = useState<Record<string, unknown>>(
		{}
	);
	const [moreColumns, setMoreColumns] = useState<typeof columns>([]);
	const isMultiple = columns.filter(col => col.meta?.modalInfo).length === 1;
	const { mutate, isLoading } = mutation;
	const cleanUp = () => {
		setIsOpen(false);
		setMultipleSubmitItem({});
		setSubmitItem(mutationDefaultValues ?? {});
	};

	const checkFieldorderPresent = (
		value: NonNullable<typeof columns[number]['meta']>['modalInfo']
	): value is
		| ModalInfoAllOrdered
		| ModalInfoSelectOrdered
		| ModalInfoDateOrdered
		| ModalInfoUserOrdered => {
		return Boolean(value && 'fieldOrder' in value);
	};

	const handleCreate = () => {
		if (isMultiple) {
			mutate(
				{
					[columns.filter(c => c.meta?.modalInfo)[0].meta?.modalInfo?.modelKeyName ?? '']:
						Object.values(multipleSubmitItem),
					...mutationDefaultValues
				},
				{
					onSuccess: (data: any) => {
						setMutationResult && setMutationResult((old: any) => [...old, data]);
						cleanUp();
					}
				}
			);
		} else {
			mutate(submitItem, {
				onSuccess: (data: any) => {
					setMutationResult && setMutationResult(data);
					cleanUp();
				}
			});
		}
	};

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
				{ label: 'create', id: 'create', onClick: handleCreate, disabled: isLoading }
			]}
		>
			<>
				<SwitcherDivider className='mx-0 mt-5 w-full' />
				<div className='mt-5 grid grid-cols-2 gap-x-7 gap-y-5 px-5'>
					{[...columns, ...moreColumns]
						.filter(col => col.meta?.modalInfo)
						.sort((a, b) => {
							const modInfoA = a.meta?.modalInfo;
							const modInfoB = b.meta?.modalInfo;
							return checkFieldorderPresent(modInfoA) && checkFieldorderPresent(modInfoB)
								? (modInfoA.fieldOrder ?? 0) - (modInfoB.fieldOrder ?? 0)
								: 1;
						})
						.map(column => {
							if (column.meta?.modalInfo?.type === 'string') {
								const name = `${column.meta?.modalInfo?.modelKeyName}${Math.random()}`;
								return (
									<TextInput
										className={cx('', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
										autoComplete='off'
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											isMultiple
												? setMultipleSubmitItem(old => ({
														...old,
														[name]: e.target.value
												  }))
												: setSubmitItem(old => ({
														...old,
														[column.meta?.modalInfo?.modelKeyName ?? '']:
															e.currentTarget.value
												  }));
										}}
										id={isMultiple ? name : column.meta?.modalInfo?.modelKeyName}
										labelText={column.header?.toString()}
										{...column.meta?.modalInfo?.validation}
									/>
								);
							}
							if (column.meta?.modalInfo?.type === 'number') {
								return (
									<NumberInput
										className={cx('', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
										onChange={(e, { value }) => {
											setSubmitItem(old => ({
												...old,
												[column.meta?.modalInfo?.modelKeyName ?? '']: value
											}));
										}}
										id={column.meta?.modalInfo?.modelKeyName}
										label={column.header?.toString()}
										{...column.meta?.modalInfo?.validation}
									/>
								);
							}
							if (column.meta?.modalInfo?.type === 'select') {
								return (
									<Select
										className={cx('', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
										onChange={e => {
											setSubmitItem(old => ({
												...old,
												[column.meta?.modalInfo?.modelKeyName ?? '']:
													e.currentTarget.value
											}));
										}}
										id={column.meta?.modalInfo?.modelKeyName}
										labelText={column.header?.toString()}
									>
										{column.meta?.modalInfo?.selectContent.map(item => (
											<SelectItem text={item} value={item} key={item} />
										))}
									</Select>
								);
							}
							if (column.meta?.modalInfo?.type === 'date') {
								return (
									<div
										className={cx('table-modal-form', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
									>
										<DatePicker
											id={column.meta?.modalInfo?.modelKeyName}
											datePickerType='single'
											dateFormat='d/m/Y'
											onChange={e => {
												setSubmitItem(old => ({
													...old,
													[column.meta?.modalInfo?.modelKeyName ?? '']: e[0]
												}));
											}}
											{...column.meta?.modalInfo?.validation}
										>
											<DatePickerInput
												labelText={column.header?.toString()}
												id='min'
												size='md'
												autoComplete='off'
												placeholder='dd/mm/yyyy'
											/>
										</DatePicker>
									</div>
								);
							}
							if (column.meta?.modalInfo?.type === 'user') {
								const { roleOfUsers } = column.meta.modalInfo;
								// eslint-disable-next-line react-hooks/rules-of-hooks
								const { control } = useForm<{ user: User }>({
									mode: 'onChange'
								});
								return (
									<div
										className={cx('table-modal-form', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
									>
										<SingleUserSelect
											control={control}
											label={column.header?.toString() ?? ''}
											name='user'
											setSelectedUser={user => {
												setSubmitItem(old => ({
													...old,
													[column.meta?.modalInfo?.modelKeyName ?? '']: user
												}));
											}}
											level={2}
											rules={column.meta.modalInfo.validation}
											getUserFn={() => {
												// eslint-disable-next-line react-hooks/rules-of-hooks
												return useGetUsersByRole(roleOfUsers);
											}}
										/>
									</div>
								);
							}
							if (column.meta?.modalInfo?.type === 'users') {
								const { roleOfUsers } = column.meta.modalInfo;
								// eslint-disable-next-line react-hooks/rules-of-hooks
								const { control } = useForm<{ users: User[] }>({
									mode: 'onChange'
								});
								return (
									<div
										className={cx('table-modal-form', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
									>
										<MultipleUserSelect
											control={control}
											label={column.header?.toString() ?? ''}
											name='users'
											level={2}
											setSelectedUser={user => {
												setSubmitItem(old => ({
													...old,
													[column.meta?.modalInfo?.modelKeyName ?? '']: user
												}));
											}}
											rules={column.meta.modalInfo.validation}
											getUserFn={() => {
												// eslint-disable-next-line react-hooks/rules-of-hooks
												return useGetUsersByRole(roleOfUsers);
											}}
										/>
									</div>
								);
							}
							return <div>Input not implemented yet</div>;
						})}
					{isMultiple && (
						<Button
							type='button'
							renderIcon={Add}
							size='md'
							kind='primary'
							onClick={() => {
								setMoreColumns(old => {
									return [...old, columns[0]];
								});
							}}
						>
							Add
						</Button>
					)}
				</div>
			</>
		</TearsheetNarrow>
	);
};

export default TableFormTearsheet;
