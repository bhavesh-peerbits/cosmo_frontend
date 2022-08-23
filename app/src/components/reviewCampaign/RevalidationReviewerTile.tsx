import useGetApps from '@api/management/useGetApps';
import {
	Column,
	ExpandableTile,
	Grid,
	Layer,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent
} from '@carbon/react';
import IconResolver from '@components/IconResolver';
import Application from '@model/Application';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationCampaignsContainer from './ApplicationCampaignsContainer';

const RevalidationReviewerTile = () => {
	const { t } = useTranslation(['userRevalidation', 'applicationInfo']);
	// TODO remove these apps and use data from application-campaigns association
	const { data = new Map() } = useGetApps();
	const applications = useMemo(() => [...data.values()] || [], [data]) as Application[];

	return (
		<Layer>
			<ExpandableTile>
				<TileAboveTheFoldContent className='min-h-[84px]'>
					<Grid fullWidth>
						<Column sm={4} md={1} lg={1}>
							<IconResolver icon={applications[0].icon} size={24} />
						</Column>
						<Column sm={4} md={5} lg={13}>
							<div className='flex flex-col'>
								<p className='text-heading-3'>
									Application Very Very Very Very Very Very long name
								</p>
								<p className='text-text-secondary text-body-long-2'>
									{`${t('applicationInfo:owner')}: Name Surname`}
								</p>
							</div>
						</Column>
						<Column sm={4} md={2} lg={2}>
							<p className='text-text-secondary'>{`N ${t(
								'userRevalidation:campaigns'
							)}`}</p>
						</Column>
					</Grid>
				</TileAboveTheFoldContent>
				<TileBelowTheFoldContent className='mt-6'>
					<ApplicationCampaignsContainer />
				</TileBelowTheFoldContent>
			</ExpandableTile>
		</Layer>
	);
};

export default RevalidationReviewerTile;
