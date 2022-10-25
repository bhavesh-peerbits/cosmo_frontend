import { Form, RadioButtonGroup, RadioButton, Button } from '@carbon/react';
import EnumActionEvidenceRequestApprove from '@model/EnumActionEvidenceRequestApprove';
import evidenceRequestActionModal from '@store/evidence-request/evidenceRequestActionModal';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

interface EvidenceRequestApproveFormProps {
	setIsOpen: (value: boolean) => void;
}

const EvidenceRequestApproveForm = ({ setIsOpen }: EvidenceRequestApproveFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const [action, setAction] = useRecoilState(evidenceRequestActionModal);
	return (
		<Form className='col-span-4'>
			<div className='mt-5 space-y-5'>
				<div className=''>{t('response')}</div>
				<RadioButtonGroup
					name='action'
					onChange={value => setAction(value as EnumActionEvidenceRequestApprove)}
				>
					<RadioButton value='approve' labelText={t('approve')} />
					<RadioButton value='reject' labelText={t('reject')} />
					<RadioButton value='change-request' labelText={t('change-request')} />
				</RadioButtonGroup>
				<div className='text-right'>
					<Button
						kind='primary'
						onClick={() => {
							setIsOpen(true);
						}}
						disabled={!action}
					>
						{t('save')}
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default EvidenceRequestApproveForm;
