import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeProps = {
	timing?: string;
	children: ReactNode;
};

const Fade: FC<FadeProps> = ({ timing, children }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`h-full w-full ${timing || 'duration-slow-2'}`}
		>
			{children}
		</motion.div>
	);
};

export default Fade;
