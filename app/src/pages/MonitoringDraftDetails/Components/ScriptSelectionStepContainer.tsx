import FullWidthColumn from '@components/FullWidthColumn';
import useGetAllScripts from '@api/change-monitoring/useGetAllScripts';
import { useParams } from 'react-router-dom';
import OSScriptListContainer from './OSScriptListContainer';
import AssetsList from './AssetsList';

const ScriptSelectionStepContainer = () => {
	const { monitoringDraftId = '' } = useParams();
	const { data: scripts } = useGetAllScripts(monitoringDraftId);

	return (
		<FullWidthColumn className='mr-0 space-y-7 overflow-auto'>
			<FullWidthColumn>
				<AssetsList />
			</FullWidthColumn>
			<FullWidthColumn>
				<OSScriptListContainer scripts={scripts || []} />
			</FullWidthColumn>
		</FullWidthColumn>
	);
};
export default ScriptSelectionStepContainer;
