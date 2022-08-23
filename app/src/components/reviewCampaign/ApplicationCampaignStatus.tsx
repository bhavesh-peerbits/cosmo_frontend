import { Grid, Link } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

const ApplicationCampaignStatus = () => {
	const { t } = useTranslation('userRevalidation');
	return (
		<Grid className='pt-6'>
			<FullWidthColumn>
				<Link className='text-heading-3' href='/user-revalidation/7'>
					Campaign Name
				</Link>
			</FullWidthColumn>
			<FullWidthColumn>
				<p className='text-text-secondary text-body-long-2'>{`${t(
					'due-date'
				)}: mm/dd/yyyy`}</p>
			</FullWidthColumn>
			<FullWidthColumn>
				<p className='text-text-secondary text-body-long-2'>{`${t(
					'revalidation-type'
				)}: TYPE`}</p>
			</FullWidthColumn>
			<FullWidthColumn>Progress bar goes here</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationCampaignStatus;
