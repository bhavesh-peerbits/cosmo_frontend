import { ReactNode } from 'react';

type CenteredProps = {
	children: ReactNode;
};

const Centered = ({ children }: CenteredProps) => {
	return (
		<div className='flex h-full w-full items-center justify-center text-center'>
			{children}
		</div>
	);
};
export default Centered;
