import { Tag, Button } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddAnswerToDeltaModal from '../Modals/AddAnswerToDeltaModal';
import CompleteRunModal from '../Modals/CompleteRunModal';
import SendToFocalPointModal from '../Modals/SendToFocalPoint';

const DeltaResultContent = () => {
	const { t } = useTranslation('runDetails');
	const [modalToOpen, setModalToOpen] = useState('');

	const fakeDataFiles = ['file1', 'file2'];

	return (
		<div className='space-y-7 pt-5 pb-9'>
			<div>
				<p className='text-productive-heading-2'>File already uploaded</p>
				<p className='text-caption-2'>description</p>
				{fakeDataFiles.map(file => (
					<Tag filter size='md' type='gray'>
						<div className=''>
							<button
								type='button'
								className='flex space-x-2'
								onClick={() => {}} // Download function
							>
								<Download />
								<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
									{file}
								</span>
							</button>
						</div>
					</Tag>
				))}
			</div>
			<p>TABLE GOES HERE</p>
			<Button onClick={() => setModalToOpen('add-answer')}>TEST ADD ANSWER MODAL</Button>
			<Button onClick={() => setModalToOpen('ignore')}>TEST IGNORE MODAL</Button>
			<Button onClick={() => setModalToOpen('close')}>TEST CLOSE RUN MODAL</Button>
			<Button onClick={() => setModalToOpen('send-focal-point')}>
				TEST SEND FOCAL POINT MODAL
			</Button>
			<AddAnswerToDeltaModal
				isOpen={modalToOpen === 'add-answer' || modalToOpen === 'ignore'}
				setIsOpen={setModalToOpen}
				isIgnore={modalToOpen === 'ignore'}
			/>
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
