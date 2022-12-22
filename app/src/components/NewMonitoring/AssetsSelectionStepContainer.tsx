import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetApps from '@api/management/useGetApps';
import SingleAppInstanceSelect from './SingleAppInstanceSelect';
import MultipleAssetSelect from './MultipleAssetSelect';

type Asset = {
	info1: string;
	info2: string;
	id: string;
};
type FormData = {
	application: Application;
	applicationInstance: Application;
	assets: Asset[];
};

const AssetsSelectionStepContainer = () => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	const { data: applications } = useGetApps(); // TODO Change when BE is ready
	const { control, watch } = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});

	const app = watch('application');
	const instance = watch('applicationInstance');

	return (
		<>
			<FullWidthColumn className='lg:w-1/2'>
				<SingleApplicationSelect
					level={2}
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
			<FullWidthColumn className='lg:w-1/2'>
				<SingleAppInstanceSelect
					readOnly={!app}
					level={2}
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
			<FullWidthColumn className='lg:w-1/2'>
				<MultipleAssetSelect
					readOnly={!instance}
					level={2}
					control={control}
					name='assets'
					label={`${t('changeMonitoring:select-assets')} *`}
				/>
			</FullWidthColumn>
		</>
	);
};
export default AssetsSelectionStepContainer;
