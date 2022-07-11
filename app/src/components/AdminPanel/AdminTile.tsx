import { Layer, ClickableTile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

type AdminTileProps = {
	title: string;
	description: string;
};
const AdminTile = ({ title, description }: AdminTileProps) => {
	return (
		<Layer level={1}>
			<ClickableTile className='space-y-7'>
				<div>
					<div className='text-productive-heading-2 lg:min-h-[44px]'>{title}</div>
					<div className='mt-5 text-text-secondary text-body-compact-2 sm:min-h-[164px] md:min-h-[196px] xlg:min-h-[96px]'>
						{description}
					</div>
				</div>
				<div className='flex items-end justify-end'>
					<ArrowRight className='h-[20px] w-[20px] text-link-primary' />
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default AdminTile;
