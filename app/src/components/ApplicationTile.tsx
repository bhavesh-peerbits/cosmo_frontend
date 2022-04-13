import { ClickableTile, Layer } from '@carbon/react';

const ApplicationTile = () => {
	return (
		<Layer level={1}>
			<ClickableTile href='ApplicationName' className='mb-5 w-full bg-white'>
				<div className='flex flex-col space-y-4 p-2'>
					<div>Icon</div>
					<div className='space-y-9'>
						<div>
							<div>Name</div>
							<div>Owner</div>
						</div>
						<div className='flex flex-row justify-between'>
							<h2>Code</h2>
							<h2>Category</h2>
						</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ApplicationTile;
