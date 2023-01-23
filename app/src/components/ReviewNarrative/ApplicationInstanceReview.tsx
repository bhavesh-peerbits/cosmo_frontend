import ApplicationInstanceForm, {
	ApplicationInstanceFormData
} from '@components/ApplicationInstances/ApplicationInstanceForm';
import InstanceAsset from '@model/InstanceAsset';
import { Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

type ApplicationInstanceReviewProps = {
	instance: InstanceAsset;
};

const ApplicationInstanceReview = ({ instance }: ApplicationInstanceReviewProps) => {
	const { t } = useTranslation('applicationInfo');

	const {
		register,
		reset,
		formState: { errors, isDirty, isValid }
	} = useForm<ApplicationInstanceFormData>({
		mode: 'onChange',
		defaultValues: {
			name: instance.instance?.name,
			description: instance.instance?.description
		}
	});

	return (
		<Grid className='space-y-7'>
			<FullWidthColumn>
				<ApplicationInstanceForm
					instance={instance}
					isReview
					register={register}
					errors={errors}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='flex justify-end'>
				<Button
					className='mr-5'
					type='reset'
					kind='secondary'
					// disabled={!isDirty || isSuccess}
					disabled={!isDirty}
					// onClick={() => {
					// 	reset();
					// 	apiReset();
					// }}
					onClick={() => {
						reset();
					}}
					size='md'
				>
					{t('discard')}
				</Button>
				<Button
					type='submit'
					//  disabled={!isValid || isLoading}
					disabled={!isValid}
					size='md'
				>
					{t('confirm')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInstanceReview;
