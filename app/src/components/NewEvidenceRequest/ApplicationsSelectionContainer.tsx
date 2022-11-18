/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, UnorderedList, ListItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import Association from '@model/Association';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { RowSelectionState } from '@tanstack/react-table';
import Application from 'model/Application';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

type ApplicationsSelectionContainerProps = {
	setCurrentStep: (val: number) => void;
};
const ApplicationsSelectionContainer = ({
	setCurrentStep
}: ApplicationsSelectionContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'management', 'modals']);
	const [selectedRows, setSelectedRows] = useState<
		(Application | undefined)[] | undefined
	>();
	const [requestDraft, setRequestDraft] = useRecoilState(evidenceRequestDraftStore);
	const apps = useMemo(
		() =>
			requestDraft?.requests
				?.slice()
				?.sort((a, b) => Number(b.selected) - Number(a.selected))
				.map(req => req.application) || [],
		[requestDraft?.requests]
	);

	const selectedAppsIndex = useMemo(
		() =>
			requestDraft.requests
				?.filter(req => req.selected)
				.reduce((prev, curr) => {
					const index = apps?.findIndex(app => app?.id === curr?.application?.id);
					return { ...prev, [index as number]: true };
				}, {}),
		[requestDraft.requests, apps]
	);

	const associationCell = useCallback(
		(associations: Association[]) =>
			associations.length > 0 ? (
				<UnorderedList nested className='ml-0'>
					{associations.map(association => {
						return (
							<ListItem className='flex items-center space-x-2'>
								{association.name}
							</ListItem>
						);
					})}
				</UnorderedList>
			) : (
				t('evidenceRequest:no-control')
			),
		[requestDraft]
	);

	const columns: HeaderFunction<Application> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('management:application-name')
			}),
			table.createDataColumn(row => row.codeName, {
				id: 'code',
				header: t('management:code'),
				enableGlobalFilter: false
			}),
			table.createDataColumn(row => row.owner, {
				id: 'owner',
				header: t('management:owner'),
				cell: info => info.getValue()?.displayName || '-',
				enableGlobalFilter: false,
				meta: {
					exportableFn: info => info.displayName || '-'
				}
			}),
			table.createDataColumn(row => row.id, {
				id: `control`,
				header: t('evidenceRequest:control'),
				cell: info =>
					associationCell(
						requestDraft.requests?.find(req => req.application.id === info.getValue())
							?.associations || []
					),
				meta: {
					exportableFn: info =>
						requestDraft.requests
							?.find(req => req.application.id === info)
							?.associations?.map(association => association.name)
							.join(',')
							.toString() || t('evidenceRequest:no-control')
				}
			})
		],
		[t, associationCell]
	);

	const handleNext = () => {
		const newRequests = requestDraft.requests?.map(req => {
			if (selectedRows?.find(app => app?.id === req.application?.id)) {
				return { ...req, selected: true };
			}
			return { ...req, selected: false };
		});
		if (selectedRows?.length) {
			setRequestDraft(old => ({
				...old,
				requests: newRequests
			}));
			setCurrentStep(1);
		}
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:apps-selection')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>{t('evidenceRequest:applications-selection-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<CosmoTable
					data={apps}
					createHeaders={columns}
					noDataMessage={t('management:no-applications')}
					searchBarPlaceholder={t('management:search-placeholder')}
					isSelectable
					level={2}
					setSelectedRows={setSelectedRows}
					selectedRows={selectedAppsIndex as RowSelectionState}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='flex justify-end'>
				<Button size='md' disabled={!selectedRows?.length} onClick={handleNext}>
					{t('modals:next')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationsSelectionContainer;
