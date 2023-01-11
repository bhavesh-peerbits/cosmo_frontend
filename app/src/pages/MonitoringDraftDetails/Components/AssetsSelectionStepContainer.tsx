import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetAllApplications from '@api/change-monitoring/useGetAllApplications';
import useGetAppInstances from '@api/change-monitoring/useGetAppInstances';
import Instance from '@model/Instance';
import Asset from '@model/Asset';
import { Button, InlineLoading } from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import useSaveMonitoringDraft from '@api/change-monitoring/useSaveMonitoringDraft';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';
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
	const { mutate, isLoading, isError, isSuccess, error } = useSaveMonitoringDraft();

	const {
		control,
		watch,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
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

	const saveDraft = (data: FormData) => {
		return mutate(
			{
				draft: {
					...draft,
					instance,
					monitoringAssets: data.assets.map(asset => {
						return { asset, paths: asset.paths, id: draft.id };
					})
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};
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
			<InlineLoadingStatus
				{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
			/>
			<FullWidthColumn className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={handleSubmit(saveDraft)}
					disabled={!isValid || isLoading}
				>
					{t('changeMonitoring:save-next')}
					{isLoading && <InlineLoading />}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
