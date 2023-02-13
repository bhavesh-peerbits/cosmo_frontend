import { Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import NoDataMessage from '@components/NoDataMessage';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { useResponsive } from 'ahooks';
import { useMemo, useRef, useState } from 'react';
import { Button, Grid, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import AddNewInstanceModal from '@pages/Narrative/ApplicationDetail/Modals/AddNewInstanceModal';
import Application from '@model/Narrative/Application';
import useGetAllInstancesForApp from '@api/app-instances/useGetAllInstancesForApp';
import ApplicationInstanceTile from '../Components/ApplicationInstanceTile';

type ApplicationInstancesProps = {
	application: Application;
};
const ApplicationInstances = ({ application }: ApplicationInstancesProps) => {
	const { t } = useTranslation('applicationInstances');
	const [isAddInstanceOpen, setIsAddInstanceOpen] = useState(false);
	const { data: instances } = useGetAllInstancesForApp(application?.id);
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
					<AddNewInstanceModal
						application={application}
						isOpen={isAddInstanceOpen}
						setIsOpen={setIsAddInstanceOpen}
						allInstancesNames={instances?.map(instance => instance.name.toLowerCase())}
					/>
					<div className='flex flex-col space-y-5'>
						<div
							className='w-full bg-layer-1 md:sticky md:z-10'
							ref={buttonRef}
							style={{
								top: breadcrumbSize + 48
							}}
						>
							<Button
								size='md'
								renderIcon={Add}
								className='md:max-w-auto w-full max-w-full md:w-auto'
								onClick={() => setIsAddInstanceOpen(true)}
							>
								{t('new-instance')}
							</Button>
						</div>
						<div className='space-y-7'>
							{instances?.length === 0 && (
								<div>
									<NoDataMessage
										className='mt-10 p-5'
										title={t('no-instance')}
										subtitle={t('no-instance-subtitle')}
									/>
								</div>
							)}
							{instances?.map(instance => (
								<Layer>
									<ApplicationInstanceTile instance={instance} />
								</Layer>
							))}
						</div>
					</div>
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};
export default ApplicationInstances;
