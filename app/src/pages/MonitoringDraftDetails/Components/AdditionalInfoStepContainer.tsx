import FullWidthColumn from '@components/FullWidthColumn';
import {
	Toggle,
	Tooltip,
	TextArea,
	Layer,
	Button,
	InlineLoading,
	Tag
} from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MonitoringDraft from '@model/MonitoringDraft';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useSaveMonitoringDraft from '@api/change-monitoring/useSaveMonitoringDraft';
import ApiError from '@api/ApiError';
import AssetExpandableTile from './AssetExpandableTile';
import AdditionalInfoStepContent from './AdditionalInfoStepContent';

type AdditionalInfoFormData = {
	note: string;
	files: File[];
};

type AdditionalInfoStepProps = {
	draft: MonitoringDraft;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const AdditionalInfoStepContainer = ({
	draft,
	setCurrentStep
}: AdditionalInfoStepProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveMonitoringDraft();
	const [sameSetup, setSameSetup] = useState(false);
	const [extensions, setExtensions] = useState<
		{ extensions: string[]; assetId?: string }[]
	>([]);

	useEffect(() => {
		draft.monitoringAssets &&
			setExtensions(
				draft.monitoringAssets.map(ma => {
					return { assetId: ma.id, extensions: ma.extensions?.split('~') || [] };
				})
			);
	}, [draft.monitoringAssets, setExtensions, sameSetup]);

	const { register, handleSubmit } = useForm<AdditionalInfoFormData>({
		defaultValues: { note: draft.note }
	});

	const saveDraft = (data: AdditionalInfoFormData) => {
		return mutate({
			draft: {
				...draft,
				note: data.note,
				monitoringAssets: draft.monitoringAssets?.map(ma => {
					return {
						...ma,
						extensions: extensions
							?.find(el => el.assetId === ma.id)
							?.extensions?.join('~')
					};
				})
			}
		});
	};

	return (
		<FullWidthColumn className='space-y-7'>
			<Layer>
				<TextArea
					labelText={t('changeMonitoring:note')}
					{...register('note')}
					placeholder={t('changeMonitoring:monitoring-note-placeholder')}
				/>
			</Layer>
			<FullWidthColumn>
				<Toggle
					aria-label='Additional info toggle'
					id='additional-info-toggle'
					labelA={t('changeMonitoring:different')}
					labelB={t('changeMonitoring:same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('changeMonitoring:asset-setup-toggle')}</p>
							<Tooltip
								align='top'
								label={t('changeMonitoring:same-setup-additional-info')}
							>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			{sameSetup ? (
				<div className='space-y-7'>
					<AdditionalInfoStepContent setExtensions={setExtensions} />
					<div>
						{draft.monitoringAssets?.map(ma => (
							<AssetExpandableTile title={ma.asset.hostname || ''} key={ma.id}>
								<div className='space-y-3'>
									<p className='whitespace-nowrap text-heading-1'>
										{t('changeMonitoring:extensions-to-ignore')}
									</p>
									<div>
										{ma.extensions?.split('~').map(ex => (
											<Tag className='mr-3' key={`${ma.id}-${ex}`}>
												{ex}
											</Tag>
										))}
									</div>
								</div>
							</AssetExpandableTile>
						))}
					</div>
				</div>
			) : (
				<div>
					{draft.monitoringAssets?.map(ma => (
						<AssetExpandableTile title={ma.asset.hostname || ''} key={ma.id}>
							<AdditionalInfoStepContent
								inTile
								setExtensions={setExtensions}
								extensions={extensions.find(el => el.assetId === ma.id)}
							/>
						</AssetExpandableTile>
					))}
				</div>
			)}
			<div className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<InlineLoadingStatus
					{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
				/>
				<div>{isLoading && <InlineLoading />}</div>
				<Button
					size='md'
					kind='secondary'
					className='w-full md:w-fit'
					onClick={() => setCurrentStep(old => old - 1)}
				>
					{t('changeMonitoring:back')}
				</Button>
				<Button size='md' className='w-full md:w-fit' onClick={handleSubmit(saveDraft)}>
					{t('evidenceRequest:save')}
				</Button>
			</div>
		</FullWidthColumn>
	);
};
export default AdditionalInfoStepContainer;
