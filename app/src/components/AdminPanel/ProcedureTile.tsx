import { Layer, Tile, Button, UnorderedList, ListItem } from '@carbon/react';
import { Maximize } from '@carbon/react/icons';
import Procedure from '@model/Procedure';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ProcedureTileProps = {
	procedure: Procedure;
};
const ProcedureTile = ({ procedure }: ProcedureTileProps) => {
	const { t } = useTranslation(['narrativeAdmin', 'procedureInfo']);
	const [controlObjectives, setControlObjectives] = useState<string[]>([]);
	useEffect(() => {
		procedure.controlObjectives?.forEach(co => setControlObjectives(old => [...old, co]));
	});
	return (
		<Layer level={1}>
			<Tile className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='flex min-h-[2.5rem] justify-between'>
							<p className='line-clamp-1 text-heading-1'>{procedure.name}</p>
							<Button
								hasIconOnly
								renderIcon={Maximize}
								size='sm'
								kind='ghost'
								iconDescription={t('narrativeAdmin:procedure-details')}
							/>
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
							{controlObjectives.length > 1 && (
								<UnorderedList nested>
									<ListItem className='text-text-secondary'>
										{controlObjectives[0]}
									</ListItem>
									<ListItem className='text-text-secondary'>
										{controlObjectives[1]}
									</ListItem>
									<p>...</p>
								</UnorderedList>
							)}
							{controlObjectives.length === 1 && (
								<UnorderedList nested>
									<ListItem className='text-text-secondary'>
										{controlObjectives[0]}
									</ListItem>
									<div className=''>
										<p className='line-clamp-1 text-label-2'>
											{t('procedureInfo:description')}:
										</p>{' '}
										<p className='text-text-secondary text-label-2'>
											{procedure.description ? '...' : t('narrativeAdmin:no-description')}
										</p>
									</div>
								</UnorderedList>
							)}
						</div>
					</div>
				</div>
			</Tile>
		</Layer>
	);
};
export default ProcedureTile;
