import {
	Accordion,
	AccordionItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useResponsive from '@hooks/useResponsive';
import useRevalidations from '@hooks/user-revalidation/useRevalidations';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { CampaignDtoTypeEnum } from 'cosmo-api/src/v1';

const RevalidationsFilters = () => {
	const { t } = useTranslation(['userRevalidation', 'management']);
	const { filtersAvailable, setFilters, filters } = useRevalidations();
	const { md } = useResponsive();

	const handleCheckFilterType = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			type:
				action === 'add'
					? [...(old.type ?? []), filter]
					: (old.type ?? []).filter((f: string) => f !== filter)
		}));
	};
	const handleCheckFilterLayer = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			layer:
				action === 'add'
					? [...(old.layer ?? []), filter]
					: (old.layer ?? []).filter((f: string) => f !== filter)
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
				<AccordionItem title={t('userRevalidation:layer')} className='border-0' open={md}>
					{filtersAvailable.layer.map(filter => (
						<Checkbox
							key={filter.layer}
							checked={filter.enabled ?? false}
							onChange={(_, { checked, id }) =>
								handleCheckFilterLayer(id, checked ? 'add' : 'remove')
							}
							id={filter.layer}
							labelText={filter.layer}
						/>
					))}
				</AccordionItem>
				<AccordionItem
					title={t('management:applications')}
					className='border-0'
					open={md}
				>
					<RadioButtonGroup
						name='application'
						orientation='vertical'
						valueSelected={filters.application || ''}
						onChange={(value, group) => setFilters({ [group]: value || undefined })}
					>
						<RadioButton
							labelText={t('userRevalidation:all')}
							value=''
							id='applications-all'
						/>
						{filtersAvailable.application.map(filter => (
							<RadioButton
								key={filter.appType}
								labelText={t(`userRevalidation:${filter.appType}`)}
								value={filter.appType}
								id={`applications-${filter.appType}`}
							/>
						))}
					</RadioButtonGroup>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default RevalidationsFilters;
