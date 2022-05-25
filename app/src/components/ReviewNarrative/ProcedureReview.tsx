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
import { useTranslation } from 'react-i18next';
import useGetProcedures from '@api/procedures/useGetProcedures';

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
	procedure: Partial<ProcedureAppInstance> & {
		procedure: ProcedureAppInstance['procedure'];
		id: string;
	};
}

const ProcedureReview = ({ procedure }: ProcedureReviewProps) => {
	const { t } = useTranslation('procedureInfo');
	const { data: procedures = [] } = useGetProcedures();
	const procedureNameList = procedures
		.filter(proc => proc.name !== procedure.procedure.name)
		.map(proc => proc.name.toLowerCase());
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
		<Grid fullWidth className='h-full'>
			<FullWidthColumn className='pt-4'>
				<Form className='space-y-4'>
					<Grid fullWidth>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='procedure'
								labelText={`${t('procedure-name')} *`}
								placeholder={`${t('procedure-name')}`}
								invalidText={errors.name?.message}
								invalid={Boolean(errors.name)}
								{...register('name', {
									required: {
										value: true,
										message: `${t('procedure-required')}`
									},
									validate: name =>
										!procedureNameList.includes(name.toLowerCase()) ||
										`${t('name-exists')}`
								})}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<SingleUserSelect
								control={control}
								label={`${t('procedure-owner')} *`}
								name='owner'
								rules={{
									required: {
										value: true,
										message: `${t('owner-required')}`
									}
								}}
							/>
						</Column>
						<FullWidthColumn className='mb-5'>
							<MultipleUserSelect
								control={control}
								label={`${t('owner-delegates')}`}
								name='delegated'
							/>
						</FullWidthColumn>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<DatePickerWrapper
								control={control}
								label={`${t('last-modify')}`}
								name='lastModify'
								minDate={new Date()}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<SingleUserSelect
								control={control}
								label={`${t('last-modifier')} *`}
								name='lastModifier'
								rules={{
									required: {
										value: true,
										message: `${t('modifier-required')}`
									}
								}}
							/>
						</Column>
						<FullWidthColumn className='mb-5'>
							<div>
								<p className='mb-3 text-text-secondary text-label-1'>
									{`${t('description')}`}
								</p>
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
										<p className='text-body-short-2'>{t('confirmed')}</p>
										<Checkmark />
									</div>
								) : (
									<Button
										type='submit'
										onClick={() => setIsConfirmed(true)}
										disabled={!isValid}
									>
										{t('confirm')}
									</Button>
								)}
							</div>
						</FullWidthColumn>
					</Grid>
				</Form>
			</FullWidthColumn>
		</Grid>
	);
};
export default ProcedureReview;
