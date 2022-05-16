import { ClickableTile, Layer } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Application from '@model/Application';
import IconResolver from '@components/IconResolver';
import { formatDate } from '@i18n';
import { useTranslation } from 'react-i18next';

type ApplicationTileProps = {
	application: Application;
};

const ApplicationTile = ({ application }: ApplicationTileProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation('management');

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(application.id ?? '')} className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='mb-3 flex min-h-[2.5rem] justify-between'>
							<IconResolver icon={application.icon} size={24} />

							<div className='text-right text-text-secondary'>
								<div className='font-bold'>{t('last-review')}</div>
								<div>
									{application.lastReview
										? formatDate(application.lastReview, 'ago')
										: t('never-done')}
								</div>
							</div>
						</div>
						<div className='mb-5'>
							<p className='line-clamp-1 text-heading-1'>{application.name}</p>
							<p className='line-clamp-1 text-label-1'>{application.owner.name}</p>
						</div>
					</div>
					<div className='flex min-h-[7rem] flex-col justify-between'>
						<div className='mb-5 max-w-[40rem]'>
							<div className='box-content max-h-[60px] overflow-hidden line-clamp-3'>
								<div className='mb-5 max-w-[40rem] text-ellipsis text-body-1'>
									{application.description || (
										<p className='italic text-body-short-1'>{t('no-description')}</p>
									)}
								</div>
							</div>
						</div>
						{application.lastModify && (
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>{t('last-modify')}</div>
								<div>{formatDate(application.lastModify)}</div>
							</div>
						)}
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ApplicationTile;
