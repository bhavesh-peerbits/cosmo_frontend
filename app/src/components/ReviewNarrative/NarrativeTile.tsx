import { Layer, ClickableTile } from '@carbon/react';
import { formatDate } from '@i18n';
import Narrative from '@model/Narrative';
import { useNavigate } from 'react-router-dom';

type NarrativeTileProps = {
	narrative: Narrative;
};

const NarrativeTile = ({ narrative }: NarrativeTileProps) => {
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(narrative.id ?? '')} className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='mb-3 flex min-h-[2.5rem] justify-between'>
							icon
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>Start Date</div>
								<div>{narrative.startDate ? formatDate(narrative.startDate) : ''}</div>
							</div>
						</div>
						<div className='mb-5'>
							<p className='text-heading-1'>{narrative.name}</p>
							<p className='text-label-1'>{narrative.applicationName}</p>
						</div>
					</div>
					<div className='flex min-h-[7rem] flex-col justify-between'>
						<div className='mb-5 max-w-[40rem]'>
							<div className='box-content max-h-[60px] overflow-hidden line-clamp-3'>
								<div className='mb-5 flex max-w-[40rem] text-ellipsis text-body-1'>
									<p className='text-body-short-1'>Analyst: {narrative.analyst}</p>
								</div>
							</div>
						</div>
						{narrative.dueDate && (
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>Due Date</div>
								<div>{formatDate(narrative.dueDate)}</div>
							</div>
						)}
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default NarrativeTile;
