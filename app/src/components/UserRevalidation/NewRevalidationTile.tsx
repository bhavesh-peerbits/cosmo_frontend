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
				<div className='space-y-5'>
					<div className='text-heading-2'>{revalidation.name}</div>
					<div className='space-y-3 text-text-secondary text-label-2'>
						<div>
							{t('revalidation-type')}: {revalidation.type}
						</div>
						<div>
							{t('layer')}: {revalidation.layer}
						</div>
						<div>N {tModals('applications')}</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default NewRevalidationTile;
