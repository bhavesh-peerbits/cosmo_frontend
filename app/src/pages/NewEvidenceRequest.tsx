import PageHeader from '@components/PageHeader';
import { TrashCan, Send } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

const NewEvidenceRequest = () => {
	// const { requestId } = useParams<'requestId'>();
	const { t } = useTranslation('evidenceRequest');
	return (
		<PageHeader
			pageTitle='Request name'
			intermediateRoutes={[{ name: 'New evidence request', to: '/new-evidence-request' }]}
			actions={[
				{
					name: t('send-request'),
					icon: Send,
					onClick: () => {},
					kind: 'primary'
				},
				{
					name: t('delete-request'),
					icon: TrashCan,
					onClick: () => {},
					kind: 'danger'
				}
			]}
		>
			<div>contenuto</div>
		</PageHeader>
	);
};
export default NewEvidenceRequest;
