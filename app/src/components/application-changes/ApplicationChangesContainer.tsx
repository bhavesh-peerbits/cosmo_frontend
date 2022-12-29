import { Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import ApplicationChangesTable from './ApplicationChangesTable';

interface ApplicationChangesContainerProps {
	appId: string;
}

const ApplicationChangesContainer = ({ appId }: ApplicationChangesContainerProps) => {
	return (
		<Grid fullWidth className='h-full p-5 pt-6'>
			<FullWidthColumn>
				<ApplicationChangesTable appId={appId} />
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationChangesContainer;
