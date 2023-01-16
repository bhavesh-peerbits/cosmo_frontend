import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Tag
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import GetSchedulingDisplayInfo from '@i18n/common/displaySchedulingInfo';
import MonitoringDraft from '@model/MonitoringDraft';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type RecapStringRowProps = {
	title: string;
	info?: string | number;
};
const RecapStringRow = ({ title, info }: RecapStringRowProps) => {
	return (
		<div className='flex w-full divide-x-[1px] divide-solid divide-border-subtle-0'>
			<div className='min-h-[40px] w-1/3 py-3 pl-3'>
				<p className='text-heading-1'>{title}</p>
			</div>
			<p className='min-h-[40px] w-2/3 py-3 pl-3 text-body-short-1'>{info || '-'}</p>
		</div>
	);
};

type MonitoringRecapModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	shouldStart?: boolean;
	draft: MonitoringDraft;
};
const MonitoringDraftRecapModal = ({
	isOpen,
	setIsOpen,
	shouldStart,
	draft
}: MonitoringRecapModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'modals', 'evidenceRequest']);
	const cleanUp = () => {
		setIsOpen(false);
	};
	if (!draft) return null;
	return (
		<ComposedModal open={isOpen} onClose={cleanUp} className='z-[9999]'>
			<ModalHeader
				label={draft.name}
				title={t('changeMonitoring:show-recap')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<div className='divide-y-[1px] divide-solid divide-border-subtle-0 bg-background'>
					<RecapStringRow
						title={t('changeMonitoring:monitoring-name')}
						info={draft.name}
					/>
					<RecapStringRow
						title={t('changeMonitoring:monitoring-type')}
						info={
							draft.type ? t('changeMonitoring:automatic') : t('changeMonitoring:manual')
						}
					/>
					<RecapStringRow
						title={t('modals:application')}
						info={draft.instance?.application.name}
					/>
					<RecapStringRow
						title={t('changeMonitoring:app-instance')}
						info={draft.instance?.name}
					/>
					<RecapStringRow title='Assets' info={draft.controlCode?.replaceAll('-', ',')} />
					<RecapStringRow
						title={t('evidenceRequest:framework-code')}
						info={draft.frameworkLeafsCodes?.replaceAll('-', ', ')}
					/>
					<RecapStringRow
						title={t('evidenceRequest:framework-name')}
						info={draft.frameworkLeafsName?.replaceAll('-', ', ')}
					/>
					<RecapStringRow title={t('changeMonitoring:controls')} info='info' />
					<RecapStringRow
						title={t('changeMonitoring:operating-system')}
						info={draft.script?.os}
					/>
					<RecapStringRow title='Script' info={draft.script?.name} />
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>{t('evidenceRequest:collaborators')}</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							{draft.collaborators?.length
								? draft.collaborators?.map(collab => (
										<UserProfileImage
											size='md'
											initials={collab.displayName}
											imageDescription={collab.username}
											tooltipText={collab.displayName}
										/>
								  ))
								: '-'}
						</div>
					</div>
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>Focal Point</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							{draft.focalPoint ? (
								<UserProfileImage
									size='md'
									initials={draft.focalPoint.displayName}
									imageDescription={draft.focalPoint.username}
									tooltipText={draft.focalPoint.displayName}
								/>
							) : (
								'-'
							)}
						</div>
					</div>
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>
								{t('evidenceRequest:focal-point-delegates')}
							</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							{draft.delegates?.length
								? draft.delegates?.map(delegate => (
										<UserProfileImage
											size='md'
											initials={delegate.displayName}
											imageDescription={delegate.username}
											tooltipText={delegate.displayName}
										/>
								  ))
								: '-'}
						</div>
					</div>
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>Files</p>
						</div>
						<div className='flex h-[40px] items-center py-3 pl-3'>
							{draft.files?.length
								? draft.files?.map(file => <Tag type='gray'>{file.name}</Tag>)
								: '-'}
						</div>
					</div>
					<RecapStringRow
						title={t('changeMonitoring:frequency')}
						info={draft.scheduling ? GetSchedulingDisplayInfo(draft.scheduling) : '-'}
					/>
					<RecapStringRow
						title={t('changeMonitoring:total-runs')}
						info={draft.scheduling?.totalRuns}
					/>
				</div>
			</ModalBody>
			{shouldStart && (
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
