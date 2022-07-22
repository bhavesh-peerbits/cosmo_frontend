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
				body
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
