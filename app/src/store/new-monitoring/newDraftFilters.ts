/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import Monitoring from '@model/Monitoring';

type Filters = {
	application: string[];
	controlCode: string[];
	q: string | undefined;
};

const newDraftFilters = atom<Filters>({
	key: 'monitoringNewDraftFilters',
	default: {
		application: [],
		controlCode: [],
		q: ''
	}
});

const newDraftMonitorings = atom<Monitoring[]>({
	key: 'newDraftMonitorings',
	default: []
});

const applyFilters = (
	monitorings: GetRecoilType<typeof newDraftMonitorings>,
	filters: GetRecoilType<typeof newDraftFilters>
) => {
	const filteredMonitorings = monitorings
		// filter by query term string
		.filter(monitoring =>
			filters.q
				? monitoring.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.q.toString().toLowerCase().trim())
				: true
		)
		// filter by application
		.filter(monitoring =>
			filters.application.length
				? filters.application.some(
						app =>
							monitoring.instance.application.name.toLocaleLowerCase() ===
							app.toLowerCase()
				  )
				: true
		)
		// filter by control code
		.filter(monitoring =>
			filters.controlCode.length
				? filters.controlCode.some(
						code => monitoring.controlCode.toLocaleLowerCase() === code.toLowerCase()
				  )
				: true
		);

	return filteredMonitorings;
};

const filteredNewDraftMonitorings = selector({
	key: 'filteredNewDraftMonitorings',
	get: ({ get }) => {
		const filters = get(newDraftFilters);
		const monitorings = get(newDraftMonitorings);
		return {
			monitorings: applyFilters(monitorings, filters),
			application: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.instance.application.name)
						.filter(a => !!a) as string[]
				)
			].map(app => ({
				app,
				enabled: filters.application.includes(app ?? '')
			})),
			controlCode: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.controlCode)
						.filter(c => !!c) as string[]
				)
			].map(code => ({
				code,
				enabled: filters.controlCode.includes(code ?? '')
			}))
		};
	}
});

export { newDraftFilters, newDraftMonitorings, filteredNewDraftMonitorings };
