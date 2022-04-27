import { ClickableTile, Layer } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Application from '@model/Application';
import IconResolver from '@components/IconResolver';
import { formatDate } from '@i18n';

type ApplicationTileProps = {
	application: Application;
};

const ApplicationTile = ({ application }: ApplicationTileProps) => {
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile
				onClick={() => navigate(application.name ?? '')}
				className='bg-white mb-5 w-full'
			>
				<div className='flex flex-col space-y-4 p-2'>
					<IconResolver icon={application.icon} size={24} />
					<div className='space-y-9'>
						<div>
							<div className='text-heading-2'>{application.name}</div>
							<div className='text-body-short-1'>{application.owner}</div>
						</div>
						<div className='flex flex-row justify-between space-x-2'>
							<div className='text-body-short-1'>{application.code}</div>
							<div className='text-right text-text-secondary'>
								{application.lastModify && formatDate(application.lastModify)}
							</div>
						</div>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default ApplicationTile;
