import { Accordion, AccordionItem, Checkbox } from '@carbon/react';
import useResponsive from '@hooks/useResponsive';
import useRoleAssignmentUsers from '@hooks/admin-panel/useRoleAssignmentUsers';
import { useTranslation } from 'react-i18next';

const RoleAssignmentFilters = () => {
	const { t } = useTranslation('userAdmin');
	const { filtersAvailable, setFilters } = useRoleAssignmentUsers();
	const { md } = useResponsive();

	const handleCheckFilter = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			role:
				action === 'add'
					? [...(old.role ?? []), filter]
					: (old.role ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion>
				<AccordionItem title={t('role')} className='border-0' open={md}>
					{filtersAvailable.role.map(filter => (
						<Checkbox
							key={filter.role}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilter(id, checked ? 'add' : 'remove')
							}
							id={filter.role}
							labelText={filter.role}
						/>
					))}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default RoleAssignmentFilters;
