import {
	Button,
	Column,
	ComposedModal,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Application from '@model/Application';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useGetAppNarrative from '@api/management/useGetAppNarrative';
import useGetProcedureByApp from '@api/app-procedures/useGetProcedureByApp';
import ProcedureAppInstance from '@model/ProcedureAppInstance';

type GenerateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	application: Application;
};

const GenerateModal = ({ isOpen, setIsOpen, application }: GenerateModalProps) => {
	const { t } = useTranslation('applicationInfo');
	const { t: tModals } = useTranslation('modals');
	const { data: proceduresApp = new Map<string, ProcedureAppInstance>() } =
		useGetProcedureByApp(application.id);

	const applicationProperties = useMemo(
		() => [
			{
				key: 'name',
				label: t('application-name'),
				value: application.name
			},
			{
				key: 'owner',
				label: t('owner'),
				value: application.owner.displayName
			},
			{
				key: 'supplier',
				label: t('app-maintenance'),
				value: application.applicationData?.appMaintenance
			},
			{
				key: 'supplierContact',
				label: t('operation-supplier'),
				value: application.applicationData?.operationSupplier
			},
			{
				key: 'applicationServer',
				label: t('app-servers'),
				value: application.applicationData?.appServers
			},
			{
				key: 'applicationServerOs',
				label: t('app-servers-os'),
				value: application.applicationData?.appServersOS
			},
			{
				key: 'applicationPath',
				label: t('app-code-path'),
				value: application.applicationData?.appCodePath
			},
			{
				key: 'dbServers',
				label: t('db-servers'),
				value: application.applicationData?.dbServers
			},
			{
				key: 'dbServersOs',
				label: t('db-servers-os'),
				value: application.applicationData?.dbServersOS
			},
			{
				key: 'dbService',
				label: t('db-service'),
				value: application.applicationData?.dbService
			},
			{
				key: 'dbInstance',
				label: t('db-instance'),
				value: application.applicationData?.dbInstance
			}
		],
		[application, t]
	);

	const cleanUp = () => {
		setIsOpen(false);
	};

	const useGenerateNarrative = () => {
		useGetAppNarrative(application.id).then(({ data, headers }) => {
			const fileName =
				headers['content-disposition']
					?.split('filename=')?.[1]
					?.replace(/^"/, '')
					?.replace(/"$/, '') || `${application.name}.pdf`;
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
		<ComposedModal open={isOpen} onClose={() => cleanUp()}>
			<ModalHeader title={tModals('generate-narrative')} closeModal={() => cleanUp()} />

			<ModalBody className='mt-5'>
				<Grid fullWidth>
					{applicationProperties.map(
						property =>
							property.value && (
								<Column key={property.key} lg={8} md={4} sm={4} className='mb-8 px-4'>
									<div className='flex w-full space-x-4'>
										<span className='text-heading-compact-1 first-letter:uppercase'>
											{property.label}
											<span>:</span>
										</span>
										<span className='text-right'>{property.value}</span>
									</div>
								</Column>
							)
					)}
					<Column lg={16} md={8} sm={4} className='px-4'>
						<div className='pt-5'>
							<p className='flex w-full text-heading-compact-2'>{`${tModals(
								'total-procedures-narrative'
							)}: ${proceduresApp.size}`}</p>
						</div>
					</Column>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => cleanUp()}>
					{tModals('cancel')}
				</Button>
				<Button type='submit' onClick={useGenerateNarrative}>
					{tModals('generate-narrative')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default GenerateModal;
