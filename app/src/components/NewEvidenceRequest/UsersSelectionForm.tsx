import { Grid, Column } from '@carbon/react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import User from '@model/User';
import Application from 'model/Application';
import { useForm } from 'react-hook-form';

interface UsersSelectionFormData {
	referents: User[];
	referentsDelegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	application: Application;
	step: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UsersSelectionForm = ({ application, step }: UsersSelectionFormProps) => {
	const { control } = useForm<UsersSelectionFormData>({
		mode: 'onChange',
		defaultValues: {
			referents: [],
			referentsDelegates: [],
			approvers: []
		}
	});
	return (
		<Grid fullWidth>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label='Referenti'
					name='referents'
					level={2}
				/>
			</Column>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label='Delegati'
					name='referentsDelegates'
					level={2}
				/>
			</Column>
			<Column sm={4} md={4} lg={8}>
				<MultipleUserSelect
					control={control}
					label='Approvatori'
					name='approvers'
					level={2}
				/>
			</Column>
		</Grid>
	);
};

export default UsersSelectionForm;
