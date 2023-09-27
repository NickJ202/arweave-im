import { DefaultTheme } from 'styled-components';

const DEFAULT = {
	neutral1: '#FFFFFF',
	neutral2: '#FCFDFF',
	neutral3: '#F6F9FC',
	neutral4: '#F2F5F8',
	neutral5: '#D7E1EA',
	neutral6: '#BCCDDC',
	neutralA1: '#000000',
	neutralA2: '#031926',
	neutralA3: '#444444',
	neutralA4: '#ECF0FE',
	neutralA5: '#757582',
	neutralA6: '#C1CAD2',
	neutralA7: '#9B9BA1',
	neutralA8: '#4C4C53',
	primary: '#F6F8FA',
	primary2: '#E5EBF1',
	accent: '#4EBC9B',
	accent2: '#3EA384',
	accent3: '#4774C2',
	accent4: '#3D6AB8',
	accent5: '#031926',
	overlay1: '#F2F2F2C4',
	transparent: 'rgba(255, 255, 255, 0)',
	semiTransparent1: 'rgba(255, 255, 255, 0.5)',
	semiTransparent2: 'rgba(0, 0, 0, 0.275)',
	negative: '#E83151',
	negativeShadow: '#EF6C82',
	positive: '#06BA63',
	neutral: '#FFC43D'
};

export const defaultTheme: DefaultTheme = {
	scheme: 'light',
	colors: {
		primary: DEFAULT.primary,
		border: {
			primary: DEFAULT.neutral5,
			alt1: DEFAULT.neutral6,
		},
		button: {
			primary: {
				background: DEFAULT.primary,
				border: DEFAULT.neutralA6,
				color: DEFAULT.neutralA1,
				active: {
					background: DEFAULT.primary2,
					border: DEFAULT.neutralA6,
					color: DEFAULT.neutralA1,
				},
				disabled: {
					background: DEFAULT.primary,
					border: DEFAULT.neutral5,
					color: DEFAULT.neutralA7,
				},
			},
			alt1: {
				background: DEFAULT.accent,
				border: DEFAULT.accent,
				color: DEFAULT.neutral1,
				active: {
					background: DEFAULT.accent2,
					border: DEFAULT.accent2,
					color: DEFAULT.neutral1,
				},
				disabled: {
					background: DEFAULT.primary,
					border: DEFAULT.neutral5,
					color: DEFAULT.neutralA7,
				},
			},
			alt2: {
				color: DEFAULT.accent3,
				active: {
					color: DEFAULT.accent4,
				},
				disabled: {
					color: DEFAULT.neutralA7,
				},
			},
		},
		container: {
			primary: {
				background: DEFAULT.neutral1,
				disabled: DEFAULT.primary,
				hover: DEFAULT.neutral3,
			},
			alt1: {
				background: DEFAULT.neutral2,
			},
			alt2: {
				background: DEFAULT.neutral3,
			},
			alt3: {
				background: DEFAULT.primary2,
			},
		},
		editor: {
			codeLine: {
				background: DEFAULT.neutral3,
				border: DEFAULT.neutral6,
				color: DEFAULT.accent5
			}
		},
		font: {
			primary: DEFAULT.neutralA1,
			active: DEFAULT.neutralA3,
			alt1: DEFAULT.neutralA2,
			alt2: DEFAULT.neutralA8,
			alt3: DEFAULT.neutral1,
		},
		form: {
			background: DEFAULT.neutral1,
			border: DEFAULT.neutral5,
			invalid: {
				outline: DEFAULT.negative,
				shadow: DEFAULT.negativeShadow,
			},
			valid: {
				outline: DEFAULT.neutral5,
				shadow: DEFAULT.neutral3,
			},
			disabled: {
				background: DEFAULT.neutral3,
				label: DEFAULT.neutralA5,
			},
		},
		icon: {
			primary: DEFAULT.neutralA1,
			alt1: DEFAULT.neutral1,
			alt2: DEFAULT.neutralA6,
		},
		loader: {
			primary: DEFAULT.neutralA2,
		},
		notification: {
			success: DEFAULT.positive,
			warning: DEFAULT.negative,
			neutral: DEFAULT.neutral,
		},
		overlay: {
			primary: DEFAULT.overlay1,
			alt1: DEFAULT.semiTransparent2
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
		shadow: DEFAULT.neutral5,
		tabs: {
			active: DEFAULT.neutral2,
			inactive: DEFAULT.neutral3,
			hover: DEFAULT.neutral3,
			alt1: {
				active: DEFAULT.primary,
			},
		},
		table: {
			placeholder: {
				background: DEFAULT.neutral4,
				backgroundStart: DEFAULT.transparent,
				backgroundSlide: DEFAULT.semiTransparent1,
				backgroundEnd: DEFAULT.transparent,
			},
			row: {
				active: {
					background: DEFAULT.neutral4,
					border: DEFAULT.primary,
				},
			},
		},
	},
	typography: {
		family: {
			primary: `'Public Sans', sans-serif;`,
			code: 'Monaco,Menlo,Consolas,Courier New,monospace',
		},
		size: {
			xxxSmall: '12px',
			xxSmall: '13px',
			xSmall: '14px',
			small: '15px',
			base: '16px',
			lg: '18px',
			xLg: '24px',
		},
		weight: {
			regular: '400',
			bold: '600',
		},
	},
};
