import { Button, Grid } from '@carbon/react';
import { useRef, useState } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import GeneralInfo from '@components/application-info/GeneralInfo';
import TechnicalInfo from '@components/application-info/TechnicalInfo';

const ApplicationInfo = () => {
	const { breadcrumbSize } = useBreadcrumbSize();
	const [isDirty, setIsDirty] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);

	return (
		<TableOfContents
			stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
			tocStickyOffset={breadcrumbSize * 2}
		>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='pt-4'>
					<div className='space-y-4'>
						<div
							className=' flex w-full flex-wrap md:flex-nowrap md:space-x-4'
							ref={buttonRef}
						>
							<Button size='md' className='md:max-w-auto w-full max-w-full md:w-auto'>
								Save Changes
							</Button>
							<Button
								kind='secondary'
								className='md:max-w-auto w-full max-w-full md:w-auto'
								size='md'
								disabled={!isDirty}
							>
								Discard Changes
							</Button>
						</div>
						<div className='space-y-7'>
							<GeneralInfo setIsDirty={setIsDirty} />
							<TechnicalInfo />
						</div>
					</div>
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};
export default ApplicationInfo;
