import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useResponsive from '@hooks/useResponsive';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { CampaignDtoStatusEnum, CampaignDtoTypeEnum } from 'cosmo-api/src/v1';
import useRevalidationReview from '@hooks/user-revalidation-review/useRevalidationReview';
import { mapCampaignStatusToCampaignDisplayStatus } from '@model/CampaignStatus';

const RevalidationReviewerFilters = () => {
	const { t } = useTranslation(['userRevalidation', 'management']);
	const { filtersAvailable, setFilters, filters } = useRevalidationReview();
	const { md } = useResponsive();

	const handleCheckFilterType = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			type:
				action === 'add'
					? [...(old.type ?? []), filter]
					: (old.type ?? []).filter((f: string) => f !== filter)
		}));
	};
	const handleCheckFilterStatus = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			status:
				action === 'add'
					? [...(old.status ?? []), filter]
					: (old.status ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem
					title={t('userRevalidation:revalidation-type')}
					className='border-0'
					open={md}
				>
					{filtersAvailable.type.map(filter => (
						<Checkbox
							key={filter.type}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterType(id, checked ? 'add' : 'remove')
							}
							id={filter.type}
							labelText={mapCampaignTypeToCampaignDisplayType(
								filter.type as CampaignDtoTypeEnum
							)}
						/>
					))}
				</AccordionItem>
				<AccordionItem
					title={t('userRevalidation:status')}
					className='border-0'
					open={md}
				>
					{filtersAvailable.status.map(filter => (
						<Checkbox
							key={filter.status}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterStatus(id, checked ? 'add' : 'remove')
							}
							id={filter.status}
							labelText={mapCampaignStatusToCampaignDisplayStatus(
								filter.status as CampaignDtoStatusEnum
							)}
						/>
					))}
				</AccordionItem>
				<AccordionItem
					title={t('userRevalidation:due-date')}
					className='border-0'
					open={md}
				>
					<RadioButtonGroup
						name='dueDate'
						orientation='vertical'
						valueSelected={filters.dueDate || ''}
						onChange={(value, group) => setFilters({ [group]: value || undefined })}
					>
						<RadioButton
							labelText={t('userRevalidation:all')}
							value=''
							id='dueDate-all'
						/>
						{filtersAvailable.dueDate.map(filter => (
							<RadioButton
								key={filter.value}
								labelText={filter.value}
								value={filter.date}
								id={`dueDate-${filter.value}`}
							/>
						))}
					</RadioButtonGroup>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default RevalidationReviewerFilters;
