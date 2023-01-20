import FullWidthColumn from '@components/FullWidthColumn';
import useGetAllScripts from '@api/change-monitoring/useGetAllScripts';
import { Dispatch, SetStateAction, useState } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import { Button, InlineLoading } from '@carbon/react';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useSaveMonitoringDraft from '@api/change-monitoring/useSaveMonitoringDraft';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';
import AssetsList from './AssetsList';
import OSScriptListContainer from './OSScriptListContainer';

type ScriptSelectionProps = {
	draft: MonitoringDraft;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const ScriptSelectionStepContainer = ({
	draft,
	setCurrentStep
}: ScriptSelectionProps) => {
	const { t } = useTranslation('changeMonitoring');
	const { data: scripts } = useGetAllScripts(draft.id);
	const [selectedScript, setSelectedScript] = useState(draft.script?.id);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveMonitoringDraft();

	const saveDraft = () => {
		return mutate(
			{
				draft: {
					...draft,
					script: scripts?.find(s => s.id === selectedScript)
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	return (
		<FullWidthColumn className='mr-0 space-y-7 overflow-auto'>
			<FullWidthColumn>
				<AssetsList assets={draft.monitoringAssets?.map(ma => ma.asset) || []} />
			</FullWidthColumn>
			<FullWidthColumn>
				<OSScriptListContainer
					scripts={scripts || []}
					selectedScript={selectedScript}
					setSelectedScript={setSelectedScript}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
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
					{t('back')}
				</Button>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={() => saveDraft()}
					disabled={isLoading || !selectedScript}
				>
					{t('save-next')}
				</Button>
			</FullWidthColumn>
		</FullWidthColumn>
	);
};
export default ScriptSelectionStepContainer;
