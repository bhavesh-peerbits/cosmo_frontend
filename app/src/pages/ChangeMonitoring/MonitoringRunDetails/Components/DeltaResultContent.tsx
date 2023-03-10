import useGetFile from '@api/uploaders3/useGetFile';
import { Tag, Button } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import FileLink from '@model/common/FileLink';
import Run from '@model/ChangeMonitoring/Run';
import authStore from '@store/auth/authStore';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RunDto } from 'cosmo-api/src/v1';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import CompleteRunModal from '../Modals/CompleteRunModal';
import SendToFocalPointModal from '../Modals/SendToFocalPointModal';
import DeltaResultTable from './DeltaResultTable';
import ConfirmReturnUploadModal from '../Modals/ConfirmReturnUploadModal';
import { DeltaTableRowType } from '../Modals/AddAnswerDeltaFileModal';

type DeltaResultContentProps = {
	run: Run;
	monitoringName: string;
	closeCompleteRunFn: () => UseMutationResult<
		AxiosResponse<RunDto, any>,
		unknown,
		{ runId: string },
		unknown
	>;
	getAllFilesFn: (runId: string) => UseQueryResult<FileLink[], unknown>;
};

const DeltaResultContent = ({
	run,
	monitoringName,
	closeCompleteRunFn,
	getAllFilesFn
}: DeltaResultContentProps) => {
	const { t } = useTranslation('runDetails');
	const [modalToOpen, setModalToOpen] = useState('');
	const { data: filesAnswers } = getAllFilesFn(run.id);
	const [dataTable, setDataTable] = useState<DeltaTableRowType[]>([]);
	const [open, setOpen] = useState(false);

	const auth = useRecoilValue(authStore);
	const getUserCanEdit = () => {
		if (window.location.pathname.includes('change-monitoring')) {
			return (
				run.status === 'WAITING_FOR_FOCALPOINT' &&
				(run.focalPoint?.id === auth?.user?.id ||
					run.focalPointDelegates?.map(d => d.id).includes(auth?.user?.id || ''))
			);
		}
		return run.status === 'WAITING_FOR_ANALYST';
	};

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
							justificationStatus: justification?.status
						}
					]);
				});
			});
		});
	}, [run.deltas]);

	return (
		<>
			<ConfirmReturnUploadModal id={run.id} isOpen={open} setIsOpen={setOpen} />
			<div className='space-y-7 pt-5 pb-9'>
				{run.dueDate && (
					<div>
						{t('due-date')}: {run.dueDate?.toLocaleDateString()}
					</div>
				)}
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
					canEdit={getUserCanEdit()}
				/>
				<CompleteRunModal
					isOpen={modalToOpen === 'close'}
					setIsOpen={setModalToOpen}
					run={run}
					monitoringName={monitoringName}
					closeCompleteRunFn={closeCompleteRunFn}
				/>
				<SendToFocalPointModal
					isOpen={modalToOpen === 'send-focal-point'}
					setIsOpen={setModalToOpen}
					run={run}
					monitoringName={monitoringName}
				/>
				{(run.status === 'WAITING_FOR_ANALYST' ||
					run.status === 'WAITING_FOR_FOCALPOINT') &&
					getUserCanEdit() && (
						<div className='flex justify-end space-x-5'>
							<Button
								size='md'
								kind='secondary'
								disabled={
									!run.deltas
										?.flatMap(d => d.deltaAnswers)
										.flatMap(da => da?.justification)
										.flatMap(js => js?.status)
										.every(status => status === 'NONE')
								}
								onClick={() => setOpen(true)}
							>
								{t('return-to-upload')}
							</Button>
							<Button
								size='md'
								disabled={
									window.location.pathname.includes('change-monitoring') &&
									!run.deltas?.every(delta =>
										delta.deltaAnswers?.every(d => d.justification?.status !== 'NONE')
									) &&
									!!run.deltas?.flatMap(delta =>
										delta.deltaAnswers?.flatMap(deltaAnswer => deltaAnswer.deltaFiles)
									).length
								}
								onClick={() => {
									run.deltas?.flatMap(delta =>
										delta.deltaAnswers?.flatMap(deltaAnswer => deltaAnswer.deltaFiles)
									).length === 0 ||
									run.status === 'WAITING_FOR_FOCALPOINT' ||
									run.deltas?.every(delta =>
										delta.deltaAnswers?.every(d => d.justification?.status !== 'NONE')
									)
										? setModalToOpen('close')
										: setModalToOpen('send-focal-point');
								}}
							>
								{run.deltas?.flatMap(delta =>
									delta.deltaAnswers?.flatMap(deltaAnswer => deltaAnswer.deltaFiles)
								).length === 0 ||
								run.status === 'WAITING_FOR_FOCALPOINT' ||
								run.deltas?.every(delta =>
									delta.deltaAnswers?.every(d => d.justification?.status !== 'NONE')
								)
									? t('complete-run')
									: t('send-to-focal-point')}
							</Button>
						</div>
					)}
			</div>
		</>
	);
};
export default DeltaResultContent;
