import { ReactElement } from 'react';

type Button = {
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type: 'button' | 'submit' | 'reset';
	title: string;
	disabled: boolean;
	icon?: ReactElement;
	ariaLive: 'off' | 'polite' | 'assertive';
	className?: string;
};

export default Button;
