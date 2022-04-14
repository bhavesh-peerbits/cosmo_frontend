import { FC } from 'react';

const Centered: FC = ({ children }) => {
	return (
		<div className='flex h-full w-full items-center justify-center text-center'>
			{children}
		</div>
	);
};
export default Centered;
