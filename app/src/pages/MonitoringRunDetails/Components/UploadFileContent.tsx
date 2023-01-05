import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag, SwitcherDivider } from '@carbon/react';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import { Download } from '@carbon/react/icons';
import AddFileToPathModal from '../Modals/AddFileToPathModal';
import FileUploadTable from './FileUploadTable';

const UploadFileContent = () => {
	const { t } = useTranslation(['runDetails', 'changeMonitoring']);
	const [isOpen, setIsOpen] = useState(false);
	const fakeData = ['asset1', 'asset2'];
	const fakeDataPathPrev = [
		{
			assetId: 'asset1',
			file: 'file asset 1',
			fileLastRun: 'file last run 1',
			path: 'path1veryveryveryverylong'
		},
		{
			assetId: 'asset1',
			file: 'file asset 2',
			fileLastRun: 'file last run 2',
			path: 'path2'
		},
		{
			assetId: 'asset2',
			file: 'file asset 3',
			fileLastRun: 'file last run 3',
			path: 'path3'
		},
		{
			assetId: 'asset2',
			file: 'file asset 4',
			fileLastRun: 'file last run 4',
			path: 'path4'
		}
	];
	const fakeDataPathCurr = [
		{
			assetId: 'asset1',
			file: 'file asset 1',
			path: 'path1veryveryveryverylong'
		},
		{ assetId: 'asset1', file: 'file asset 2', path: 'path2' },
		{ assetId: 'asset2', file: 'file asset 3', path: 'path3' },
		{ assetId: 'asset2', file: 'file asset 4', path: 'path4' }
	];
	const [prevPeriodData, setPrevPeriodData] = useState<
		{
			assetId: string;
			path: string;
			file: string;
			fileLastRun?: string;
		}[]
	>(fakeDataPathPrev);
	const [currPeriodData, setCurrPeriodData] = useState<
		{
			assetId: string;
			path: string;
			file: string;
		}[]
	>(fakeDataPathCurr);
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
									<div className='space-y-3'>
										<p className='text-caption-2'>
											{t('runDetails:previous-period-description')}
										</p>
										<div className='space-x-3'>
											{[
												...new Set(
													fakeDataPathPrev
														.filter(el => el.assetId === asset)
														.map(item => item.file)
												)
											].map(file => (
												<Tag key={file} filter size='md' type='gray'>
													<button type='button' className='flex space-x-2'>
														<Download />
														<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
															{file}
														</span>
													</button>
												</Tag>
											))}
										</div>
									</div>
								</div>
								<FileUploadTable
									data={prevPeriodData.filter(path => path.assetId === asset)}
									setData={setPrevPeriodData}
									assetId={asset}
									period='previous'
								/>
							</div>
							<SwitcherDivider className='mr-7 w-auto' />
							<div className='space-y-5'>
								<div>
									<p className='text-productive-heading-2'>
										{t('runDetails:current-period')}
									</p>
									<div className='space-y-3'>
										<p className='text-caption-2'>
											{t('runDetails:current-period-description')}
										</p>
										<div className='space-x-3'>
											{[
												...new Set(
													fakeDataPathPrev
														.filter(el => el.assetId === asset)
														.map(item => item.file)
												)
											].map(file => (
												<Tag key={file} filter size='md' type='gray'>
													<button type='button' className='flex space-x-2'>
														<Download />
														<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
															{file}
														</span>
													</button>
												</Tag>
											))}
										</div>
									</div>
								</div>
								<FileUploadTable
									data={currPeriodData.filter(path => path.assetId === asset)}
									setData={setCurrPeriodData}
									assetId={asset}
									period='current'
								/>
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
