import { ClickableTile } from '@carbon/react';
import { formatDate } from '@i18n';
import Run from '@model/Run';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type RunTileProps = {
	run: Run;
};
const RunTile = ({ run }: RunTileProps) => {
	const { t } = useTranslation('monitoringDashboard');
	const navigate = useNavigate();
	// TODO Add info for not started/ongoing runs and remove clickable for not started runs
	return (
		<ClickableTile
			className='space-y-3 bg-layer-2'
			onClick={() => navigate(run.id)}
			id={`run-${run.orderNumber}`}
		>
			<div className='flex justify-between'>
				<p className='text-heading-2'>{`RUN ${run.orderNumber}`}</p>
				<div>
					<p className='flex justify-end text-text-secondary text-body-short-1'>
						{t('started-on')} {formatDate(new Date(), 'short')}
					</p>
					<p className='flex justify-end text-text-secondary text-body-short-1'>
						{t('completed-on')} {formatDate(new Date(), 'short')}
					</p>
				</div>
			</div>
			<div className='flex items-center space-x-2'>
				<p className='text-heading-1'>{t('delta-found')}:</p>
				<p className='text-body-long-1'>{run.deltas?.length}</p>
			</div>
			<div className='flex items-start space-x-2 align-top'>
				<p className='text-heading-1'>{t('note')}:</p>
				<p className='line-clamp-1 text-body-long-1'>{run.notes}</p>
			</div>
		</ClickableTile>
	);
};
export default RunTile;
