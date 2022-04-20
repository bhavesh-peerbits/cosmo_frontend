import { ClickableTile, Layer } from '@carbon/react';

const ApplicationTile = () => {
	return (
		<Layer level={1}>
			<ClickableTile href='ApplicationName' className='bg-white mb-5 w-full'>
				<div className='flex flex-col space-y-4 p-2'>
					<div>Icon</div>
					<div className='space-y-9'>
						<div>
							<div className='text-heading-2'>Name</div>
							<div className='text-body-short-1'>Owner</div>
						</div>
						<div className='flex flex-row justify-between'>
							<div className='text-body-short-1'>Code</div>
							<div className='text-text-secondary'>Category</div>
						</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ApplicationTile;
