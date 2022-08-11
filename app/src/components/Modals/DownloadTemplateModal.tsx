import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	RadioButton,
	RadioButtonGroup,
	InlineNotification
} from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CampaignDtoTypeApi, CampaignDtoTypeApiEnum } from 'cosmo-api/src';
import useGetCampaignTemplate from '@api/user-revalidation/useGetCampaignTemplate';
import ApiError from '@api/ApiError';
import Papa from 'papaparse';
import { downloadFileViaBlob } from '@components/util/fileUtil';

type DownloadTemplateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DownloadTemplateModal = ({ isOpen, setIsOpen }: DownloadTemplateModalProps) => {
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const [typeSelected, setTypeSelected] = useState<CampaignDtoTypeApi>(
		CampaignDtoTypeApiEnum.Firefight
	);
	const { mutate, isLoading, isError, error } = useGetCampaignTemplate();
	const cleanUp = () => {
		setIsOpen(false);
	};

	const revalidationTypes = Object.entries(CampaignDtoTypeApiEnum).sort();
	const downloadTemplate = () => {
		mutate(
			{ type: typeSelected },
			{
				onSuccess: data => {
					const delimiter = ',';
					const csvString = Papa.unparse([data.fields], {
						delimiter,
						quotes: value => typeof value === 'string'
					});
					const fileBlob = new Blob([csvString], { type: 'text/csv' });
					downloadFileViaBlob(fileBlob, `${typeSelected}-template`, 'csv');
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title='Download file' closeModal={cleanUp} />
			<ModalBody className='m-0 pb-9'>
				<div className='space-y-5'>
					<p>{`${t('userRevalidation:download-modal-body')}.`}</p>
					<RadioButtonGroup
						orientation='vertical'
						name='revalidation-types'
						legendText={`${t('userRevalidation:revalidation-type')} *`}
						onChange={value => setTypeSelected(value as CampaignDtoTypeApi)}
						valueSelected={typeSelected}
					>
						{revalidationTypes.map(([id, value]) => (
							<RadioButton key={id} labelText={id} value={value} />
						))}
					</RadioButtonGroup>
					{isError && (
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					)}
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button disabled={isLoading} onClick={downloadTemplate}>
					Download
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DownloadTemplateModal;
