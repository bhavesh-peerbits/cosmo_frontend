import ApiError from '@api/ApiError';
import useStartMonitoring from '@api/change-monitoring/useStartMonitoring';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Tag,
	InlineNotification
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import MonitoringDraft from '@model/MonitoringDraft';
import Scheduling from '@model/Scheduling';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
	const { mutate, isLoading, isError, error } = useStartMonitoring();
	const cleanUp = () => {
		setIsOpen(false);
	};
	const navigate = useNavigate();
	const startMonitoring = () => {
		return mutate({ draft }, { onSuccess: () => navigate('/monitoring-dashboard') });
	};

	const getSchedulingDisplayInfo = (scheduling: Scheduling) => {
		switch (scheduling.frequency) {
			case 'ONDEMAND':
				return t('changeMonitoring:info-ondemand-scheduling');
			case 'DAILY':
				return t('changeMonitoring:info-daily-scheduling');
			case 'WEEKLY':
				return t('changeMonitoring:info-weekly-scheduling', {
					day:
						scheduling.dayOfWeek?.[0] && t(`changeMonitoring:${scheduling.dayOfWeek[0]}`)
				});
			case 'BIWEEKLY':
				return t('changeMonitoring:info-biweekly-scheduling', {
					day1:
						scheduling.dayOfWeek?.[0] && t(`changeMonitoring:${scheduling.dayOfWeek[0]}`),
					day2:
						scheduling.dayOfWeek?.[1] && t(`changeMonitoring:${scheduling.dayOfWeek[1]}`)
				});
			case 'MONTHLY':
				return t('changeMonitoring:info-monthly-scheduling', {
					day: scheduling.dayOfMonth
				});
			case 'QUARTERLY':
				return t('changeMonitoring:info-quarterly-semiannual-scheduling', {
					numberOfMonths: 3
				});
			case 'SEMIANNUAL':
				return t('changeMonitoring:info-quarterly-semiannual-scheduling', {
					numberOfMonths: 6
				});
			case 'ANNUAL':
				return t('changeMonitoring:info-annual-scheduling');
			default:
				return '';
		}
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
							draft.type === 'AUTOMATIC'
								? t('changeMonitoring:automatic')
								: t('changeMonitoring:manual')
						}
					/>
					<RecapStringRow title={t('changeMonitoring:note')} info={draft.note} />
					<RecapStringRow
						title={t('modals:application')}
						info={draft.instance?.application.name}
					/>
					<RecapStringRow
						title={t('changeMonitoring:app-instance')}
						info={draft.instance?.name}
					/>
					<RecapStringRow
						title='Assets'
						info={draft.monitoringAssets?.map(ma => ma.asset.hostname).join(', ')}
					/>
					<RecapStringRow
						title={t('evidenceRequest:framework-code')}
						info={draft.frameworkLeafsCodes?.replaceAll('-', ', ')}
					/>
					<RecapStringRow
						title={t('evidenceRequest:framework-name')}
						info={draft.frameworkLeafsName?.replaceAll('//', ', ')}
					/>
					<RecapStringRow
						title={t('changeMonitoring:controls')}
						info={draft.controlCode ? draft.controlCode?.replaceAll('-', ', ') : '-'}
					/>
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
						title={t('changeMonitoring:start-date')}
						info={
							draft.scheduling?.startDate
								? draft.scheduling.startDate.toLocaleString()
								: '-'
						}
					/>
					<RecapStringRow
						title={t('changeMonitoring:end-date')}
						info={
							draft.scheduling?.endDate ? draft.scheduling.endDate.toLocaleString() : '-'
						}
					/>
					<RecapStringRow
						title={t('changeMonitoring:frequency')}
						info={draft.scheduling ? getSchedulingDisplayInfo(draft.scheduling) : '-'}
					/>
					<RecapStringRow
						title={t('changeMonitoring:total-runs')}
						info={draft.scheduling?.totalRuns}
					/>
				</div>
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
			</ModalBody>
			{shouldStart && (
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button kind='primary' disabled={isLoading} onClick={() => startMonitoring()}>
						{t('changeMonitoring:start-monitoring')}
					</Button>
				</ModalFooter>
			)}
		</ComposedModal>
	);
};
export default MonitoringDraftRecapModal;
