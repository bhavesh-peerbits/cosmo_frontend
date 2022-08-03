import { Layer, ClickableTile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type NewRevalidationTileProps = {
	revalidation: {
		id: string;
		name: string;
		type?: string;
		layer?: string;
	};
};
const NewRevalidationTile = ({ revalidation }: NewRevalidationTileProps) => {
	const { t } = useTranslation('userRevalidation');
	const { t: tModals } = useTranslation('modals');
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(revalidation.id ?? '')} className='mb-5'>
				<div className='min-h-[160px] space-y-5'>
					<div className='line-clamp-1 text-heading-2'>{revalidation.name}</div>
					<div className='space-y-3 break-normal text-text-secondary text-label-2'>
						<div>
							{t('revalidation-type')}:
							<p className='text-text-primary text-label-2'>{revalidation.type}</p>
						</div>
						<div>
							{t('layer')}:
							<p className='text-text-primary text-label-2'>{revalidation.layer}</p>
						</div>
						<div>N {tModals('applications')}</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default NewRevalidationTile;
