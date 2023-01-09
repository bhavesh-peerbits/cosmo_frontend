/* eslint-disable @typescript-eslint/no-unused-vars */
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetAllApplications from '@api/change-monitoring/useGetAllApplications';
import useGetAppInstances from '@api/change-monitoring/useGetAppInstances';
import Instance from '@model/Instance';
import Asset from '@model/Asset';
import SingleAppInstanceSelect from './SingleAppInstanceSelect';
import MultipleAssetSelect from './MultipleAssetSelect';

type FormData = {
	application: Application;
	instance: Instance;
	assets: Asset[];
};

const AssetsSelectionStepContainer = () => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);

	const { control, watch } = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});
	const app = watch('application');
	const instance = watch('instance');

	const { data: applications } = useGetAllApplications();
	const { data: instanceAssets } = useGetAppInstances(app ? app.codeName : undefined);

	return (
		<>
			<FullWidthColumn className='lg:w-1/2'>
				<SingleApplicationSelect
					level={2}
					label={`${t('modals:application')} *`}
					name='application'
					control={control}
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
					applications={applications ? [...applications.values()] : []}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='lg:w-1/2'>
				<SingleAppInstanceSelect
					readOnly={!app}
					level={2}
					label={`${t('changeMonitoring:app-instance')} *`}
					name='instance'
					control={control}
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
					instances={(instanceAssets ?? []).map(el => {
						return el.instance as Instance;
					})}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='lg:w-1/2'>
				<MultipleAssetSelect
					readOnly={!instance}
					level={2}
					control={control}
					name='assets'
					label={`${t('changeMonitoring:select-assets')} *`}
					assets={instanceAssets?.find(el => el.instance?.id === instance.id)?.assets}
				/>
			</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
