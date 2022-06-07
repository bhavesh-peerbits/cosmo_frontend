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
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

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
						<div>
							{applications.map(app => (
								<div className='flex space-x-5 py-5'>
									<div className='flex w-1/2 space-x-3'>
										<div className='text-heading-compact-1'>{t('application')}:</div>
										<div>{app.name}</div>
									</div>
									<div className='flex w-1/2 space-x-3'>
										<div className='text-heading-compact-1'>{t('narrative-name')}:</div>
										<div>NarrativeName</div>
									</div>
								</div>
							))}
						</div>
					</FullWidthColumn>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => setIsOpen(false)}>
						{t('cancel')}
					</Button>
					<Button>{t('generate-narrative')}</Button>
				</ModalFooter>
			</ComposedModal>
		</Grid>
	);
};
export default MultipleGenerateModal;
