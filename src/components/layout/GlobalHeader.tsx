import mainLogo from '../../assets/media/logos/logo-main.svg';
import ThemeSwitcher from '../../assets/media/theme-swticher/ThemeSwitcher';
import useColorSchemeSwitcher from '../../hooks/use-color-scheme-switcher';
import ColorSchemeSwitcherButton from '../ui/buttons/color-scheme-switcher-button/ColorSchemeSwitcherButton';
import { NavLink } from 'react-router-dom';

type Props = {};

const GlobalHeader = (props: Props) => {
	const { colorScheme, toggleColorScheme } = useColorSchemeSwitcher();

	console.log(colorScheme);

	return (
		<>
			<a
				id='skip-link'
				href='#main'>
				Skip to main
			</a>

			<header>
				<nav id='global-navigation'>
					<img
						className='main-logo'
						src={mainLogo}
						alt='website logo'
						loading='lazy'
						inline-size='169'
						block-size='150'
					/>
					<div>
						<NavLink
							to='/movies'
							className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
							Movies
						</NavLink>
					</div>
					<ColorSchemeSwitcherButton
						type='button'
						onClick={toggleColorScheme}
						title={colorScheme === 'dark' ? 'Switch to light color scheme' : 'Swich to dark color scheme'}
						aria-label={
							colorScheme === 'dark' ? 'Switch to light color scheme' : 'Swich to dark color scheme'
						}
						ariaLive='polite'
						disabled={false}
						icon={<ThemeSwitcher />}
					/>
				</nav>
			</header>
			<header>
				<nav id='page-specific-navigation'>
					<h1>React</h1>
				</nav>
			</header>
		</>
	);
};

export default GlobalHeader;
