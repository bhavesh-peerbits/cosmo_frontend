import { Button, Column, Grid, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { TrashCan, Email, CloudDownload } from '@carbon/react/icons';
import { useState } from 'react';
import ReviewModal from './ReviewModal';

const ApplicationHeader = () => {
	const [showModalReview, setShowModalReview] = useState(false);
	return (
		<div className='h-[138px]' style={{ background: 'white' }}>
			<Grid fullWidth narrow className='h-full items-end'>
				<Column sm={4} md={8} lg={16}>
					<div className='flex h-[138px] flex-col pt-5 pl-5'>
						<Breadcrumb noTrailingSlash>
							<BreadcrumbItem href='/management'>Management</BreadcrumbItem>
							<BreadcrumbItem isCurrentPage href='/applicationName'>
								Application Name
							</BreadcrumbItem>
						</Breadcrumb>
						<div className='flex h-[138px] items-end justify-between pb-7'>
							<h2 className='text-productive-heading-5'>Application Name</h2>
							<div className='flex space-x-3'>
								<div>
									<Button
										kind='tertiary'
										size='md'
										renderIcon={Email}
										onClick={() => setShowModalReview(true)}
									>
										Application Review
									</Button>
									{showModalReview ? <ReviewModal open={showModalReview} /> : ''}
									<Button size='md' renderIcon={CloudDownload}>
										Generate
									</Button>
								</div>
								<Button size='md' kind='danger' renderIcon={TrashCan}>
									Delete
								</Button>
							</div>
						</div>
					</div>
				</Column>
			</Grid>
		</div>
	);
};

export default ApplicationHeader;
