import { Accordion, AccordionItem, Button, HeaderPanel } from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import { mapUserRoleToDisplayRole } from '@model/UserRole';
import routes from '@routes/routes-const';
import User from '@model/User';
import { useClickAway } from 'ahooks';
import { useRef } from 'react';

interface UserPanelProps {
	expanded: boolean;
	user: User | null | undefined;
	onClickOutside: (e: Event) => void;
}

const UserPanel = ({ expanded, user, onClickOutside }: UserPanelProps) => {
	const panelRef = useRef(null);
	useClickAway(e => onClickOutside(e), panelRef);

	return (
		<HeaderPanel
			ref={panelRef}
			aria-label='User Panel'
			className='h-fit border-t-[0] border-r-[0] border-b-[1px] border-solid border-border-subtle-1'
			expanded={expanded}
		>
			<section className='flex flex-nowrap items-center space-x-5 p-5'>
				<UserProfileImage
					backgroundColor='light-gray'
					initials={user?.displayName}
					imageDescription={user?.username}
					size='xlg'
				/>
				<div>
					<span className='break-words hyphens-auto text-productive-heading-3'>
						{user?.displayName}
					</span>
					<span className='block break-all text-caption-1'>{user?.email}</span>
				</div>
			</section>
			<section>
				<Accordion className='py-2'>
					<AccordionItem
						className='relative border-[0]'
						title={
							<>
								<div className='text-caption-1'>Roles: {user?.roles?.length ?? 0}</div>
								<div className='w-13 overflow-hidden text-ellipsis whitespace-nowrap text-left text-body-short-2'>
									{user?.principalRole}
								</div>
							</>
						}
					>
						<ul className='space-y-3'>
							{user?.roles?.map(role => (
								<li className='w-full' key={role}>
									<div className='w-full border-b-[1px] border-solid border-border-subtle-1 px-5 py-3 text-body-short-1'>
										{mapUserRoleToDisplayRole(role)}
									</div>
								</li>
							))}
						</ul>
					</AccordionItem>
				</Accordion>
			</section>
			<section className='flex items-center justify-between border-t-[1px] border-solid border-border-subtle-1 py-2 px-2 text-body-short-1'>
				<Button kind='ghost' size='sm' className='flex flex-1 justify-start'>
					Edit Profile
				</Button>
				<Button
					kind='ghost'
					size='sm'
					className='flex flex-1 justify-end'
					onClick={() => window.location.replace(routes.LOGOUT)}
				>
					Sign out
				</Button>
			</section>
		</HeaderPanel>
	);
};

export default UserPanel;
