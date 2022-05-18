import { Layer, ClickableTile } from '@carbon/react';
import { formatDate } from '@i18n';
import Review from '@model/Review';
import { useNavigate } from 'react-router-dom';

type ReviewTileProps = {
	review: Review;
};

const ReviewTile = ({ review }: ReviewTileProps) => {
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(review.id ?? '')} className='mb-5'>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col'>
						<div className='mb-3 flex min-h-[2.5rem] justify-between'>
							{review.icon}
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>Start Date</div>
								<div>{review.startDate ? formatDate(review.startDate) : 'Never'}</div>
							</div>
						</div>
						<div className='mb-5'>
							<p className='text-heading-1'>{review.name}</p>
							<p className='text-label-1'>{review.narrativeName}</p>
						</div>
					</div>
					<div className='flex min-h-[7rem] flex-col justify-between'>
						<div className='mb-5 max-w-[40rem]'>
							<div className='box-content max-h-[60px] overflow-hidden line-clamp-3'>
								<div className='mb-5 flex max-w-[40rem] text-ellipsis text-body-1'>
									<p className='text-body-short-1'>Analyst: {review.analyst}</p>
								</div>
							</div>
						</div>
						{review.dueDate && (
							<div className='text-right text-text-secondary'>
								<div className='font-bold'>Due Date</div>
								<div>{formatDate(review.dueDate)}</div>
							</div>
						)}
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ReviewTile;
