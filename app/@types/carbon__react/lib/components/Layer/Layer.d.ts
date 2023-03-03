import { HTMLProps, ReactElement } from 'react';

type LayerProps<K extends keyof HTMLElementTagNameMap> = {
	as?: K;
	/**
	 * Specify the layer level and override any existing levels based on hierarchy
	 */
	level?: 0 | 1 | 2;
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Layer<T extends keyof HTMLElementTagNameMap = 'a'>(
	props: LayerProps<T>
): ReactElement;

export default Layer;
