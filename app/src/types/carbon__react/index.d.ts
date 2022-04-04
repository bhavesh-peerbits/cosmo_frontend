declare module '@carbon/react' {
	import React, { InputHTMLAttributes } from 'react';
	import { LinkProps } from 'react-router-dom';

	export type CarbonTheme = 'white' | 'g10' | 'g90' | 'g100';
	const Theme: React.FC<{ theme: CarbonTheme; className: string }>;
	const Layer: React.FC;
	const Header: React.FC;
	const HeaderMenu: React.FC<{ 'aria-label'?: string; menuLinkName: string }>;
	const Header: React.FC;
	const HeaderContainer: React.FC<{
		render: (props: {
			isSideNavExpanded: boolean;
			onClickSideNavExpand: () => void;
		}) => JSX.Element;
	}>;
	const HeaderMenuButton: React.FC<{
		'aria-label'?: string;
		onClick?: () => void;
		isActive: boolean;
	}>;
	const HeaderName: React.FC<{ prefix?: string; href?: string }>;
	const HeaderNavigation: React.FC<{ 'aria-label'?: string }>;
	const HeaderMenuItem: React.FC<{ href?: string }>;
	const HeaderGlobalBar: React.FC;
	const HeaderGlobalAction: React.FC<{
		'aria-label'?: string;
		onClick: () => void;
		isActive?: boolean;
		tooltipAlignment?: 'start' | 'center' | 'end';
	}>;
	const SideNav: React.FC<{ 'aria-label'?: string; expanded: boolean }>;
	const SideNavItems: React.FC;
	const HeaderSideNavItems: React.FC<{ hasDivider: boolean }>;
	const SideNavMenu: React.FC<{
		isActive?: boolean;
		renderIcon: JSX.Element;
		title: string;
	}>;
	const SideNavMenuItem: React.FC<{ href?: string }>;
	const SideNavLink: React.FC<{
		renderIcon?: JSX.Element;
		element?: React.ForwardRefExoticComponent<
			LinkProps & React.RefAttributes<HTMLAnchorElement>
		>;
		href?: string;
		to?: string;
	}>;
	const HeaderPanel: React.FC<{ expanded: boolean }>;
	const Switcher: React.FC;
	const SwitcherItem: React.FC<{ isSelected?: boolean; href?: string }>;
	const SwitcherDivider: React.FC;
	const Content: React.FC<{ className?: string }>;
	const SkipToContent: React.FC;
	const ActionableNotification: React.FC<{
		onActionButtonClick?: () => void;
		inline?: boolean;
		actionButtonLabel?: string;
		kind?: 'error' | 'info' | 'warning';
		className?: string;
	}>;
	const Accordion: React.FC;
	const AccordionItem: React.FC<{ title: string }>;
	const Button: React.FC<
		React.HTMLProps<HTMLButtonElement> & {
			renderIcon?: JSX.Element;
			iconDescription?: string;
			isExpressive?: boolean;
		}
	>;
	const CodeSnippet: React.FC<{ type: 'inline' | 'multi' }>;
	const ComposedModal: React.FC<{ open?: boolean; preventCloseOnClickOutside?: boolean }>;
	const InlineLoading: React.FC<{
		status?: 'active';
		iconDescription?: string;
		description?: string;
	}>;
	const Layer: React.FC;
	const ModalBody: React.FC;
	const ModalFooter: React.FC;
	const ModalHeader: React.FC<{ title: string; label: string; closeModal: () => void }>;
	const TextArea: React.FC<
		InputHTMLAttributes<HTMLTextAreaElement> & {
			invalid?: boolean;
			invalidText?: string;
			labelText?: string;
			helperText?: string;
			cols?: number;
			rows?: number;
		}
	>;
	const TextInput: React.FC<
		InputHTMLAttributes<HTMLInputElement> & {
			invalid?: boolean;
			invalidText?: string;
			labelText?: string;
		}
	>;
	const Grid: React.FC<{ className?: string }>;
	const Tile: React.FC;
	const ButtonSet: React.FC<{ stacked?: boolean; className?: string }>;
	type SpanType = number | { span?: number; offset?: number };
	const Column: React.FC<{ sm?: SpanType; md?: SpanType; lg?: SpanType }>;
}
