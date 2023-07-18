import type Button from '../../../../types/react-ui-elements/button';
import '../default-button/default-button.scss';

const DefaultButton = (props: Button) => {
	return (
		<button
			className={props.className ? `default-button ${props.className}` : 'default-button'}
			type={props.type}
			onClick={props.onClick}
			title={props.title}
			aria-label={props.title}
			aria-live={props.ariaLive}
			disabled={props.disabled}>
			{props.icon}
			{props.title}
		</button>
	);
};

export default DefaultButton;
