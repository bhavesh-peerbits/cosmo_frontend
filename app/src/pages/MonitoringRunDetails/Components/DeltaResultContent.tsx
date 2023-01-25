import useGetAllFilesAnswer from '@api/change-monitoring/useGetAllFilesAnswer';
import useGetFile from '@api/uploaders3/useGetFile';
import { Tag, Button } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import FileLink from '@model/FileLink';
import Run from '@model/Run';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CompleteRunModal from '../Modals/CompleteRunModal';
import SendToFocalPointModal from '../Modals/SendToFocalPoint';
import DeltaResultTable from './DeltaResultTable';

type DeltaResultContentProps = {
	run: Run;
};

const DeltaResultContent = ({ run }: DeltaResultContentProps) => {
	const { t } = useTranslation('runDetails');
	const [modalToOpen, setModalToOpen] = useState('');
	const { data: filesAnswers } = useGetAllFilesAnswer(run.id);

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

	return (
		<div className='space-y-7 pt-5 pb-9'>
			<div>
				<p className='text-productive-heading-2'>File already uploaded</p>
				<p className='text-caption-2'>description</p>
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
			<DeltaResultTable data={run.deltas} />
			<Button onClick={() => setModalToOpen('close')}>TEST CLOSE RUN MODAL</Button>
			<Button onClick={() => setModalToOpen('send-focal-point')}>
				TEST SEND FOCAL POINT MODAL
			</Button>

			<CompleteRunModal isOpen={modalToOpen === 'close'} setIsOpen={setModalToOpen} />
			<SendToFocalPointModal
				isOpen={modalToOpen === 'send-focal-point'}
				setIsOpen={setModalToOpen}
			/>
			<div className='flex justify-end space-x-5'>
				<Button size='md' kind='tertiary'>
					{t('save')}
				</Button>
				<Button size='md'>{t('complete-run')}</Button>
				{/* // TODO Add text in case of partial answers to send request to focal point t('send-to-focal-point') */}
			</div>
		</div>
	);
};
export default DeltaResultContent;
