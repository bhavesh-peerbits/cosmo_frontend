import UserProfileImage from '@components/UserProfileImage';
import User from '@model/User';
import { CellContext } from '@tanstack/react-table';

const UsersListCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as User[];
	return (
		<div className='flex items-center space-x-2'>
			{value?.map(us => (
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
