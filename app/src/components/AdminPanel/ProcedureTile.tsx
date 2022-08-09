import { Layer, Tile, Button, UnorderedList, ListItem } from '@carbon/react';
import { Maximize } from '@carbon/react/icons';
import Procedure from '@model/Procedure';
import { useTranslation } from 'react-i18next';

type ProcedureTileProps = {
	procedure: Procedure;
};
const ProcedureTile = ({ procedure }: ProcedureTileProps) => {
	const { t } = useTranslation('narrativeAdmin');
	return (
		<Layer level={1}>
			<Tile className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='mb-3 flex min-h-[2.5rem] justify-between'>
							<p className='line-clamp-1 text-heading-1'>{procedure.name}</p>
							<Button
								hasIconOnly
								renderIcon={Maximize}
								size='sm'
								kind='ghost'
								iconDescription='Procedure details'
							/>
						</div>
						<div className='mb-5'>
							<p className='line-clamp-1 text-label-2'>{t('control-objectives')}:</p>
							<UnorderedList nested>
								<ListItem className='text-text-secondary'>Prova CO</ListItem>
								<ListItem className='text-text-secondary'>Prova CO</ListItem>
							</UnorderedList>
						</div>
					</div>
				</div>
			</Tile>
		</Layer>
	);
};
export default ProcedureTile;
