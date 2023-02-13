import {
	ExpandableTile,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent,
	Tile
} from '@carbon/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type RunDetailsStepTileProps = {
	title: string;
	detail: string;
	inCharge: string;
	children: ReactNode;
	isCurrent?: boolean;
	id: string;
	isFuture?: boolean;
};
const RunDetailsStepTile = ({
	title,
	detail,
	inCharge,
	children,
	isCurrent,
	id,
	isFuture
}: RunDetailsStepTileProps) => {
	const { t } = useTranslation('runDetails');
	return !isFuture ? (
		<ExpandableTile className='space-y-7 bg-layer-2' expanded={isCurrent} id={id}>
			<TileAboveTheFoldContent>
				<div className='space-y-5'>
					<div className='flex items-center justify-between'>
						<p className='text-productive-heading-2'>{title}</p>
						<p className='text-text-secondary text-body-short-1'>{detail}</p>
					</div>
					<p className='text-body-long-2'>
						{t('owner')}: {inCharge}
					</p>
				</div>
			</TileAboveTheFoldContent>

			<TileBelowTheFoldContent>{children}</TileBelowTheFoldContent>
		</ExpandableTile>
	) : (
		<Tile className='space-y-7 bg-layer-2' id={id}>
			<div className='space-y-5'>
				<div className='flex items-center justify-between'>
					<p className='text-productive-heading-2'>{title}</p>
					<p className='text-text-secondary text-body-short-1'>{detail}</p>
				</div>
				<p className='text-body-long-2'>
					{t('owner')}: {inCharge}
				</p>
			</div>
		</Tile>
	);
};
export default RunDetailsStepTile;
