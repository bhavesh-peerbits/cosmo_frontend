import { Button, Column, Form, Grid, TextInput } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { Checkmark } from '@carbon/react/icons';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useReviewProcedure from '@api/review/useReviewProcedure';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';

interface ProcedureFormData {
	owner: User;
	delegated: User[];
	description: string;
	lastModify: Date;
	lastModifier: User;
	lastReview: Date;
	lastReviewer: User;
}

interface ProcedureReviewProps {
	procedureApp: ProcedureAppInstance;
	appId: string;
}

const ProcedureReview = ({ procedureApp, appId }: ProcedureReviewProps) => {
	const { t } = useTranslation('procedureInfo');
	const {
		mutate,
		isLoading,
		isError,
		isSuccess,
		error,
		reset: apiReset
	} = useReviewProcedure();

	const {
		control,
		reset,
		handleSubmit,
		formState: { isDirty, isValid }
	} = useForm<ProcedureFormData>({
		mode: 'onChange',
		defaultValues: {
			owner: procedureApp.owner,
			delegated: procedureApp.delegated,
			description: procedureApp.description,
			lastModify: procedureApp.lastModify,
			lastModifier: procedureApp.lastModifier,
			lastReview: procedureApp.lastReview,
			lastReviewer: procedureApp.lastReviewer
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

	const sendData = (dataProc: ProcedureFormData) => {
		return mutate({
			appId,
			procedureAppId: procedureApp.id,
			procedure: {
				...procedureApp,
				...dataProc
			},
			procedureId: procedureApp.procedureId,
			modified: isDirty
		});
	};

	return (
		<Grid fullWidth className='h-full'>
			<FullWidthColumn className='pt-4'>
				<Form className='space-y-4' onSubmit={handleSubmit(sendData)}>
					<Grid fullWidth>
						<FullWidthColumn className='mb-5'>
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
						</FullWidthColumn>
						<FullWidthColumn className='mb-5'>
							<MultipleUserSelect
								control={control}
								label={`${t('owner-delegates')}`}
								name='delegated'
							/>
						</FullWidthColumn>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								id={`last-modify-${procedureApp.id}`}
								labelText={`${t('last-modify')}`}
								value={procedureApp.lastModify?.toLocaleString()}
								readOnly
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								id={`last-modifier-${procedureApp.id}`}
								labelText={`${t('last-modifier')}`}
								value={procedureApp.lastModifier?.displayName}
								readOnly
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
						<FullWidthColumn className='mt-5 flex justify-end'>
							<div className='flex flex-wrap justify-between space-x-2'>
								<div className='flex-1'>
									<InlineLoadingStatus
										isLoading={isLoading}
										isSuccess={isSuccess}
										isError={isError}
										error={error as ApiError}
									/>
								</div>
								<div className='flex w-full flex-1 items-center justify-end'>
									<Button
										className='mr-5'
										type='reset'
										kind='tertiary'
										disabled={!isDirty || isSuccess}
										onClick={() => {
											reset();
											apiReset();
										}}
									>
										{t('discard')}
									</Button>
									{isSuccess ? (
										<div className='flex h-8 items-center space-x-2 text-link-primary'>
											<p className='text-body-short-2'>{t('confirmed')}</p>
											<Checkmark />
										</div>
									) : (
										<Button type='submit' disabled={!isValid}>
											{t('confirm')}
										</Button>
									)}
								</div>
							</div>
						</FullWidthColumn>
					</Grid>
				</Form>
			</FullWidthColumn>
		</Grid>
	);
};
export default ProcedureReview;
