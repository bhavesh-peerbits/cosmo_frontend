import { ClickableTile, Layer } from '@carbon/react';
import EvidenceRequest from '@model/EvidenceRequest';
import { useNavigate } from 'react-router-dom';

type EvidenceRequestTileProps = {
	element: EvidenceRequest;
};

const EvidenceRequestTile = ({ element }: EvidenceRequestTileProps) => {
	const navigate = useNavigate();

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(element.id ?? '')} className='mb-5'>
				<div className='mb-5'>
					<p className=' line-clamp-1 text-heading-1'>{element.name}</p>
					<p className='mt-2 italic line-clamp-1 text-body-short-1'>
						Request Type: {element.type}
					</p>
					<p className='mt-5 italic line-clamp-1 text-body-short-1'>
						WorkFlow Type: {element.workflowtype}
					</p>
					<p className='mt-5 italic line-clamp-1 text-body-short-1'>
						Applications: {element.applications.length}
					</p>
					<p className='mt-1 italic line-clamp-1 text-body-short-1'>
						Status: {element.status}
					</p>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default EvidenceRequestTile;
