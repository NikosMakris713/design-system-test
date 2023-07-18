import type Button from '../../../../types/react-ui-elements/button';
import '../icon-button/icon-button.scss';

const IconButton = (props: Button) => {
	return (
		<button
			className={`icon-button ${props.className}`}
			type={props.type}
			title={props.title}
			aria-label={props.title}
			aria-live={props.ariaLive}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.icon}
		</button>
	);
};

export default IconButton;
