import { Button, Column, Grid, TextInput } from '@carbon/react';
import User from '@model/User';
import { icons } from '@components/IconPicker';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import { useController, useForm } from 'react-hook-form';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { Checkmark } from '@carbon/react/icons';
import { useState } from 'react';

export interface GeneralInfoForm {
	generalInfo: {
		name: string;
		icon: keyof typeof icons;
		codeName: string;
		owner: User;
		description: string;
		delegates: User[];
		appMaintenance: string;
		operationSupplier: string;
	};
}

const GeneralInfoReview = () => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const {
		control,
		register,
		formState: { errors, isValid }
	} = useForm<GeneralInfoForm>({
		mode: 'onChange'
	});
	const {
		field: {
			onChange: onChangeDescription,
			value: descriptionValue,
			ref: descriptionRef,
			onBlur: onBlurDescription
		}
	} = useController({
		control,
		name: 'generalInfo.description'
	});

	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					defaultValue='value'
					className='w-full'
					id='name'
					invalidText={errors.generalInfo?.name?.message}
					labelText='Name *'
					placeholder='Name'
					helperText='Application name'
					invalid={Boolean(errors.generalInfo?.name)}
					{...register('generalInfo.name', {
						required: {
							value: true,
							message: 'Required'
						}
					})}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					defaultValue='value'
					className='w-full'
					id='code'
					invalidText={errors.generalInfo?.codeName?.message}
					labelText='Code *'
					placeholder='Code'
					helperText='Acronym for the application name'
					invalid={Boolean(errors.generalInfo?.codeName)}
					{...register('generalInfo.codeName', {
						required: {
							value: true,
							message: 'Required'
						}
					})}
				/>
			</Column>
			<FullWidthColumn className='mb-5'>
				<SingleUserSelect
					control={control}
					label='Owner *'
					name='generalInfo.owner'
					rules={{
						required: true
					}}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='mb-5'>
				<MultipleUserSelect
					control={control}
					label='Owner Delegates'
					name='generalInfo.delegates'
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-maintenance-supplier'
					labelText='Application Maintenance Supplier'
					placeholder='Application maintenance supplier'
					{...register('generalInfo.appMaintenance')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='operation-supplier'
					labelText='Operation Supplier'
					placeholder='Operation supplier'
					{...register('generalInfo.operationSupplier')}
				/>
			</Column>
			<FullWidthColumn className='mb-5'>
				<div>
					<p className='mb-3 text-text-secondary text-label-1'> Description </p>
					<TiptapEditor
						content={descriptionValue}
						onChange={onChangeDescription}
						onBlur={onBlurDescription}
						ref={descriptionRef}
					/>
				</div>
			</FullWidthColumn>

			<FullWidthColumn className='flex justify-end'>
				{isConfirmed ? (
					<div className='flex h-8 items-center space-x-2 text-link-primary'>
						<p className='text-body-short-2'>Confirmed</p>
						<Checkmark />
					</div>
				) : (
					<Button
						type='submit'
						onClick={() => setIsConfirmed(true)}
						disabled={!isValid}
						size='md'
					>
						Confirm
					</Button>
				)}
			</FullWidthColumn>
		</Grid>
	);
};
export default GeneralInfoReview;
