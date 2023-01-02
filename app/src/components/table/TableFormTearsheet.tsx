import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { ColumnDef } from '@tanstack/react-table';
import {
	TextInput,
	SwitcherDivider,
	NumberInput,
	Select,
	SelectItem,
	DatePicker,
	DatePickerInput
} from '@carbon/react';
import cx from 'classnames';
import SingleUserSelect from '@components/SingleUserSelect';
import { useForm } from 'react-hook-form';
import User from '@model/User';
import useGetUsersByRole from '@api/user/useGetUsersByRole';
import MultipleUserSelect from '@components/MultipleUserSelect';

interface TableFormTearsheetProps<T> {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	columns: ColumnDef<T>[];
}

const TableFormTearsheet = <T extends object>({
	isOpen,
	setIsOpen,
	columns
}: TableFormTearsheetProps<T>) => {
	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<TearsheetNarrow
			open={isOpen}
			title='prova'
			onClose={cleanUp}
			actions={[
				{
					label: 'cancel',
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel'
				},
				{ label: 'create', id: 'create' }
			]}
		>
			<>
				<SwitcherDivider className='mt-5 w-[95%]' />
				<div className='mt-5 grid grid-cols-2 gap-x-7 gap-y-5 px-7'>
					{columns
						.filter(col => col.meta?.modalInfo)
						.map(column => {
							if (column.meta?.modalInfo?.type === 'string') {
								return (
									<TextInput
										className={cx('', {
											'col-span-1': column.meta?.modalInfo?.halfWidth,
											'col-span-2': !column.meta?.modalInfo?.halfWidth
										})}
										autoComplete='off'
										id={column.meta?.modalInfo?.modelKeyName}
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
				</div>
			</>
		</TearsheetNarrow>
	);
};

export default TableFormTearsheet;
