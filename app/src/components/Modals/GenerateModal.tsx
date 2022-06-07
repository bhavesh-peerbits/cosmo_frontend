import {
	Button,
	Column,
	ComposedModal,
	Grid,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Application from '@model/Application';
import { useMemo } from 'react';
import useGenerateNarrative from '@api/management/useGenerateNarrative';
import FullWidthColumn from '@components/FullWidthColumn';
import ApiError from '@api/ApiError';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

type GenerateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	application: Application;
};

const GenerateModal = ({ isOpen, setIsOpen, application }: GenerateModalProps) => {
	const { t } = useTranslation('applicationInfo');
	const { t: tModals } = useTranslation('modals');
	const { mutate, isLoading, isError, error, reset } = useGenerateNarrative(
		application.id
	);

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
		reset();
		setIsOpen(false);
	};

	const generateNarrative = () => {
		mutate(undefined, {
			onSuccess: () => {
				cleanUp();
			}
		});
	};

	return (
		<ComposedModal open={isOpen} onClose={() => cleanUp()}>
			<ModalHeader
				title='Narrative Name'
				label={tModals('generate-narrative')}
				closeModal={() => cleanUp()}
			/>

			<ModalBody className='mt-5'>
				<Grid fullWidth>
					{applicationProperties.map(property => (
						<Column key={property.key} lg={8} md={4} sm={4} className='mb-8 px-4'>
							<div className='flex w-full justify-between space-x-4'>
								<span className='text-heading-compact-1 first-letter:uppercase'>
									{property.label}:
								</span>
								<span className='text-right'>
									{property.value || <span className='italic'>{'<No value>'}</span>}
								</span>
							</div>
						</Column>
					))}

					<Column lg={16} md={8} sm={4} className='px-4'>
						<div className='pt-5'>
							<p className='flex w-full text-heading-compact-2'>Total Procedures:</p>
						</div>
					</Column>

					<FullWidthColumn className='pt-5'>
						<div
							className={cx(
								'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
								{
									'opacity-0': !isError
								}
							)}
						>
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(error as ApiError)?.message ||
									'An error has occurred, please try again'
								}
							/>
						</div>
					</FullWidthColumn>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => cleanUp()}>
					{tModals('cancel')}
				</Button>
				<Button type='submit' disabled={isLoading} onClick={generateNarrative}>
					{tModals('generate-narrative')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default GenerateModal;
