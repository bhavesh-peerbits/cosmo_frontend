import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetApps from '@api/management/useGetApps';
import SingleAppInstanceSelect from './SingleAppInstanceSelect';

type FormData = {
	application: Application;
	applicationInstance: Application;
};

const AssetsSelectionStepContainer = () => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	const { data: applications } = useGetApps(); // TODO Change when BE is ready
	const { control, watch } = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});

	const app = watch('application');

	return (
		<>
			<FullWidthColumn className='w-1/2 pt-5'>
				<SingleApplicationSelect
					level={1}
					label={`${t('modals:application')} *`}
					name='application'
					control={control}
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
					applications={applications ? [...applications.values()] : []}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='w-1/2 pt-5'>
				<SingleAppInstanceSelect
					readOnly={!app}
					level={1}
					label={`${t('changeMonitoring:app-instance')} *`}
					name='applicationInstance'
					control={control}
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
					applications={applications ? [...applications.values()] : []}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='pt-5'>Assets selection</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
