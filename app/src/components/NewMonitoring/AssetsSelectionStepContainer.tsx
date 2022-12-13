import { Dispatch, SetStateAction } from 'react';
import { Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useForm } from 'react-hook-form';
import useGetApps from '@api/management/useGetApps';
import SingleAppInstanceSelect from './SingleAppInstanceSelect';

type AssetsSelectionStepContainerProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

type FormData = {
	application: Application;
	applicationInstance: Application;
};

const AssetsSelectionStepContainer = ({
	setCurrentStep
}: AssetsSelectionStepContainerProps) => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	const { data: applications } = useGetApps(); // TODO Change when BE is ready
	const {
		control,
		watch,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});

	const app = watch('application');

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>Assets</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>{t('changeMonitoring:assets-step-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
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
			<FullWidthColumn className='flex justify-end'>
				<Button
					size='md'
					onClick={() => setCurrentStep(old => old + 1)}
					disabled={!isValid}
				>
					{t('modals:next')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default AssetsSelectionStepContainer;
