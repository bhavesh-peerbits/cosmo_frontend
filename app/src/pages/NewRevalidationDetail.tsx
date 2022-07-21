import PageHeader from '@components/PageHeader';
import { Email, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

const NewRevalidationDetail = () => {
	const { t } = useTranslation('userRevalidation');
	const { t: tSelect } = useTranslation('userSelect');
	return (
		<PageHeader
			pageTitle='Campagna'
			intermediateRoutes={[{ name: 'New Revalidation', to: '/new-revalidation' }]}
			actions={[
				{
					name: t('send-revalidation'),
					icon: Email,
					kind: 'primary',
					onClick: () => {}
				},
				{
					name: tSelect('remove'),
					icon: TrashCan,
					kind: 'danger',
					onClick: () => {}
				}
			]}
		>
			<div>Content</div>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
