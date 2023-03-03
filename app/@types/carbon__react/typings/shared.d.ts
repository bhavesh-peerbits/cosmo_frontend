import * as React from 'react';
import { ReactElement } from 'react';
import { CarbonIconType } from '@carbon/icons-react';

export type ReactAttr<T = HTMLElement> = React.HTMLProps<T>;
export type ReactButtonAttr<T = HTMLButtonElement> = React.HTMLProps<T>;
export type ReactDivAttr = ReactAttr<HTMLDivElement>;
export type ReactInputAttr<T = HTMLInputElement> = React.HTMLProps<T>;
export type ReactLabelAttr<T = HTMLLabelElement> = React.HTMLProps<T>;
export type ReactLIAttr<T = HTMLLIElement> = React.HTMLProps<T>;

export type RenderIcon =
	| (() => ReactElement)
	| ReactElement
	| CarbonIconType
	| (() => CarbonIconType);

export interface AriaLabelProps {
	'aria-label'?: string;
	'aria-labelledby'?: string;
}

export type ShapeOf<
	B extends object,
	E extends object = { [key: string]: unknown }
> = (E extends never ? Record<string, unknown> : E) & B;
export type Overwrite<T, U> = [T] extends [never] ? U : Omit<T, keyof U> & U;

export type VerticalDirection = 'bottom' | 'top';
export type HorizontalDirection = 'left' | 'right';
export type Direction = HorizontalDirection | VerticalDirection;
export type ListBoxBaseItemType = object | string;
export type TooltipAlignment = 'center' | 'end' | 'start';
export type TooltipPosition = Direction;
export type CarbonSize = 'lg' | 'sm' | 'xs';
export type CarbonInputSize = 'sm' | 'lg' | 'xl';

export type FCReturn<T = void> = React.FC<T>;
export type ForwardRefProps<T, P = Record<string, unknown>> = React.PropsWithoutRef<
	React.PropsWithChildren<P>
> &
	React.RefAttributes<T>;
