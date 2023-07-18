import type Button from '../../../../types/react-ui-elements/button';
import '../color-scheme-switcher-button/color-scheme-switcher-button.scss';

const ColorSchemeSwitcherButton = (props: Button) => {
	return (
		<button
			className='color-scheme-toggle'
			type='button'
			title={props.title}
			aria-label={props.title}
			aria-live={props.ariaLive}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.icon}
		</button>
	);
};

export default ColorSchemeSwitcherButton;
