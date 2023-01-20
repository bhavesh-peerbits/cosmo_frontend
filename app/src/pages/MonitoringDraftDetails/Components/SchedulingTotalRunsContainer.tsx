import useGetTotalRun from '@api/scheduling/useGetTotalRun';
import Scheduling from '@model/Scheduling';
import { useTranslation } from 'react-i18next';

type SchedulingTotalRunsProps = {
	scheduling?: Scheduling;
};

const SchedulingTotalRunsContainer = ({ scheduling }: SchedulingTotalRunsProps) => {
	const { data: totalRuns } = useGetTotalRun(scheduling);
	const { t } = useTranslation('changeMonitoring');
	return (
		<div>
			<span className='text-productive-heading-2'>{t('total-runs')}: </span>
			<span>{totalRuns}</span>
		</div>
	);
};
export default SchedulingTotalRunsContainer;
