import { Breadcrumb, BreadcrumbItem, Button, Column, Grid } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import FullWidthColumn from '@components/FullWidthColumn';
import useResponsive from '@hooks/useResponsive';
import { Email } from '@carbon/react/icons';
import { ReactElement } from 'react';

interface PageHeaderProps {
	pageTitle: string;
	intermediateRoutes?: Array<{
		name: string;
		to: string;
	}>;
	actions?: Array<{
		name: string;
		icon?: (() => ReactElement) | ReactElement;
		onClick: () => void;
	}>;
	children: ReactElement;
}
const PageHeader = ({
	pageTitle,
	intermediateRoutes = [],
	actions = [],
	children
}: PageHeaderProps) => {
	const navigate = useNavigate();
	const { md } = useResponsive();

	return (
		<>
			<div className='sticky top-0 z-10 w-full space-y-5 bg-background py-5'>
				<Grid>
					<FullWidthColumn>
						<Breadcrumb noTrailingSlash className='cursor-pointer self-start'>
							{md && (
								<BreadcrumbItem onClick={() => navigate('/home')}>Home</BreadcrumbItem>
							)}
							{intermediateRoutes.map(({ name, to }) => (
								<BreadcrumbItem onClick={() => navigate(to)}>{name}</BreadcrumbItem>
							))}
							<BreadcrumbItem isCurrentPage>{pageTitle}</BreadcrumbItem>
						</Breadcrumb>
					</FullWidthColumn>
				</Grid>
			</div>
			<div className='space-y-4 bg-background md:pt-8'>
				<Grid fullWidth className='items-end space-y-4 pb-7 md:space-y-10'>
					<FullWidthColumn>
						<Grid>
							<Column sm={4} md={5} lg={7} xlg={11}>
								<h2 className='text-productive-heading-5'>{pageTitle}</h2>
							</Column>
							<Column sm={4} md={3} lg={9} xlg={5}>
								{actions?.length === 1 ? (
									<div className='mt-4 flex justify-end md:mt-0'>
										<Button renderIcon={actions[0].icon} size='md'>
											{actions[0].name}
										</Button>
									</div>
								) : (
									actions?.length === 3 && (
										<div className='mt-4 flex flex-col justify-end space-y-2 md:mt-0 lg:flex-row lg:space-y-0'>
											<Button
												kind='tertiary'
												className='min-w-full lg:min-w-fit'
												size='md'
												renderIcon={Email}
												onClick={actions[0].onClick}
											>
												{actions[0].name}
											</Button>
											<div className='flex lg:space-x-3'>
												<Button
													size='md'
													className='w-1/2'
													onClick={actions[1].onClick}
													renderIcon={actions[1].icon}
												>
													{actions[1].name}
												</Button>
												<Button
													size='md'
													kind='danger'
													className='w-1/2'
													renderIcon={actions[2].icon}
													onClick={actions[2].onClick}
												>
													{actions[2].name}
												</Button>
											</div>
										</div>
									)
								)}
							</Column>
						</Grid>
					</FullWidthColumn>
				</Grid>
				{children}
			</div>
		</>
	);
};

export default PageHeader;
