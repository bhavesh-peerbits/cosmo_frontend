import {
	Button,
	Column,
	Form,
	Grid,
	TextArea,
	TextInput,
	Tile,
	Layer
} from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';
import DeleteProcedureAppModal from '@components/Modals/DeleteProcedureAppModal';
import { useTranslation } from 'react-i18next';
import useGetProcedures from '@api/procedures/useGetProcedures';
import useAddProcedureApp from '@api/app-procedures/useAddProcedureApp';
import useEditProcedureApp from '@api/app-procedures/useEditProcedureApp';
import Procedure from '@model/Procedure';
import TiptapEditor from '../tiptap/TiptapEditor';

interface ProcedureFormData {
	owner: User;
	delegated: User[];
	controlObjectives: string;
	description: string;
	lastModify: Date;
	lastModifier: User;
	lastReview: Date;
	lastReviewer: User;
}

interface ProcedureFormProps {
	procedureApp: Partial<ProcedureAppInstance> & {
		id: string;
		procedureId: string;
	};
	isNew?: boolean;
	appId: string;
	onDelete: () => void;
}

const ProcedureForm = ({ procedureApp, isNew, appId, onDelete }: ProcedureFormProps) => {
	const { data = new Map<string, Procedure>() } = useGetProcedures();
	const procedure = data.get(procedureApp.procedureId) as Procedure;
	const { t } = useTranslation(['procedureInfo', 'narrativeAdmin']);
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
		reset,
		watch,
		handleSubmit,
		register,
		formState: { isValid, isDirty }
	} = useForm<ProcedureFormData>({
		mode: 'onChange',
		defaultValues: {
			owner: procedureApp.owner,
			delegated: procedureApp.delegated,
			controlObjectives: procedure.controlObjectives?.toString(),
			description: procedureApp.description,
			lastModify: procedureApp.lastModify,
			lastModifier: procedureApp.lastModifier,
			lastReview: procedureApp.lastReview,
			lastReviewer: procedureApp.lastReviewer
		}
	});
	const selectedOwner = watch('owner');
	const selectedDelegates = watch('delegated');
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

	const saveForm = (dataProc: ProcedureFormData) => {
		const onSuccess = (newData: ProcedureAppInstance) => {
			reset(newData);
			resetNew();
			resetEdit();
		};
		const commonParams = {
			procedure: {
				...procedureApp,
				...dataProc
			},
			procedureId: procedureApp.procedureId,
			appId
		};
		if (isNew) {
			addMutate(commonParams, { onSuccess });
		} else {
			editMutate({ ...commonParams, procedureAppId: procedureApp.id }, { onSuccess });
		}
	};

	return (
		<Layer>
			<Tile href='ApplicationName' className='w-full'>
				<Form>
					<Grid fullWidth>
						<FullWidthColumn
							data-toc-id={`procedure-container-${procedureApp.id}`}
							data-toc-title={procedure.name}
							className='flex items-center justify-between text-fluid-heading-3'
						>
							{procedure.name}
							<Button
								hasIconOnly
								kind='ghost'
								renderIcon={TrashCan}
								tooltipPosition='bottom'
								iconDescription={t('procedureInfo:delete-procedure')}
								onClick={() => setIsDeleteModalOpen(true)}
							/>
						</FullWidthColumn>
						<DeleteProcedureAppModal
							isOpen={isDeleteModalOpen}
							setIsOpen={setIsDeleteModalOpen}
							procedureId={procedure.id}
							procedureAppId={procedureApp.id}
							appId={appId}
							onDelete={onDelete}
							softDelete={isNew}
						/>
						<FullWidthColumn>
							<Grid fullWidth>
								<FullWidthColumn className='mb-5'>
									<SingleUserSelect
										control={control}
										label={`${t('procedureInfo:procedure-owner')} *`}
										name='owner'
										rules={{
											required: {
												value: true,
												message: `${t('procedureInfo:procedure-required')}`
											}
										}}
										excludedUsers={selectedDelegates}
										level={3}
									/>
								</FullWidthColumn>
								<FullWidthColumn className='mb-5'>
									<MultipleUserSelect
										control={control}
										label={`${t('procedureInfo:owner-delegates')}`}
										name='delegated'
										excludedUser={selectedOwner}
										level={3}
									/>
								</FullWidthColumn>
								<FullWidthColumn className='mb-5'>
									<TextArea
										rows={2}
										readOnly
										id='control-objectives'
										labelText={t('narrativeAdmin:control-objectives')}
										placeholder={
											procedure.controlObjectives?.length === 0
												? 'No control objectives'
												: ''
										}
										{...register('controlObjectives')}
									/>
								</FullWidthColumn>
								<Column sm={4} md={8} lg={8} className='mb-5'>
									<TextInput
										id={`last-modify-${procedureApp.id}`}
										labelText={`${t('procedureInfo:last-modify')}`}
										value={procedureApp.lastModify?.toLocaleString()}
										readOnly
									/>
								</Column>
								<Column sm={4} md={8} lg={8} className='mb-5'>
									<TextInput
										id={`last-modifier-${procedureApp.id}`}
										labelText={`${t('procedureInfo:last-modifier')}`}
										value={procedureApp.lastModifier?.displayName}
										readOnly
									/>
								</Column>

								<Column sm={4} md={8} lg={8} className='mb-5'>
									<TextInput
										id={`last-review-${procedureApp.id}`}
										labelText={`${t('procedureInfo:last-review')}`}
										value={procedureApp.lastReview?.toLocaleString()}
										readOnly
									/>
								</Column>
								<Column sm={4} md={8} lg={8} className='mb-5'>
									<TextInput
										id={`last-reviewer-${procedureApp.id}`}
										labelText={`${t('procedureInfo:last-reviewer')}`}
										value={procedureApp.lastReviewer?.displayName}
										readOnly
									/>
								</Column>
								<FullWidthColumn>
									<div>
										<p className='mb-3 text-text-secondary text-label-1'>
											{`${t('procedureInfo:description')}`}
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
												size='md'
												type='reset'
												kind='secondary'
												disabled={!isDirty}
												onClick={() => reset()}
											>
												{t('procedureInfo:cancel')}
											</Button>
											<Button
												size='md'
												type='submit'
												onClick={handleSubmit(saveForm)}
												disabled={!isValid || !isDirty}
											>
												{`${t('procedureInfo:save')}`}
											</Button>
										</div>
									</div>
								</FullWidthColumn>
							</Grid>
						</FullWidthColumn>
					</Grid>
				</Form>
			</Tile>
		</Layer>
	);
};
export default ProcedureForm;
