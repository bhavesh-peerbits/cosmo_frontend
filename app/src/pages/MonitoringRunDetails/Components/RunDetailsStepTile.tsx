import { Tile } from '@carbon/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type RunDetailsStepTileProps = {
	title: string;
	detail: string;
	inCharge: string;
	children: ReactNode;
};
const RunDetailsStepTile = ({
	title,
	detail,
	inCharge,
	children
}: RunDetailsStepTileProps) => {
	const { t } = useTranslation('runDetails');
	return (
		<Tile className='space-y-7 bg-layer-2'>
			<div className='space-y-5'>
				<div className='flex items-center justify-between'>
					<p className='text-productive-heading-2'>{title}</p>
					<p className='text-text-secondary text-body-short-1'>{detail}</p>
				</div>
				<p>
					{t('approver')}: {inCharge}
				</p>
			</div>
			<div>{children}</div>
		</Tile>
	);
};
export default RunDetailsStepTile;
