import { useMemoizedFn, useUpdate } from 'ahooks';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { parse, stringify } from 'query-string';
import type * as React from 'react';
import { useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface Options {
	navigateMode?: 'push' | 'replace';
	parseOptions?: ParseOptions;
	stringifyOptions?: StringifyOptions;
}

const baseParseConfig: ParseOptions = {
	parseNumbers: true,
	parseBooleans: true,
	arrayFormat: 'comma'
};

const baseStringifyConfig: StringifyOptions = {
	skipNull: false,
	skipEmptyString: false,
	arrayFormat: 'comma'
};

type UrlState = Record<
	string,
	string | number | boolean | undefined | Array<string | number | boolean>
>;

const useUrlState = <S extends UrlState = UrlState>(
	initialState: S | (() => S),
	options?: Options
) => {
	const { navigateMode = 'push', parseOptions, stringifyOptions } = options || {};

	const mergedParseOptions = useMemo(
		() => ({ ...baseParseConfig, ...parseOptions }),
		[parseOptions]
	);
	const mergedStringifyOptions = { ...baseStringifyConfig, ...stringifyOptions };

	const location = useLocation();

	const navigate = useNavigate();

	const update = useUpdate();

	const initialStateRef = useRef(
		typeof initialState === 'function' ? (initialState as () => S)() : initialState || {}
	);

	const queryFromUrl = useMemo(() => {
		const p = parse(location.search, mergedParseOptions);
		const r = initialStateRef.current;
		const retVal = {} as Record<keyof S, unknown>;
		Object.entries(r).forEach(([key, value]) => {
			const k = key as keyof S;
			let val = p[key];
			if (val && Array.isArray(value) && !Array.isArray(val)) {
				val = [val];
			}
			retVal[k] = val;
		});
		return retVal as S;
	}, [location.search, mergedParseOptions]);

	const targetQuery: Partial<S> = useMemo(
		() => ({
			...initialStateRef.current,
			...queryFromUrl
		}),
		[queryFromUrl]
	);

	const setState = (s: React.SetStateAction<Partial<S>>) => {
		const newQuery = typeof s === 'function' ? s(targetQuery) : s;

		update();

		navigate(
			{
				hash: location.hash,
				search: stringify({ ...queryFromUrl, ...newQuery }, mergedStringifyOptions) || '?'
			},
			{
				replace: navigateMode === 'replace'
			}
		);
	};

	return [targetQuery, useMemoizedFn(setState)] as const;
};

export default useUrlState;
