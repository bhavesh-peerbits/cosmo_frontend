import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeProps = {
	timing?: string;
	children: ReactNode;
};

const Fade: FC<FadeProps> = ({ timing, children }) => {
	return (
		<motion.div
			key='fade'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={`h-full w-full ${timing || 'duration-moderate-1'}`}
		>
			{children}
		</motion.div>
	);
};

export default Fade;
