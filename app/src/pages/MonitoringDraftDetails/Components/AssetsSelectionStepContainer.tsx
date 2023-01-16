import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetAllApplications from '@api/change-monitoring/useGetAllApplications';
import useGetAppInstances from '@api/change-monitoring/useGetAppInstances';
import Instance from '@model/Instance';
import Asset, { toAssetApi } from '@model/Asset';
import { Button, InlineLoading } from '@carbon/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
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

	const { control, watch, handleSubmit, setValue, resetField } = useForm<FormData>({
		mode: 'onChange'
	});
	const app = watch('application');
	const instance = watch('instance');
	const assets = watch('assets');

	const { data: applications } = useGetAllApplications();
	const { data: instanceAssets } = useGetAppInstances(app ? app.codeName : undefined);

	const saveDraft = (data: FormData) => {
		return mutate(
			{
				draft: {
					...draft,
					instance,
					monitoringAssets: data.assets.map(asset => {
						return (
							draft.monitoringAssets?.find(ma => ma.asset.id === asset.id) ?? {
								asset,
								paths: asset.paths.map(p => {
									return { path: p.path, asset: toAssetApi(asset), id: p.id };
								})
							}
						);
					})
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	// Manually set default values to be able to reset them to undefined
	useEffect(() => {
		app
			? app.id !== draft.instance?.application.id && resetField('instance', undefined)
			: resetField('instance', undefined);
	}, [app, draft.instance?.application.id, resetField]);

	useEffect(() => {
		instance
			? instance.id !== draft.instance?.id && resetField('assets', undefined)
			: resetField('assets', undefined);
	}, [draft.instance?.id, instance, resetField]);

	useEffect(() => {
		draft.instance &&
			draft.monitoringAssets &&
			(setValue('application', draft.instance?.application),
			setValue('instance', draft.instance),
			setValue(
				'assets',
				draft.monitoringAssets?.map(ma => ma.asset)
			));
	}, [draft, setValue]);

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
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
				/>
			</FullWidthColumn>
			<InlineLoadingStatus
				{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
			/>
			<FullWidthColumn className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<div>{isLoading && <InlineLoading />}</div>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={handleSubmit(saveDraft)}
					disabled={!(assets.length && app && instance) || isLoading}
				>
					{t('changeMonitoring:save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
