import { Tag, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Download } from '@carbon/react/icons';
import RunAsset from '@model/ChangeMonitoring/RunAsset';
import useGetFile from '@api/uploaders3/useGetFile';
import FileLink from '@model/common/FileLink';
import { useRecoilState } from 'recoil';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';
import { useEffect, useState } from 'react';
import useGetFileFromCurrentPeriodPreviousRun from '@api/change-monitoring-analyst/useGetFileFromCurrentPeriodPreviousRun';
import { useParams } from 'react-router-dom';
import FileUploadTable from './FileUploadTable';
import ConfirmDeleteFileModal from '../Modals/ConfirmDeleteFileModal';

interface RunAssetPeriodContentProps {
	runAsset: RunAsset;
	old: boolean;
	canEdit: boolean;
	level?: 0 | 1 | 2;
	tableTitle?: string;
}

const RunAssetPeriodContent = ({
	runAsset,
	old,
	canEdit,
	level,
	tableTitle
}: RunAssetPeriodContentProps) => {
	const [addFileInfo, setAddFileInfo] = useRecoilState(addFileToRunAssetStore);
	const { monitoringId = '', runId = '' } = useParams();
	const { data: prevFile } = useGetFileFromCurrentPeriodPreviousRun(
		runId,
		monitoringId,
		runAsset.asset.id
	);
	const [modalInfo, setModalInfo] = useState({ id: '', open: false });

	const DownloadFile = (fileLink: FileLink) => {
		useGetFile(fileLink.id).then(({ data, headers }) => {
			const fileName =
				headers['content-disposition']
					?.split('filename=')?.[1]
					?.replace(/^"/, '')
					?.replace(/"$/, '') || `${fileLink.name}`;
			const fileBlob = new Blob([data as unknown as BlobPart]);
			const dataUrl = URL.createObjectURL(fileBlob);
			const link = document.createElement('a');
			link.download = fileName;
			link.href = dataUrl;
			link.click();
		});
	};
	useEffect(() => {
		old
			? setAddFileInfo(prev => ({
					...prev,
					possiblePreviousFiles: [
						...new Set(
							runAsset.runFileLinks
								?.filter(rf => rf.old === old)
								.map(item => item.fileLink)
						)
					]
			  }))
			: setAddFileInfo(prev => ({
					...prev,
					possibleCurrentFiles: [
						...new Set(
							runAsset.runFileLinks
								?.filter(rf => rf.old === old)
								.map(item => item.fileLink)
						)
					]
			  }));
	}, [old, runAsset.runFileLinks, setAddFileInfo]);
	const { t } = useTranslation(['runDetails']);
	return (
		<>
			<ConfirmDeleteFileModal
				assetId={runAsset.asset.id}
				fileLinkId={modalInfo.id}
				isOpen={modalInfo.open}
				runId={runId}
				setIsOpen={(value: boolean) => setModalInfo({ id: '', open: value })}
			/>
			<div className='space-y-5'>
				<div>
					<p className='text-productive-heading-2'>
						{old ? t('runDetails:previous-period') : t('runDetails:current-period')}
					</p>
					<div className='space-y-3'>
						<p className='text-caption-2'>
							{old
								? t('runDetails:previous-period-description')
								: t('runDetails:current-period-description')}
						</p>
						<div className='space-x-3'>
							{[
								...new Map(
									(old
										? addFileInfo.possiblePreviousFiles
										: addFileInfo.possibleCurrentFiles
									).map(item => [item.id, item])
								).values()
							].map(file => {
								return (
									<Tag
										key={file.name}
										size='md'
										filter
										type='gray'
										onClose={() => setModalInfo({ open: true, id: file.id })}
									>
										<button
											type='button'
											className='flex space-x-2'
											onClick={() => DownloadFile(file)}
										>
											<Download />
											<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
												{file.name}
											</span>
										</button>
									</Tag>
								);
							})}
						</div>
					</div>
				</div>
				<Layer level={level}>
					<FileUploadTable
						data={runAsset.paths.map(p => ({
							runFileLink: runAsset.runFileLinks?.find(
								rfl => rfl.path.path === p.path && rfl.old === old
							),
							path: p.path,
							fileLastRun: prevFile?.find(pf => pf.path.path === p.path)?.fileLink
						}))}
						assetId={runAsset.asset.id}
						period={old ? 'previous' : 'current'}
						canEdit={canEdit}
						title={tableTitle}
					/>
				</Layer>
			</div>
		</>
	);
};

export default RunAssetPeriodContent;
