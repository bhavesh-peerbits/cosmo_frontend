import { ClickableTile } from '@carbon/react';
import Run from '@model/Run';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { useRecoilValue } from 'recoil';
import authStore from '@store/auth/authStore';

type RunTileProps = {
	run: Run;
};
const RunTile = ({ run }: RunTileProps) => {
	const { t } = useTranslation(['monitoringDashboard', 'runDetails']);
	const navigate = useNavigate();
	const isInbox = window.location.pathname.includes('change-monitoring');
	const auth = useRecoilValue(authStore);

	const focalPointCanNavigate = () => {
		const isWaitingForFocalPoint = run?.status === 'WAITING_FOR_FOCALPOINT';
		const isAuthUserFocalPoint = run?.focalPoint?.id === auth?.user?.id;
		const isAuthUserDelegates = run?.focalPointDelegates
			?.map(del => del.id)
			.includes(auth?.user?.id as string);

		return isWaitingForFocalPoint && (isAuthUserDelegates || isAuthUserFocalPoint);
	};

	return (
		<ClickableTile
			className='space-y-3 bg-layer-2'
			onClick={() =>
				run.status !== 'PLANNED' && isInbox
					? isInbox && focalPointCanNavigate() && navigate(run.id)
					: navigate(run.id)
			}
			disabled={run.status === 'PLANNED' || (isInbox && !focalPointCanNavigate())}
			id={`run-${run.orderNumber}`}
		>
			<div className='flex justify-between'>
				<p className='text-heading-2'>{`RUN ${run.orderNumber}`}</p>
				<div>
					{run.startingDate && (
						<p
							className={cx('flex justify-end  text-body-short-1', {
								'text-text-secondary': run.status !== 'PLANNED'
							})}
						>
							{t('monitoringDashboard:started-on')}{' '}
							{run.startingDate.toLocaleDateString()}
						</p>
					)}
					{run.completionDate && (
						<p
							className={cx('flex justify-end  text-body-short-1', {
								'text-text-secondary': run.status !== 'PLANNED'
							})}
						>
							{run.status === 'COMPLETED'
								? t('monitoringDashboard:completed-on')
								: t('runDetails:terminated-on')}{' '}
							{run.completionDate.toLocaleDateString()}
						</p>
					)}
				</div>
			</div>
			<div className='flex items-center space-x-2'>
				<p className='text-heading-1'>{t('monitoringDashboard:delta-found')}:</p>
				<p className='text-body-long-1'>
					{run.deltas?.flatMap(d => d.deltaAnswers).flatMap(da => da?.deltaFiles).length}
				</p>
			</div>
			<div className='flex items-start space-x-2 align-top'>
				<p className='text-heading-1'>{t('monitoringDashboard:note')}:</p>
				<p className='line-clamp-1 text-body-long-1'>{run.notes}</p>
			</div>
		</ClickableTile>
	);
};
export default RunTile;
