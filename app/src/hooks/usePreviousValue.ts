import { useEffect, useRef } from 'react';

/**
 * Returns the previous state values included in the param
 * @param {object} value
 */
const usePreviousValue = <T>(value: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};

export default usePreviousValue;
