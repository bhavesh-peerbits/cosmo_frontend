import { Breadcrumb, BreadcrumbItem, Button, Column, Grid } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import FullWidthColumn from '@components/FullWidthColumn';
import useResponsive from '@hooks/useResponsive';
import { ReactElement, useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';
import classNames from 'classnames';
import Fade from '@components/Fade';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import Centered from '@components/Centered';
import ButtonKinds from '@carbon/react/lib/components/Button/ButtonKinds';

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
		kind?: ButtonKinds;
		disabled?: boolean;
	}>;
	children: ReactElement;
}
const PageHeader = ({
	pageTitle,
	intermediateRoutes = [],
	actions = [],
	children
}: PageHeaderProps) => {
	const { setBreadcrumbSize } = useBreadcrumbSize();
	const pageTitleRef = useRef(null);
	const breadcrumbRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { md } = useResponsive();
	const [inViewport] = useInViewport(pageTitleRef, {
		rootMargin: `-${breadcrumbRef.current?.getBoundingClientRect()?.bottom || '0'}px`
	});

	useEffect(() => {
		setBreadcrumbSize(breadcrumbRef.current?.getBoundingClientRect()?.height || 0);
	}, [md, inViewport, setBreadcrumbSize]);

	return (
		<div className='flex flex-col'>
			<div
				ref={breadcrumbRef}
				className='sticky top-0 z-[11] w-full space-y-5 bg-background'
			>
				<Grid>
					<FullWidthColumn
						className={classNames('border-b-[1px] border-solid border-border-subtle-0', {
							'py-5': inViewport,
							'py-3': !inViewport
						})}
					>
						<Breadcrumb noTrailingSlash={!inViewport} className='self-start'>
							<div className='flex w-full  justify-between'>
								<div className='flex flex-wrap'>
									{md && (
										<BreadcrumbItem
											className='cursor-pointer'
											onClick={() => navigate('/home')}
										>
											Home
										</BreadcrumbItem>
									)}
									{intermediateRoutes.map(({ name, to }) => (
										<BreadcrumbItem
											className='cursor-pointer'
											key={name}
											onClick={() => navigate(to)}
										>
											{name}
										</BreadcrumbItem>
									))}
									{!inViewport && (
										<BreadcrumbItem isCurrentPage>
											<Fade>
												<Centered>{pageTitle}</Centered>
											</Fade>
										</BreadcrumbItem>
									)}
								</div>
								{!inViewport && (
									<div>
										<Fade>
											<div className='flex flex-1 flex-wrap items-center justify-end'>
												{actions?.slice(0, 1).map(action => (
													<Button
														key={action.name}
														hasIconOnly={!md}
														onClick={action.onClick}
														size='sm'
														tooltipPosition='bottom'
														iconDescription={action.name}
														renderIcon={action.icon}
														disabled={action.disabled}
														kind={actions?.length > 1 ? 'tertiary' : 'primary'}
													>
														{action.name}
													</Button>
												))}
												<div className='space-x-1'>
													{actions?.slice(1)?.map((action, index) => (
														<Button
															size='sm'
															key={action.name}
															kind={index === 0 ? 'primary' : 'danger'}
															renderIcon={action.icon}
															disabled={action.disabled}
															iconDescription={action.name}
															tooltipPosition='bottom'
															hasIconOnly
															onClick={action.onClick}
														/>
													))}
												</div>
											</div>
										</Fade>
									</div>
								)}
							</div>
						</Breadcrumb>
					</FullWidthColumn>
				</Grid>
			</div>
			<div className='h-full bg-background md:pt-10'>
				<Grid className='items-end space-y-4 pb-7 md:space-y-10'>
					<FullWidthColumn>
						<Grid fullWidth className='xlg:flex xlg:justify-between'>
							<Column sm={4} md={5} lg={6} xlg={8}>
								<h2
									ref={pageTitleRef}
									className='flex flex-wrap text-productive-heading-5 '
								>
									{pageTitle}
								</h2>
							</Column>
							<Column sm={4} md={3} lg={10} xlg={8}>
								{actions?.length === 1 ? (
									<div className='mt-4 flex justify-end md:mt-0'>
										<Button
											renderIcon={actions[0].icon}
											size='md'
											// ref={actionButtonRef}
											onClick={actions[0].onClick}
											disabled={actions[0].disabled}
										>
											{actions[0].name}
										</Button>
									</div>
								) : (
									(actions?.length === 3 && (
										<div className='mt-4 flex flex-col justify-end space-y-2 md:mt-0 lg:flex-row lg:space-y-0'>
											<Button
												key={actions[0].name}
												kind='tertiary'
												className='min-w-full lg:min-w-fit'
												size='md'
												renderIcon={actions[0].icon}
												onClick={actions[0].onClick}
												disabled={actions[0].disabled}
											>
												{actions[0].name}
											</Button>
											<div className='flex lg:space-x-3'>
												<Button
													key={actions[1].name}
													size='md'
													className='w-1/2 xlg:w-fit'
													onClick={actions[1].onClick}
													renderIcon={actions[1].icon}
													disabled={actions[1].disabled}
												>
													{actions[1].name}
												</Button>
												<Button
													// ref={actionButtonRef}
													key={actions[2].name}
													size='md'
													kind='danger'
													className='w-1/2 xlg:w-fit'
													renderIcon={actions[2].icon}
													onClick={actions[2].onClick}
													disabled={actions[2].disabled}
												>
													{actions[2].name}
												</Button>
											</div>
										</div>
									)) ||
									(actions.length === 2 && (
										<div className='mt-4 flex flex-col justify-end space-y-2 md:mt-0 lg:flex-row lg:space-x-4 lg:space-y-0'>
											<Button
												kind={actions[0].kind || 'tertiary'}
												key={actions[0].name}
												className='min-w-full lg:min-w-fit'
												size='md'
												renderIcon={actions[0].icon}
												onClick={actions[0].onClick}
												disabled={actions[0].disabled}
											>
												{actions[0].name}
											</Button>
											<div className='flex lg:space-x-3'>
												<Button
													key={actions[1].name}
													kind={actions[1].kind || 'primary'}
													size='md'
													onClick={actions[1].onClick}
													renderIcon={actions[1].icon}
													disabled={actions[1].disabled}
													className='min-w-full lg:min-w-fit'
												>
													{actions[1].name}
												</Button>
											</div>
										</div>
									))
								)}
							</Column>
						</Grid>
					</FullWidthColumn>
				</Grid>
				<Grid className='pt-5'>
					<FullWidthColumn className='h-full bg-layer-1'>{children}</FullWidthColumn>
				</Grid>
			</div>
		</div>
	);
};

export default PageHeader;
