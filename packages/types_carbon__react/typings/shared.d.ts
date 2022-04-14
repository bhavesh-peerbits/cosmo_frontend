import * as React from 'react';

export interface ReactAttr<T = HTMLElement> extends React.HTMLProps<T> {}
export interface ReactButtonAttr<T = HTMLButtonElement> extends React.HTMLProps<T> {}
export interface ReactDivAttr extends ReactAttr<HTMLDivElement> {}
export interface ReactInputAttr<T = HTMLInputElement> extends React.HTMLProps<T> {}
export interface ReactLabelAttr<T = HTMLLabelElement> extends React.HTMLProps<T> {}
export interface ReactLIAttr<T = HTMLLIElement> extends React.HTMLProps<T> {}

export interface AriaLabelProps {
	'aria-label'?: string;
	'aria-labelledby'?: string;
}

export type ShapeOf<
	B extends object,
	E extends object = { [key: string]: any }
> = (E extends never ? {} : E) & B;
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
export type ForwardRefProps<T, P = {}> = React.PropsWithoutRef<
	React.PropsWithChildren<P>
> &
	React.RefAttributes<T>;
