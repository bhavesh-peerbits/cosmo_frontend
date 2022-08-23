import { ClickableTile, Layer } from '@carbon/react';
import Campaign from '@model/Campaign';
import { useNavigate } from 'react-router-dom';

type RevalidationReviewerTileProps = {
	revalidation: Campaign;
};
const RevalidationReviewerTile = ({ revalidation }: RevalidationReviewerTileProps) => {
	const navigate = useNavigate();
	return (
		<Layer>
			<ClickableTile onClick={() => navigate(revalidation.id ?? '')}>
				{revalidation.name}
			</ClickableTile>
		</Layer>
	);
};

export default RevalidationReviewerTile;
