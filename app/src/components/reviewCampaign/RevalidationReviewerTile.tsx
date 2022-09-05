import {
	Column,
	ExpandableTile,
	Grid,
	Layer,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent
} from '@carbon/react';
import IconResolver from '@components/IconResolver';
import { useTranslation } from 'react-i18next';
import ApplicationWithCampaigns from '@model/ApplicationWithCampaigns';
import ApplicationCampaignsContainer from './ApplicationCampaignsContainer';

interface RevalidationReviewTileProps {
	revalidation: ApplicationWithCampaigns;
}

const RevalidationReviewerTile = ({ revalidation }: RevalidationReviewTileProps) => {
	const { t } = useTranslation(['userRevalidation', 'applicationInfo']);
	const { application, campaigns } = revalidation;

	return (
		<Layer>
			<ExpandableTile>
				<TileAboveTheFoldContent className='min-h-[84px] '>
					<Grid fullWidth>
						<Column sm={2} md={5} lg={12}>
							<div className='flex items-center space-x-5'>
								<IconResolver icon={application.icon} size={24} />

								<div className='flex flex-col'>
									<p className='line-clamp-1 text-heading-3'>{application.name}</p>
									<p className='text-text-secondary text-body-long-2'>
										{`${t('applicationInfo:owner')}: ${application.owner.username}`}
									</p>
								</div>
							</div>
						</Column>
						<Column sm={1} md={2} lg={3} className='flex items-center justify-end'>
							<div className='max-w-full text-ellipsis whitespace-nowrap'>
								<p className='text-text-secondary'>{`${campaigns.length} ${t(
									'userRevalidation:campaigns'
								)}`}</p>
							</div>
						</Column>
					</Grid>
				</TileAboveTheFoldContent>
				<TileBelowTheFoldContent className='mt-6'>
					<ApplicationCampaignsContainer campaigns={campaigns} />
				</TileBelowTheFoldContent>
			</ExpandableTile>
		</Layer>
	);
};

export default RevalidationReviewerTile;