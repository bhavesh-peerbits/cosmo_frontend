import { Layer, ClickableTile } from '@carbon/react';
import { formatDate } from '@i18n';
import Application from '@model/Application';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type ReviewTileProps = {
	application: Application;
};

const ReviewTile = ({ application }: ReviewTileProps) => {
	const { t } = useTranslation('reviewNarrative');
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(application.id ?? '')} className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='mb-3 flex min-h-[2.5rem] justify-between'>
							{application.icon}
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>{t('start-date')}</div>
								<div>
									{application.startNarrativeReview
										? formatDate(application.startNarrativeReview)
										: 'Never'}
								</div>
							</div>
						</div>
						<div className='mb-5'>
							<p className='text-heading-1'>{application.name}</p>
							<p className='text-label-1'>{application.codeName}</p>
						</div>
					</div>
					<div className='flex min-h-[7rem] flex-col justify-between'>
						<div className='mb-5 max-w-[40rem]'>
							<div className='box-content max-h-[60px] overflow-hidden line-clamp-3'>
								<div className='mb-5 flex max-w-[40rem] text-ellipsis text-body-1'>
									<p className='text-body-short-1'>{`${t('owner')}: ${
										application.owner.name
									}`}</p>
								</div>
							</div>
						</div>
						{application.dueDate && (
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>{t('due-date')}</div>
								<div>{formatDate(application.dueDate)}</div>
							</div>
						)}
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ReviewTile;
