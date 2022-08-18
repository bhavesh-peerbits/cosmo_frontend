import { ClickableTile, Layer } from '@carbon/react';
import Campaign from '@model/Campaign';

type RevalidationReviewerTileProps = {
	revalidation: Campaign;
};
const RevalidationReviewerTile = ({ revalidation }: RevalidationReviewerTileProps) => {
	return (
		<Layer>
			<ClickableTile>{revalidation.name}</ClickableTile>
		</Layer>
	);
};

export default RevalidationReviewerTile;
