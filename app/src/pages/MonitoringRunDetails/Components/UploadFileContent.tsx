import AssetExpandableTile from '@components/NewMonitoring/AssetExpandableTile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import AddFileToPathModal from '../Modals/AddFileToPathModal';

const UploadFileContent = () => {
	const { t } = useTranslation('runDetails');
	const [isOpen, setIsOpen] = useState(false);
	const fakeData = ['asset11', 'asset21', 'asset31'];
	return (
		<div className='pt-5'>
			{fakeData.map(asset => (
				<AssetExpandableTile key={`upload-${asset}`} title={asset}>
					<div className='space-y-5'>
						<div className='space-y-5'>
							<div>
								<p className='text-productive-heading-2'>{t('previous-period')}</p>
								<p className='text-caption-2'>{t('previous-period-description')}</p>
							</div>
							<p>table goes here</p>
						</div>
						<div className='space-y-5'>
							<div>
								<p className='text-productive-heading-2'>{t('current-period')}</p>
								<p className='text-caption-2'>{t('current-period-description')}</p>
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
	);
};
export default UploadFileContent;
