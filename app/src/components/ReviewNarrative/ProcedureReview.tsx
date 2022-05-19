import { Form, Grid, Button, TextInput, Column } from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { Checkmark } from '@carbon/react/icons';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import { useController, useForm } from 'react-hook-form';
import { useState } from 'react';

interface ProcedureData {
	name: string;
	owner: User;
	delegated: User[];
	description: string;
	lastModify: Date;
	lastModifier: User;
	lastReview: Date;
	lastReviewer: User;
}

interface ProcedureReviewProps {
	procedure: Partial<ProcedureAppInstance>;
}

const ProcedureReview = ({ procedure }: ProcedureReviewProps) => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const {
		control,
		register,
		reset,
		formState: { errors, isDirty, isValid }
	} = useForm<ProcedureData>({
		mode: 'onChange',
		defaultValues: {
			name: procedure.name,
			owner: procedure.owner,
			delegated: procedure.delegated,
			description: procedure.description,
			lastModify: procedure.lastModify,
			lastModifier: procedure.lastModifier,
			lastReview: procedure.lastReview,
			lastReviewer: procedure.lastReviewer
		}
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
		name: 'description'
	});
	return (
		<Form>
			<Grid fullWidth>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='procedure'
						labelText='Procedure *'
						placeholder='Procedure Name'
						invalidText={errors.name?.message}
						invalid={Boolean(errors.name)}
						{...register('name', {
							required: {
								value: true,
								message: 'Procedure is required'
							}
						})}
					/>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<SingleUserSelect
						control={control}
						label='Procedure Owner *'
						name='owner'
						rules={{
							required: {
								value: true,
								message: 'Please select a procedure owner'
							}
						}}
					/>
				</Column>
				<FullWidthColumn className='mb-5'>
					<MultipleUserSelect
						control={control}
						label='Owner Delegates'
						name='delegated'
					/>
				</FullWidthColumn>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<DatePickerWrapper
						control={control}
						label='Last Modify Date'
						name='lastModify'
						minDate={new Date()}
					/>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<SingleUserSelect
						control={control}
						label='Last Modifier *'
						name='lastModifier'
						rules={{
							required: {
								value: true,
								message: 'Please select a last modifier'
							}
						}}
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
					<div className='flex w-full flex-1 items-center justify-end space-x-5'>
						<Button
							type='reset'
							kind='tertiary'
							disabled={!isDirty || isConfirmed}
							onClick={() => reset()}
						>
							Discard Changes
						</Button>
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
							>
								Confirm
							</Button>
						)}
					</div>
				</FullWidthColumn>
			</Grid>
		</Form>
	);
};
export default ProcedureReview;
