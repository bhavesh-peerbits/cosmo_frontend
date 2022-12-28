import AssetExpandableTile from '@components/NewMonitoring/AssetExpandableTile';
import { useTranslation } from 'react-i18next';

const UploadFileContent = () => {
	const { t } = useTranslation('runDetails');
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
				</AssetExpandableTile>
			))}
		</div>
	);
};
export default UploadFileContent;
