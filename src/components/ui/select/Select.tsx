import { ReactNode } from 'react';
import '../select/select.scss';

type Props = {
	children: ReactNode;
	label: string;
	defaultValue: string;
	id: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = (props: Props) => {
	return (
		<>
			<label htmlFor={props.id}>{props.label}</label>
			<div className='select-wrapper'>
				<select
					defaultValue={props.defaultValue}
					id={props.id}
					name={props.id}
					onChange={props.onChange}>
					{props.children}
				</select>
			</div>
		</>
	);
};

export default Select;
