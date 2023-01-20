import ApplicationInstanceForm from '@components/ApplicationInstances/ApplicationInstanceForm';
import { ApplicationInstanceFormData } from '@components/ApplicationInstances/AssetTileForm';
import InstanceAsset from '@model/InstanceAsset';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

type ApplicationInstanceReviewProps = {
	instance: InstanceAsset;
};

const ApplicationInstanceReview = ({ instance }: ApplicationInstanceReviewProps) => {
	const { t } = useTranslation('applicationInfo');
	const {
		register,
		reset,
		control,
		watch,
		formState: { errors }
	} = useForm<ApplicationInstanceFormData>({
		mode: 'onChange',
		defaultValues: {
			name: instance.instance?.name,
			description: instance.instance?.description
		}
	});

	const { fields, append } = useFieldArray({
		name: 'assets',
		control
	});

	useEffect(() => {
		instance.assets?.map(a =>
			append({
				hostname: a.hostname,
				ports: a.ports,
				type: a.type,
				os: a.os,
				ip: a.ip,
				dbVersion: a.dbVersion,
				dbType: a.dbType,
				key: a.id
			})
		);
	}, [append, instance.assets]);

	useEffect(() => {
		reset({
			name: instance.instance?.name,
			description: instance.instance?.description,
			assets: instance.assets?.map(a => {
				return {
					hostname: a.hostname,
					ports: a.ports,
					type: a.type,
					os: a.os,
					ip: a.ip,
					dbVersion: a.dbVersion,
					dbType: a.dbType,
					key: a.id
				};
			})
		});
	}, [instance.assets, instance.instance?.description, instance.instance?.name, reset]);

	return (
		<Grid className='space-y-7'>
			<FullWidthColumn>
				<ApplicationInstanceForm
					instance={instance}
					register={register}
					watch={watch}
					errors={errors}
					fields={fields}
					isReview
				/>
			</FullWidthColumn>
			<FullWidthColumn className='flex justify-end'>
				<Button
					className='mr-5'
					type='reset'
					kind='tertiary'
					// disabled={!isDirty || isSuccess}
					// onClick={() => {
					// 	reset();
					// 	apiReset();
					// }}
					size='md'
				>
					{t('discard')}
				</Button>
				<Button
					type='submit'
					//  disabled={!isValid || isLoading}
					size='md'
				>
					{t('confirm')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInstanceReview;
