import { FileUploaderDropContainer, FileUploaderItem, TextInput } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type UploadFileModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const UploadFileModal = ({ isOpen, setIsOpen }: UploadFileModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tManagement } = useTranslation('management');
	const uploadStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				title='Upload Revalidation File'
				hasFieldset={false}
				description='Either drag and drop file to the upload box or choose the file from your devide by clicking in the box.'
				keyValue='upload'
			>
				<div className='space-y-7'>
					<div className='space-y-5'>
						<div>
							<p className='font-bold'>Revalidation file</p>
							<p className='text-label-2'>Only .csv files.</p>
						</div>
						<div>
							<FileUploaderDropContainer
								labelText='Drag and drop files here or upload'
								accept={['.csv']}
								className='w-full'
							/>
							<FileUploaderItem name='File Name' status='complete' />
						</div>
					</div>
					<TextInput id='application' labelText='Applications' />
				</div>
			</CreateTearsheetStep>
		);
	}, []);

	const confirmStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				title='Confirm'
				hasFieldset={false}
				subtitle='subtitle'
				description='description'
				keyValue='confirm'
			>
				body
			</CreateTearsheetStep>
		);
	}, []);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText='Upload File'
			cancelButtonText={t('cancel')}
			backButtonText={tManagement('back')}
			nextButtonText={tManagement('next')}
			description='description'
			title='Upload File'
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
			}}
			onRequestSubmit={() => setIsOpen(false)}
		>
			{uploadStep()}
			{confirmStep()}
		</CreateTearsheet>
	);
};
export default UploadFileModal;
