import { DefaultTheme } from 'styled-components';

const DEFAULT = {
	neutral1: '#FFFFFF',
	neutral2: '#FCFDFF',
	neutral3: '#F6F8FA',
	neutral4: '#F2F5F8',
	neutral5: '#D7E1EA',
	neutral6: '#BCCDDC',
	neutralA1: '#000000',
	neutralA2: '#031926',
	neutralA3: '#444444',
	neutralA4: '#BFC8CA',
	primary: '#5398A2',
	primary2: '#457E87',
	overlay1: '#2D2D2DC4',
	transparent: 'rgba(255, 255, 255, 0)',
	semiTransparent1: 'rgba(255, 255, 255, 0.5)',
};

export const defaultTheme: DefaultTheme = {
	scheme: 'light',
	colors: {
		primary: DEFAULT.primary,
		border: {
			primary: DEFAULT.neutral5,
		},
		button: {
			primary: {
				background: DEFAULT.primary,
				color: DEFAULT.neutral1,
				active: {
					background: DEFAULT.primary2,
					color: DEFAULT.neutral1,
				},
				disabled: {
					background: DEFAULT.neutralA4,
					color: DEFAULT.neutral4,
				},
			},
		},
		container: {
			primary: {
				background: DEFAULT.neutral1,
				hover: DEFAULT.neutral3,
			},
			alt1: {
				background: DEFAULT.neutral2,
			},
		},
		font: {
			primary: DEFAULT.neutralA1,
			alt1: DEFAULT.neutralA2,
			alt2: DEFAULT.neutralA3,
			alt3: DEFAULT.neutral1,
		},
		loader: {
			primary: DEFAULT.primary,
		},
		overlay: {
			primary: DEFAULT.overlay1,
		},
		scrollbar: {
			thumb: DEFAULT.neutral6,
		},
		view: {
			background: DEFAULT.neutral1,
		},
		navigation: {
			header: {
				background: DEFAULT.neutral2,
			},
			panel: {
				background: DEFAULT.neutral3,
			},
		},
		table: {
			placeholder: {
				background: DEFAULT.neutral2,
				backgroundStart: DEFAULT.transparent,
				backgroundSlide: DEFAULT.semiTransparent1,
				backgroundEnd: DEFAULT.transparent,
			},
		},
	},
	typography: {
		family: {
			primary: `'Lato', sans-serif;`,
		},
		size: {
			xxSmall: '13px',
			xSmall: '14px',
			small: '15px',
			base: '16px',
		},
		weight: {
			light: '300',
			regular: '400',
			bold: '600',
		},
	},
};
