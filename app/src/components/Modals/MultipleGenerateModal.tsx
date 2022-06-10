import {
	Accordion,
	AccordionItem,
	Button,
	Column,
	ComposedModal,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Application from '@model/Application';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import useGetAppsNarrative from '@api/management/useGetAppsNarrative';

type MultipleGenerateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	applications: Application[];
};

const MultipleGenerateModal = ({
	isOpen,
	setIsOpen,
	applications
}: MultipleGenerateModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tInfo } = useTranslation('applicationInfo');
	const cleanUp = () => {
		setIsOpen(false);
	};

	const useGenerateNarratives = () => {
		const applicationIds = applications.map(app => +app.id);
		useGetAppsNarrative(applicationIds).then(({ data, headers }) => {
			const fileName =
				headers['content-disposition']?.split('filename=')[1] ||
				'applications_narratives.zip';
			const fileBlob = new Blob([data as unknown as BlobPart]);
			const dataUrl = URL.createObjectURL(fileBlob);
			const link = document.createElement('a');
			link.download = fileName;
			link.href = dataUrl;
			link.click();
		});
		cleanUp();
	};
	return (
		<Grid fullWidth narrow>
			<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
				<Column>
					<ModalHeader
						title={t('generate-narrative')}
						closeModal={() => setIsOpen(false)}
					/>
				</Column>
				<ModalBody>
					<FullWidthColumn>
						<div className='mb-5 flex space-x-3'>
							<div className='text-productive-heading-2'>
								{t('total-apps-narrative')} :
							</div>
							<div className='text-productive-heading-2'>{applications?.length}</div>
						</div>
						<Accordion className='w-full'>
							<AccordionItem
								title={t('application-selected')}
								className='flex flex-col items-stretch'
							>
								{applications.map(app => (
									<div className='flex space-x-5 py-5'>
										<div className='flex w-1/2 space-x-3'>
											<div className='text-heading-compact-1'>{t('application')}:</div>
											<div>{app.name}</div>
										</div>
										<div className='flex w-1/2 space-x-3'>
											<div className='text-heading-compact-1'>{tInfo('owner')}:</div>
											<div>{app.owner.displayName}</div>
										</div>
									</div>
								))}
							</AccordionItem>
						</Accordion>
					</FullWidthColumn>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => setIsOpen(false)}>
						{t('cancel')}
					</Button>
					<Button type='submit' onClick={useGenerateNarratives}>
						{t('generate-narrative')}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Grid>
	);
};
export default MultipleGenerateModal;
