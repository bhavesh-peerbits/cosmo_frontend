import {
	ComposedModal,
	ModalBody,
	Tag,
	ModalHeader,
	TextInput,
	Accordion,
	AccordionItem
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import UserProfileImage from '@components/UserProfileImage';

type RecapStringRowProps = {
	title: string;
	info: string;
};
const RecapStringRow = ({ title, info }: RecapStringRowProps) => {
	return (
		<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
			<div className='h-[40px] w-1/3 py-3 pl-3'>
				<p className='text-heading-1'>{title}</p>
			</div>
			<p className='h-[40px] py-3 pl-3 text-body-short-1'>{info}</p>
		</div>
	);
};

type InfoRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	id: string;
};

const InfoRunModal = ({ isOpen, setIsOpen, id }: InfoRunProps) => {
	const { t } = useTranslation([
		'modals',
		'monitoringDashboard',
		'changeMonitoring',
		'evidenceRequest'
	]);

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={`Monitoring Name - Run ${id}`}
				title='Run Recap'
				closeModal={cleanUp}
			/>
			<ModalBody className='space-y-5'>
				<div className='divide-y-[1px] divide-solid divide-border-subtle-0 bg-background'>
					<RecapStringRow title={t('modals:application')} info='info' />
					<RecapStringRow title={t('changeMonitoring:app-instance')} info='info' />
					<RecapStringRow title='Run' info='run ex' />
					<RecapStringRow title='Framework' info='info' />
					<RecapStringRow title={t('changeMonitoring:control')} info='info' />
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>{t('evidenceRequest:owner')}</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							<UserProfileImage
								size='md'
								initials='cc'
								imageDescription='c'
								tooltipText='c'
							/>
						</div>
					</div>

					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>
								{t('changeMonitoring:extensions-to-ignore')}
							</p>
						</div>
						<div className='flex h-[40px] items-center py-3 pl-3'>
							<Tag>Estensione</Tag>
						</div>
					</div>
				</div>
				<Accordion>
					<AccordionItem title='Asset'>
						<p className='pb-5 text-heading-1 '>Paths:</p>
						<div className='space-y-5'>
							<TextInput
								id='path'
								labelText=''
								hideLabel
								readOnly
								size='sm'
								value='VeryVeryVeryVeryVeryVeryLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongPath'
							/>
							<TextInput id='path' labelText='' hideLabel readOnly size='sm' />
						</div>
					</AccordionItem>
				</Accordion>
			</ModalBody>
		</ComposedModal>
	);
};
export default InfoRunModal;
