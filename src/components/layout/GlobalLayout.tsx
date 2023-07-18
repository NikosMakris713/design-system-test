import Notification from '../notifications/Notification';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';

type Props = {
	children: any;
};

const GlobalLayout = (props: Props) => {
	return (
		<>
			<Notification />
			<GlobalHeader />
			<main>{props.children}</main>
			<GlobalFooter />
		</>
	);
};

export default GlobalLayout;
