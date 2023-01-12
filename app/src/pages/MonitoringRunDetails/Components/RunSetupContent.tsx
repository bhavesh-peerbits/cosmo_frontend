import { Toggle, TextArea, Button, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AssetPathsTile from './AssetPathsTile';

const RunSetupContent = () => {
	const { t } = useTranslation(['runDetails', 'monitoringDashboard', 'changeMonitoring']);
	const [sameSetup, setSameSetup] = useState(false);

	const fakeData = ['asset1', 'asset2', 'asset3'];
	return (
		<div className='space-y-7 pb-9 pt-5'>
			<TextArea labelText={t('monitoringDashboard:note')} />
			<Toggle
				aria-label='Asset same setup'
				id='asset-same-setup'
				toggled={sameSetup}
				onToggle={() => setSameSetup(!sameSetup)}
				labelText={
					<div className='flex space-x-3'>
						<p className='text-label-1'>{t('runDetails:repeat-new-path')}</p>
						<Tooltip align='top' label={t('runDetails:repeat-path-description')}>
							<button type='button' onClick={e => e.preventDefault()}>
								<Information />
							</button>
						</Tooltip>
					</div>
				}
				labelA='No'
				labelB={t('runDetails:repeat')}
			/>
			{/* {sameSetup && (
				<PathAssetTable isSameSetup canAdd data={newPaths} setData={setNewPaths} />
			)} */}
			<div>
				{fakeData.map(asset => (
					<AssetPathsTile key={asset} asset={asset} />
				))}
			</div>
			<div className='flex justify-end space-x-5'>
				<Button size='md' kind='tertiary'>
					{t('runDetails:save')}
				</Button>
				<Button size='md'>{t('changeMonitoring:save-next')}</Button>
			</div>
		</div>
	);
};
export default RunSetupContent;
