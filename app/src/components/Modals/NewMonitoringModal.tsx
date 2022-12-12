import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Dispatch, SetStateAction } from 'react';
import { RadioButton, RadioButtonGroup, Form, Toggle, TextInput } from '@carbon/react';
import { useTranslation } from 'react-i18next';

type NewMonitoringModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const NewMonitoringModal = ({ isOpen, setIsOpen }: NewMonitoringModalProps) => {
	const { t } = useTranslation('changeMonitoring');
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<TearsheetNarrow
			title='New monitoring'
			open={isOpen}
			onClose={cleanUp}
			actions={[{ label: 'Cancel', kind: 'secondary' }, { label: 'Create' }]}
		>
			<Form className='space-y-5 px-5'>
				<RadioButtonGroup
					name='monitoring-type'
					legendText={`${t('monitoring-type')} *`}
					defaultSelected='manual'
					valueSelected='manual'
				>
					<RadioButton labelText={t('manual')} value='manual' />
					<RadioButton labelText={t('automatic')} value='automatic' disabled />
				</RadioButtonGroup>
				<TextInput
					id='monitoring-name'
					labelText={`${t('monitoring-name')} *`}
					placeholder={t('monitoring-name-placeholder')}
				/>
				<Toggle
					id='copy-monitoring-toggle'
					labelText={t('copy-monitoring')}
					labelA='No'
					labelB={t('copy')}
					aria-label='Copy monitoring type'
				/>
			</Form>
		</TearsheetNarrow>
	);
};
export default NewMonitoringModal;
