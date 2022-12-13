import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Tag
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

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

type MonitoringRecapModalProps = {
	isOpen: {
		open: boolean;
		shouldStart: boolean;
	};
	setIsOpen: Dispatch<
		SetStateAction<{
			open: boolean;
			shouldStart: boolean;
		}>
	>;
};
const MonitoringDraftRecapModal = ({ isOpen, setIsOpen }: MonitoringRecapModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'modals', 'evidenceRequest']);
	const cleanUp = () => {
		setIsOpen({ open: false, shouldStart: false });
	};

	return (
		<ComposedModal open={isOpen.open} onClose={cleanUp} size='sm'>
			<ModalHeader
				label='monitoring name'
				title={t('changeMonitoring:show-recap')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<div className='divide-y-[1px] divide-solid divide-border-subtle-0 bg-background'>
					<RecapStringRow title={t('changeMonitoring:monitoring-name')} info='info' />
					<RecapStringRow title={t('changeMonitoring:monitoring-type')} info='info' />
					<RecapStringRow title={t('modals:application')} info='info' />
					<RecapStringRow title={t('changeMonitoring:app-instance')} info='info' />
					<RecapStringRow title='Assets' info='info' />
					<RecapStringRow title='Framework' info='info' />
					<RecapStringRow title={t('changeMonitoring:controls')} info='info' />
					<RecapStringRow title={t('changeMonitoring:operating-system')} info='info' />
					<RecapStringRow title='Script' info='info' />
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>{t('evidenceRequest:collaborators')}</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							<UserProfileImage
								size='md'
								initials='cc'
								imageDescription='c'
								tooltipText='c'
							/>
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
							<p className='text-heading-1'>Recipient</p>
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
							<p className='text-heading-1'>Files</p>
						</div>
						<div className='flex h-[40px] items-center py-3 pl-3'>
							<Tag>Nome del file</Tag>
						</div>
					</div>
					<RecapStringRow title={t('changeMonitoring:frequency')} info='info' />
					<RecapStringRow title={t('changeMonitoring:total-runs')} info='info' />
				</div>
			</ModalBody>
			{isOpen.shouldStart && (
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button kind='primary'>{t('changeMonitoring:start-monitoring')}</Button>
				</ModalFooter>
			)}
		</ComposedModal>
	);
};
export default MonitoringDraftRecapModal;
