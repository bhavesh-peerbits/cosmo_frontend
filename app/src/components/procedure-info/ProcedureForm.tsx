import { Button, Column, Form, Grid, TextInput, Tile } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import DatePickerWrapper from '@components/DatePickerWrapper';
import SingleUserSelect from '@components/SingleUserSelect';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import useAddProcedureApp from '@api/procedures/useAddProcedureApp';
import useEditProcedureApp from '@api/procedures/useEditProcedureApp';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';
import DeleteProcedureModal from '@components/Modals/DeleteProcedureModal';
import { useTranslation } from 'react-i18next';
import TiptapEditor from '../tiptap/TiptapEditor';

interface ProcedureFormData {
	name: string;
	owner: User;
	delegated: User[];
	description: string;
	lastModify: Date;
	lastModifier: User;
	lastReview: Date;
	lastReviewer: User;
}

interface ProcedureFormProps {
	procedure: Partial<ProcedureAppInstance> & {
		procedure: ProcedureAppInstance['procedure'];
		id: string;
	};
	isNew?: boolean;
	appId: string;
	onDelete: () => void;
}

const ProcedureForm = ({ procedure, isNew, appId, onDelete }: ProcedureFormProps) => {
	const { t } = useTranslation('procedureInfo');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const {
		mutate: addMutate,
		isLoading: isAddLoading,
		isSuccess: isAddSuccess,
		isError: isAddError,
		error: addError,
		reset: resetNew
	} = useAddProcedureApp();
	const {
		mutate: editMutate,
		isLoading: isEditLoading,
		isSuccess: isEditSuccess,
		isError: isEditError,
		error: editError,
		reset: resetEdit
	} = useEditProcedureApp();

	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid, isDirty }
	} = useForm<ProcedureFormData>({
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

	const saveForm = (data: ProcedureFormData) => {
		const onSuccess = () => {
			reset();
			resetNew();
			resetEdit();
		};
		const commonParams = {
			procedure: {
				...procedure,
				...data
			},
			procedureId: procedure.procedure.id,
			appId
		};
		if (isNew) {
			addMutate(commonParams, { onSuccess });
		} else {
			editMutate({ ...commonParams, procedureAppId: procedure.id }, { onSuccess });
		}
	};

	return (
		<Tile href='ApplicationName' className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<FullWidthColumn
						data-toc-id={`procedure-container-${procedure.id}`}
						data-toc-title={procedure.procedure.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{procedure.procedure.name}
						<Button
							hasIconOnly
							kind='ghost'
							renderIcon={TrashCan}
							tooltipPosition='bottom'
							iconDescription='Delete Procedure'
							onClick={() => setIsDeleteModalOpen(true)}
						/>
					</FullWidthColumn>
					<DeleteProcedureModal
						isOpen={isDeleteModalOpen}
						setIsOpen={setIsDeleteModalOpen}
						procedureId={procedure.procedure.id}
						procedureAppId={procedure.id}
						appId={appId}
						onDelete={onDelete}
						softDelete={isNew}
					/>
					<FullWidthColumn>
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
										}
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
											message: `${t('procedure-required')}`
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
							<Column sm={4} md={8} lg={8} className='mb-5'>
								<DatePickerWrapper
									label={`${t('last-review')}`}
									control={control}
									name='lastReview'
									minDate={new Date()}
								/>
							</Column>
							<Column sm={4} md={8} lg={8} className='mb-5'>
								<SingleUserSelect
									control={control}
									label={`${t('last-reviewer')} *`}
									name='lastReviewer'
									rules={{
										required: {
											value: true,
											message: `${t('reviewer-required')}`
										}
									}}
								/>
							</Column>
							<FullWidthColumn>
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
							<FullWidthColumn className='mt-7'>
								<div className='flex flex-wrap justify-between space-x-2'>
									<div className='flex-1'>
										<InlineLoadingStatus
											isLoading={isAddLoading || isEditLoading}
											isSuccess={isAddSuccess || isEditSuccess}
											isError={isAddError || isEditError}
											error={(addError || editError) as ApiError}
										/>
									</div>
									<div className='flex w-full flex-1 justify-end space-x-5'>
										<Button
											type='reset'
											kind='tertiary'
											disabled={!isDirty}
											onClick={() => reset()}
										>
											Cancel
										</Button>
										<Button
											type='submit'
											onClick={handleSubmit(saveForm)}
											disabled={!isValid || !isDirty}
										>
											{`${t('save')}`}
										</Button>
									</div>
								</div>
							</FullWidthColumn>
						</Grid>
					</FullWidthColumn>
				</Grid>
			</Form>
		</Tile>
	);
};
export default ProcedureForm;
