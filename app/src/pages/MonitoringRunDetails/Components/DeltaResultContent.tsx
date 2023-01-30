import useGetAllFilesAnswer from '@api/change-monitoring/useGetAllFilesAnswer';
import useGetFile from '@api/uploaders3/useGetFile';
import { Tag, Button } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import FileLink from '@model/FileLink';
import Run from '@model/Run';
import authStore from '@store/auth/authStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { DeltaTableRowType } from '../Modals/AddAnswerToDeltaModal';
import CompleteRunModal from '../Modals/CompleteRunModal';
import SendToFocalPointModal from '../Modals/SendToFocalPoint';
import DeltaResultTable from './DeltaResultTable';

type DeltaResultContentProps = {
	run: Run;
	monitoringName: string;
};

const DeltaResultContent = ({ run, monitoringName }: DeltaResultContentProps) => {
	const { t } = useTranslation('runDetails');
	const [modalToOpen, setModalToOpen] = useState('');
	const { data: filesAnswers } = useGetAllFilesAnswer(run.id);
	const [dataTable, setDataTable] = useState<DeltaTableRowType[]>([]);

	const auth = useRecoilValue(authStore);

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
		setDataTable([]);
		run.deltas?.forEach(data => {
			data.deltaAnswers?.forEach(delta => {
				const { justification } = delta;
				delta.deltaFiles?.forEach(d => {
					setDataTable(old => [
						...old,
						{
							givenAt: justification?.givenAt,
							givenBy: `${justification?.givenBy?.name} ${justification?.givenBy?.surname}`,
							answerFile: justification?.files,
							answerValue: justification?.value,
							asset: data.asset.hostname,
							deltaFile: d,
							answer: data.deltaAnswers,
							deltaId: data.id,
							justificationId: justification?.id,
							status: justification?.status
						}
					]);
				});
			});
		});
	}, [run.deltas]);

	return (
		<div className='space-y-7 pt-5 pb-9'>
			{!!filesAnswers?.length && (
				<div>
					<p className='text-productive-heading-2'>{t('files-already-uploaded')}</p>
					<p className='text-caption-2'>{t('files-already-uploaded-description')}</p>
					{filesAnswers?.map(file => (
						<Tag key={file.name} size='md' type='gray'>
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
					))}
				</div>
			)}
			<DeltaResultTable
				data={dataTable}
				runNumber={run.orderNumber}
				monitoringName={monitoringName}
				filesAnswers={filesAnswers}
			/>
			<CompleteRunModal
				isOpen={modalToOpen === 'close'}
				setIsOpen={setModalToOpen}
				run={run}
				monitoringName={monitoringName}
			/>
			<SendToFocalPointModal
				isOpen={modalToOpen === 'send-focal-point'}
				setIsOpen={setModalToOpen}
				run={run}
				monitoringName={monitoringName}
			/>
			{((run.status === 'WAITING_FOR_FOCALPOINT' &&
				(auth?.user?.id !== run.focalPoint ||
					!run.focalPointDelegates
						?.map(d => d.id)
						.includes(auth?.user?.id as unknown as string))) ||
				run.status !== 'COMPLETED') && (
				<div className='flex justify-end'>
					<Button
						size='md'
						onClick={() => {
							run.deltas?.every(delta => delta.status === 'FINISHED')
								? setModalToOpen('close')
								: setModalToOpen('send-focal-point');
						}}
					>
						{run.deltas?.every(delta => delta.status === 'FINISHED')
							? t('complete-run')
							: t('send-to-focal-point')}
					</Button>
				</div>
			)}
		</div>
	);
};
export default DeltaResultContent;
