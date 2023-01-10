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
import { Button } from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import SingleAppInstanceSelect from './SingleAppInstanceSelect';
import MultipleAssetSelect from './MultipleAssetSelect';

type FormData = {
	application: Application;
	instance: Instance;
	assets: Asset[];
};

type AssetSelectionProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
	draft: MonitoringDraft;
};
const AssetsSelectionStepContainer = ({ setCurrentStep, draft }: AssetSelectionProps) => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);

	const {
		control,
		watch,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all',
		defaultValues: {
			application: draft.instance?.application,
			instance: draft.instance,
			assets: draft.monitoringAssets?.map(asset => asset.asset)
		}
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
					assets={
						instance
							? instanceAssets?.find(el => el.instance?.id === instance.id)?.assets
							: []
					}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<Button
					size='md'
					onClick={() => setCurrentStep(old => old + 1)}
					className='w-full md:w-fit'
				>
					{t('changeMonitoring:save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
