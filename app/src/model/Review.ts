import { icons } from '@components/IconPicker';
import User from './User';

interface Review {
	id: string;
	name: string;
	codeName: string;
	description?: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: User;
	delegates: User[];
	icon: keyof typeof icons;
	applicationData: Record<string, string | undefined> | undefined;
	analyst: string;
	startDate: Date;
	dueDate: Date;
	narrativeName: string;
}
export default Review;
