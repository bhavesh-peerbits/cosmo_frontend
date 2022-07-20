import { Layer, ClickableTile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type NewRevalidationTileProps = {
	campaign: {
		id: string;
		name: string;
		type: string;
		layer: string;
	};
};
const NewRevalidationTile = ({ campaign }: NewRevalidationTileProps) => {
	const { t } = useTranslation('userRevalidation');
	const { t: tModals } = useTranslation('modals');
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(campaign.id ?? '')} className='mb-5'>
				<div className='space-y-5'>
					<div className='text-heading-2'>{campaign.name}</div>
					<div className='space-y-3 text-text-secondary text-label-2'>
						<div>
							{t('revalidation-type')}: {campaign.type}
						</div>
						<div>
							{t('layer')}: {campaign.layer}
						</div>
						<div>N {tModals('applications')}</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default NewRevalidationTile;
