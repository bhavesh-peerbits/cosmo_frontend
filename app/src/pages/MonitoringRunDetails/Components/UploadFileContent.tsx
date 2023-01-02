import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import AddFileToPathModal from '../Modals/AddFileToPathModal';

const UploadFileContent = () => {
	const { t } = useTranslation(['runDetails', 'changeMonitoring']);
	const [isOpen, setIsOpen] = useState(false);
	const fakeData = ['asset11', 'asset21', 'asset31'];
	return (
		<div className='space-y-7 pb-9 pt-5'>
			<div>
				{fakeData.map(asset => (
					<AssetExpandableTile key={`upload-${asset}`} title={asset}>
						<div className='space-y-5'>
							<div className='space-y-5'>
								<div>
									<p className='text-productive-heading-2'>
										{t('runDetails:previous-period')}
									</p>
									<p className='text-caption-2'>
										{t('runDetails:previous-period-description')}
									</p>
								</div>
								<p>table goes here</p>
							</div>
							<div className='space-y-5'>
								<div>
									<p className='text-productive-heading-2'>
										{t('runDetails:current-period')}
									</p>
									<p className='text-caption-2'>
										{t('runDetails:current-period-description')}
									</p>
								</div>
								<p>table goes here</p>
							</div>
						</div>
						<Button onClick={() => setIsOpen(true)}>TEST UPLOAD MODAL</Button>
						<AddFileToPathModal
							includeLastRun
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							id='c'
						/>
					</AssetExpandableTile>
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
export default UploadFileContent;
