import { Grid, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import ApplicationChangesTable from '../Components/ApplicationChangesTable';

interface ApplicationChangesContainerProps {
	appId: string;
}

const ApplicationChangesContainer = ({ appId }: ApplicationChangesContainerProps) => {
	return (
		<Grid fullWidth className='h-full p-5 pt-6'>
			<FullWidthColumn>
				<Layer>
					<ApplicationChangesTable appId={appId} />
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationChangesContainer;
