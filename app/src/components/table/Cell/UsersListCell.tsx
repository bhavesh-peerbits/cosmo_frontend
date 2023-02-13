import UserProfileImage from '@components/UserProfileImage';
import User from '@model/common/User';

const UsersListCell = ({ users }: { users?: User[] }) => {
	return (
		<div className='flex items-center space-x-2'>
			{users &&
				users.length > 0 &&
				users.map(us => (
					<UserProfileImage
						size='lg'
						initials={us.displayName}
						imageDescription={us.username}
						tooltipText={us.displayName}
						className='mx-[-5px]'
					/>
				))}
		</div>
	);
};
export default UsersListCell;
