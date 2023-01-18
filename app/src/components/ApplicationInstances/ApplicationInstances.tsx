import useGetAppInstances from '@api/change-monitoring/useGetAppInstances';
import useGetApp from '@api/management/useGetApp';
import { Add, Email } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import NoDataMessage from '@components/NoDataMessage';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { useResponsive } from 'ahooks';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid } from '@carbon/react';
import ApplicationInstanceForm from './ApplicationInstanceForm';

const ApplicationInstances = () => {
	const { appId = '' } = useParams();
	const { data: app } = useGetApp(appId);
	const { data: instances } = useGetAppInstances(app?.codeName);
	const { breadcrumbSize } = useBreadcrumbSize();
	const buttonRef = useRef<HTMLDivElement>(null);
	const { md } = useResponsive();

	const STICKY_OFFSET = useMemo(
		() =>
			md && buttonRef.current && buttonRef.current.getBoundingClientRect()
				? buttonRef.current.getBoundingClientRect().height + breadcrumbSize * 2 - 1
				: buttonRef.current?.getBoundingClientRect()?.height || 0,
		[breadcrumbSize, md]
	);
	return (
		<TableOfContents stickyOffset={STICKY_OFFSET} tocStickyOffset={breadcrumbSize + 48}>
			<Grid fullWidth className='h-full pr-3'>
				<FullWidthColumn className='pt-3'>
					<div className='flex flex-col space-y-5'>
						<div
							className='flex w-full flex-wrap items-center bg-layer-1 md:sticky md:z-10  md:space-x-4'
							ref={buttonRef}
							style={{
								top: breadcrumbSize + 48
							}}
						>
							<Button
								size='md'
								renderIcon={Add}
								className='md:max-w-auto w-full max-w-full md:w-auto'
							>
								Button 1
							</Button>
							<Button
								size='md'
								className='md:max-w-auto w-full max-w-full md:w-auto'
								renderIcon={Email}
							>
								Button 2
							</Button>
						</div>

						<div className='space-y-7'>
							{instances?.length === 0 && (
								<div>
									<NoDataMessage
										className='mt-10 p-5'
										title='NO instances'
										subtitle='sub'
									/>
								</div>
							)}
							{instances?.map(instance => (
								<ApplicationInstanceForm instance={instance} />
							))}
						</div>
					</div>
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};
export default ApplicationInstances;
