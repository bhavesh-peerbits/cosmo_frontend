import ApplicationInstanceForm, {
	ApplicationInstanceFormData
} from '@components/ApplicationInstances/ApplicationInstanceForm';
import { Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Instance from '@model/Instance';
import useGetAssetList from '@api/instance-asset/useGetAssetList';
import useReviewInstance from '@api/review/useReviewInstance';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';

type ApplicationInstanceReviewProps = {
	instance: Instance;
};

const ApplicationInstanceReview = ({ instance }: ApplicationInstanceReviewProps) => {
	const { t } = useTranslation(['applicationInfo', 'applicationInstances']);
	const { data: instanceAssets } = useGetAssetList({
		instanceId: instance.id,
		appId: instance.application.id
	});
	const {
		mutate,
		isLoading,
		reset: resetApi,
		error,
		isError,
		isSuccess
	} = useReviewInstance();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty, isValid }
	} = useForm<ApplicationInstanceFormData>({
		mode: 'onChange',
		defaultValues: {
			name: instance.name,
			description: instance.description
		}
	});

	const reviewInstance = (data: ApplicationInstanceFormData) => {
		return mutate({
			appId: instance.application.id,
			instance: { ...instance, name: data.name, description: data.description }
		});
	};

	return (
		<Grid className='space-y-7'>
			<FullWidthColumn className=''>
				<span className='text-text-secondary text-body-long-1'>
					{t('applicationInstances:tile-instance-review-description')}
				</span>
				<ApplicationInstanceForm
					instanceAssets={instanceAssets}
					instance={instance}
					isReview
					register={register}
					errors={errors}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='flex justify-end'>
				<div className='flex-1'>
					<InlineLoadingStatus
						isLoading={isLoading}
						isSuccess={isSuccess}
						isError={isError}
						error={error as ApiError}
					/>
				</div>
				<Button
					className='mr-5'
					type='reset'
					kind='secondary'
					disabled={!isDirty || isSuccess}
					onClick={() => {
						reset();
						resetApi();
					}}
					size='md'
				>
					{t('applicationInfo:discard')}
				</Button>
				<Button
					type='submit'
					disabled={!isValid || isLoading}
					size='md'
					onClick={handleSubmit(reviewInstance)}
				>
					{t('applicationInfo:confirm')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInstanceReview;
