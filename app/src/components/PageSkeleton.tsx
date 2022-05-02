import {
	Column,
	Grid,
	SkeletonPlaceholder,
	SkeletonText,
	TabsSkeleton
} from '@carbon/react';
import { useMemo } from 'react';
import FullWidthColumn from '@components/FullWidthColumn';

const PageSkeleton = () => {
	const fakeLink = useMemo(() => [...Array(12)].map((_, i) => ({ id: i })), []);

	return (
		<Grid>
			<FullWidthColumn>
				<div className='h-full w-full space-y-10 overflow-hidden p-9'>
					<div className='mb-5 w-3/5'>
						<SkeletonText heading />
					</div>
					<div>
						<div className='w-5/6'>
							<SkeletonText paragraph />
						</div>
						<div className='w-4/6'>
							<SkeletonText paragraph />
						</div>
					</div>
					<div>
						<TabsSkeleton />
						<Grid narrow className='m-0 w-11/12 pt-4'>
							{fakeLink.map(({ id }) => (
								<Column className='m-5 space-y-3' key={id} lg={4} md={2} sm={2}>
									<SkeletonPlaceholder />
									<div className='w-10'>
										<SkeletonText />
									</div>
									<div className='w-12'>
										<SkeletonText />
									</div>
								</Column>
							))}
						</Grid>
					</div>
				</div>
			</FullWidthColumn>
		</Grid>
	);
};

export default PageSkeleton;
