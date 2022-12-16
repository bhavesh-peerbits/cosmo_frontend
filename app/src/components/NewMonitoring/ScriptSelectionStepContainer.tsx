import FullWidthColumn from '@components/FullWidthColumn';
import OSScriptListContainer from './OSScriptListContainer';
import AssetsList from './AssetsList';

const ScriptSelectionStepContainer = () => {
	const fakeData = {
		os: 'OS 1',
		script: [
			{
				script: 'script 1 os 1',
				description: 'This is a description'
			},
			{
				script: 'script 2 os 1',
				description: 'This is a description'
			}
		]
	};

	return (
		<>
			<FullWidthColumn>
				<AssetsList />
			</FullWidthColumn>
			<FullWidthColumn className='pt-5'>
				<OSScriptListContainer data={fakeData} />
			</FullWidthColumn>
		</>
	);
};
export default ScriptSelectionStepContainer;
