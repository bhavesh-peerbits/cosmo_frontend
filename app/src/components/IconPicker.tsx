import {
	ApplicationMobile,
	ApplicationVirtual,
	ApplicationWeb
} from '@carbon/react/icons';
import { FormLabel, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import IconResolver from '@components/IconResolver';
import { FocusEventHandler, forwardRef } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

export const icons = {
	mobile: {
		component: ApplicationMobile,
		keywords: 'mobile telephone phone call'
	},
	web: {
		component: ApplicationWeb,
		keywords: 'web browser internet'
	},
	virtual: {
		component: ApplicationVirtual,
		keywords: 'virtual reality'
	}
};

interface IconPickerProps {
	icon: keyof typeof icons;
	onChange: (icon: keyof typeof icons) => void;
	onBlur?: FocusEventHandler<HTMLDivElement>;
	className?: string;
}

const IconPicker = forwardRef<HTMLDivElement, IconPickerProps>(
	({ icon, onChange, onBlur, className }, ref) => {
		const { t } = useTranslation('applicationInfo');
		return (
			<div className={cx([className, 'mb-3 flex space-x-5'])} ref={ref} onBlur={onBlur}>
				<FormLabel className='flex items-center'>{t('icon')}</FormLabel>
				<OverflowMenu
					size='lg'
					renderIcon={() => <IconResolver size={24} icon={icon} />}
					label='filter'
					ariaLabel=''
					iconDescription=''
					menuOptionsClass='block columns-3 w-[200px]'
				>
					{Object.entries(icons).map(([key, value]) => (
						<OverflowMenuItem
							key={key}
							title={key}
							requireTitle
							itemText={<value.component size={24} />}
							onClick={() => onChange(key as keyof typeof icons)}
						/>
					))}
				</OverflowMenu>
			</div>
		);
	}
);

export default IconPicker;
