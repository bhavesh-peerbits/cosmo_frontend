import { Layer, Tile, Button, UnorderedList, ListItem } from '@carbon/react';
import { Maximize, TrashCan } from '@carbon/react/icons';
import DeleteProcedureModal from '@components/Modals/DeleteProcedureModal';
import Procedure from '@model/Procedure';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useGetProcedureApps from '@api/app-procedures/useGetProcedureApps';
import ProcedureDetailsModal from '@components/Modals/ProcedureDetailsModal';

type ProcedureTileProps = {
	procedure: Procedure;
};

const ProcedureTile = ({ procedure }: ProcedureTileProps) => {
	const { t } = useTranslation(['narrativeAdmin', 'procedureInfo', 'modals']);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const [proceduresAppId, setProceduresAppId] = useState<string[]>([]);
	const { data: procedures } = useGetProcedureApps();
	const controlObjectives = Array.from(procedure.controlObjectives || []);

	useEffect(() => {
		procedures?.forEach(proc => setProceduresAppId(old => [...old, proc.procedureId]));
	}, [procedures]);

	return (
		<Layer level={1}>
			<Tile className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col space-y-3'>
						<div className='flex max-h-[2rem] min-h-[2rem] justify-between space-x-4'>
							<p className='self-center text-ellipsis line-clamp-2 text-heading-1'>
								{procedure.name}
							</p>
							<div className='flex justify-end'>
								<Button
									hasIconOnly
									renderIcon={Maximize}
									size='sm'
									kind='ghost'
									iconDescription={t('narrativeAdmin:procedure-details')}
									onClick={() => setIsDetailsModalOpen(true)}
								/>
								<Button
									disabled={proceduresAppId.includes(procedure.id)}
									title={
										proceduresAppId.includes(procedure.id)
											? t('narrativeAdmin:cannot-delete')
											: ''
									}
									hasIconOnly
									renderIcon={TrashCan}
									size='sm'
									kind='ghost'
									iconDescription={
										proceduresAppId.includes(procedure.id) ? '' : t('modals:delete')
									}
									onClick={() => setIsDeleteModalOpen(true)}
								/>
							</div>
						</div>
						<div className='h-[82px]'>
							<p className='line-clamp-1 text-label-2'>
								{t('narrativeAdmin:control-objectives')}:
							</p>
							{controlObjectives.length === 0 && (
								<div className='space-y-4'>
									<p className='text-text-secondary text-label-2'>
										{t('narrativeAdmin:no-control-objectives')}
									</p>
									<div className=''>
										<p className='line-clamp-1 text-label-2'>
											{t('procedureInfo:description')}:
										</p>{' '}
										<p className='text-text-secondary text-label-2'>
											{procedure.description ? '...' : t('narrativeAdmin:no-description')}
										</p>
									</div>
								</div>
							)}
							{controlObjectives.length === 1 && (
								<div>
									<UnorderedList nested className='h-[40px]'>
										<ListItem className='text-text-secondary'>
											<span className='block truncate'>{controlObjectives[0]}</span>
										</ListItem>
									</UnorderedList>
									<div>
										<p className='line-clamp-1 text-label-2'>
											{t('procedureInfo:description')}:
										</p>{' '}
										<p className='text-text-secondary text-label-2'>
											{procedure.description ? '...' : t('narrativeAdmin:no-description')}
										</p>
									</div>
								</div>
							)}
							{controlObjectives.length > 1 && (
								<>
									<UnorderedList nested>
										<ListItem className='text-text-secondary'>
											<span className='block truncate'>{controlObjectives[0]}</span>
										</ListItem>
										<ListItem className='text-text-secondary'>
											<span className='block truncate'>{controlObjectives[1]}</span>
										</ListItem>
										{controlObjectives.length > 2 && <p>...</p>}
									</UnorderedList>
									{controlObjectives.length === 2 && (
										<div>
											<p className='line-clamp-1 text-label-2'>
												{t('procedureInfo:description')}:
											</p>{' '}
											<p className='text-text-secondary text-label-2'>
												{procedure.description
													? '...'
													: t('narrativeAdmin:no-description')}
											</p>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</Tile>
			<DeleteProcedureModal
				procedureId={procedure.id}
				isOpen={isDeleteModalOpen}
				setIsOpen={setIsDeleteModalOpen}
			/>
			<ProcedureDetailsModal
				procedure={procedure}
				isOpen={isDetailsModalOpen}
				setIsOpen={setIsDetailsModalOpen}
			/>
		</Layer>
	);
};
export default ProcedureTile;
