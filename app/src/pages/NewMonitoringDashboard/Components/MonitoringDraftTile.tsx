import { ClickableTile, Layer } from '@carbon/react';
import MonitoringDraft from '@model/MonitoringDraft';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type MonitoringDraftTileProps = {
	draft: MonitoringDraft;
};
const MonitoringDraftTile = ({ draft }: MonitoringDraftTileProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['changeMonitoring', 'modals']);

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(draft.id ?? '')} className='mb-5'>
				<div className='space-y-3'>
					<p className='block truncate line-clamp-1 text-heading-2'>{draft.name}</p>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('modals:application')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{draft.instance?.application.name}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:app-instance')}:
							</p>
							<p className='block truncate text-body-short-1'>{draft.instance?.name}</p>
						</span>
					</div>
					<span className='flex space-x-2'>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							Assets:
						</p>
						<p className='block truncate text-body-short-1'>
							{draft.monitoringAssets?.length}
						</p>
					</span>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:framework-leafs')}:
							</p>
							<p className='block truncate text-body-short-1'>{draft.frameworkLeafs}</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:control-code')}:
							</p>
							<p className='block truncate text-body-short-1'>{draft.controlCode}</p>
						</span>
					</div>
					<span className='flex space-x-2'>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							Script:
						</p>
						<p className='block truncate text-body-short-1'>{draft.script?.name}</p>
					</span>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default MonitoringDraftTile;
