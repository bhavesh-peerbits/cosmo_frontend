import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type UploadFileModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};
type FormData = {
	application: Application;
};

const UploadFileModal = ({ isOpen, setIsOpen }: UploadFileModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tRevalidation } = useTranslation('newRevalidation');
	const {
		control,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});
	const uploadStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				title={tRevalidation('upload-file')}
				hasFieldset={false}
				description={`${tRevalidation('upload-instructions')}.`}
				keyValue='upload'
				disableSubmit={!isValid}
			>
				<div className='space-y-7'>
					<div className='space-y-5'>
						<div>
							<p className='font-bold'>{tRevalidation('revalidation-file')}</p>
							<p className='text-label-2'>{`${tRevalidation('type-supported', {
								type: 'csv'
							})}.`}</p>
						</div>
						<div>
							<FileUploaderDropContainer
								labelText={tRevalidation('upload-box-description')}
								accept={['.csv']}
								className='w-full'
							/>
							{/* //TODO fix with real upload */}
							<FileUploaderItem name='File Name' status='complete' />
						</div>
					</div>
					<SingleApplicationSelect
						level={2}
						label={`${tRevalidation('app-related')} *`}
						name='application.name'
						rules={{
							required: {
								value: true,
								message: tRevalidation('app-required')
							}
						}}
						control={control}
					/>
				</div>
			</CreateTearsheetStep>
		);
	}, [control, isValid, tRevalidation]);

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
			backButtonText={t('back')}
			nextButtonText={t('next')}
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
