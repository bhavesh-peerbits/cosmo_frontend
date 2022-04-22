import { Button, Column, Form, Grid, TextArea, TextInput, Tile } from '@carbon/react';
import { useForm } from 'react-hook-form';

interface ProcedureForm {
	procedure: string;
	procedureOwner: string;
	description: string;
	lastModDate: string;
	lastModifier: string;
	lastReviewDate: string;
	lastReviewer: string;
}

const ProcedureContainer = () => {
	const {
		register,
		formState: { errors, isValid, isDirty }
	} = useForm<ProcedureForm>({ mode: 'onBlur' });
	return (
		<Tile href='ApplicationName' className='w-full bg-background'>
			<Form onSubmit={() => console.log('Submitted')}>
				<Grid fullWidth narrow className='space-y-7'>
					<Column
						sm={{ span: 4 }}
						md={{ span: 8 }}
						lg={{ span: 16 }}
						className='text-fluid-heading-3'
					>
						Titolo
					</Column>
					<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='procedure'
								labelText='Procedure'
								placeholder='Procedure'
								value='Default value'
							/>
							<TextInput
								className='w-full'
								id='procedure-owner'
								invalidText={errors.procedureOwner?.message}
								labelText='Procedure Owner'
								placeholder='Procedure Owner'
								invalid={Boolean(errors.procedureOwner)}
								defaultValue='Default value'
								{...register('procedureOwner', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</div>
					</Column>
					<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
						<div className='flex w-full items-stretch space-x-5'>
							<TextArea
								className='w-full'
								id='description'
								invalidText={errors.description?.message}
								labelText='Description'
								placeholder='Description'
								invalid={Boolean(errors.description)}
								defaultValue='Default value'
								{...register('description', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</div>
					</Column>
					<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='last-modified-date'
								labelText='Last Modified Date'
								value='mm/dd/yyyy'
							/>
							<TextInput
								className='w-full'
								id='last-modifier'
								labelText='Last Modifier'
								value='Default value'
							/>
						</div>
					</Column>
					<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='last-review-date'
								labelText='Last Review Date'
								value='mm/dd/yyyy'
							/>
							<TextInput
								className='w-full'
								id='last-reviewer'
								labelText='Last Reviewer'
								value='Default value'
							/>
						</div>
					</Column>
					<Column
						sm={{ span: 4 }}
						md={{ span: 5, offset: 3 }}
						lg={{ span: 3, offset: 13 }}
					>
						<div className='space-x-5'>
							<Button type='reset' kind='tertiary' disabled={!isDirty}>
								Cancel
							</Button>
							<Button type='submit' disabled={!isValid}>
								Save
							</Button>
						</div>
					</Column>
				</Grid>
			</Form>
		</Tile>
	);
};
export default ProcedureContainer;
