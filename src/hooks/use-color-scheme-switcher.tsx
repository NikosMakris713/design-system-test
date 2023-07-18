import { useState, useEffect } from 'react';

const doc: Element = document.firstElementChild!;

const useColorSchemeSwitcher = () => {
	const colorSchemeFromLocalStorage = localStorage.getItem('color-scheme');
	const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
	const [colorScheme, setColorScheme] = useState(
		colorSchemeFromLocalStorage || preferredColorScheme
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleColorSchemeChange = (event: MediaQueryListEvent) => {
			const newColorScheme = event.matches ? 'dark' : 'light';
			setColorScheme(newColorScheme);
			localStorage.setItem('color-scheme', newColorScheme);
		};

		if (doc.getAttribute('color-scheme') !== colorScheme) {
			doc.setAttribute('color-scheme', colorScheme);
		}

		mediaQuery.addEventListener('change', handleColorSchemeChange);
		return () => {
			mediaQuery.removeEventListener('change', handleColorSchemeChange);
		};
	}, [colorScheme]);

	const toggleColorScheme = () => {
		const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
		setColorScheme(newColorScheme);
		localStorage.setItem('color-scheme', newColorScheme);
	};

	return {
		colorScheme,
		toggleColorScheme,
	};
};

export default useColorSchemeSwitcher;
