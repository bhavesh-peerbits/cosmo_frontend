import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { TrashCan, Upload } from '@carbon/react/icons';
import { useState } from 'react';
import DeleteUploadModal from '@components/Modals/DeleteUploadModal';
import Application from '@model/Application';

interface UploadResultsTileProps {
	application: Application;
}

const UploadResultsTile = ({ application }: UploadResultsTileProps) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	return (
		<>
			<DeleteUploadModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
			<Grid fullWidth className='space-y-5'>
				<FullWidthColumn
					data-toc-id={application.id}
					data-toc-title={application.name}
					className='flex items-center justify-between text-fluid-heading-3'
				>
					{application.name}
					<div>
						<Button
							kind='ghost'
							iconDescription='Substitute upload'
							hasIconOnly
							renderIcon={Upload}
							// TODO open upload modal and pass app id
						/>
						<Button
							kind='ghost'
							iconDescription='Remove upload'
							hasIconOnly
							renderIcon={TrashCan}
							onClick={() => setIsDeleteOpen(true)}
						/>
					</div>
				</FullWidthColumn>
				<FullWidthColumn>Table</FullWidthColumn>
			</Grid>
		</>
	);
};
export default UploadResultsTile;
