import { Grid, Column } from '@carbon/react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import User from '@model/User';
import Application from 'model/Application';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UsersSelectionFormData {
	focalPoint: User;
	referentsDelegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	application: Application;
	step: EvidenceRequestStep;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UsersSelectionForm = ({ application, step }: UsersSelectionFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const {
		control
		// formState: { isValid }
	} = useForm<UsersSelectionFormData>({
		mode: 'onChange'
	});

	return (
		<Grid fullWidth>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<SingleUserSelect
					control={control}
					label='Focal Point'
					name='focalPoint'
					level={2}
				/>
			</Column>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label={t('focal-point-delegates')}
					name='referentsDelegates'
					level={2}
				/>
			</Column>
			<Column sm={4} md={4} lg={8}>
				<MultipleUserSelect
					control={control}
					label={t('approvers')}
					name='approvers'
					level={2}
				/>
			</Column>
		</Grid>
	);
};

export default UsersSelectionForm;
