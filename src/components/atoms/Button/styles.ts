import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

function getHeight(height: number | undefined) {
	if (height) {
		return `${height.toString()}px`;
	} else {
		return STYLING.dimensions.buttonHeight;
	}
}

function getWidth(noMinWidth: boolean | undefined, width: number | undefined, fullWidth: boolean | undefined) {
	if (fullWidth) {
		return `100%`;
	}
	if (width) {
		return `${width.toString()}px`;
	} else {
		if (noMinWidth) {
			return 'fit-content';
		} else {
			return STYLING.dimensions.buttonWidth;
		}
	}
}

export const Primary = styled.button<{
	useMaxWidth: boolean | undefined;
	noMinWidth: boolean | undefined;
	width: number | undefined;
	fullWidth: boolean | undefined;
	height: number | undefined;
	active: boolean | undefined;
}>`
	position: relative;
	background: ${(props) =>
		props.active ? props.theme.colors.button.primary.active.background : props.theme.colors.button.primary.background};
	height: ${(props) => getHeight(props.height)};
	min-width: ${(props) => getWidth(props.noMinWidth, props.width, props.fullWidth)};
	max-width: ${(props) => (props.useMaxWidth ? STYLING.dimensions.buttonWidth : '100%')};
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid
		${(props) =>
			props.active ? props.theme.colors.button.primary.active.border : props.theme.colors.button.primary.border};
	border-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		background: ${(props) => props.theme.colors.button.primary.active.background};
		border: 1px solid ${(props) => props.theme.colors.button.primary.active.border};
	}
	&:focus {
		background: ${(props) =>
			props.active
				? props.theme.colors.button.primary.active.background
				: props.theme.colors.button.primary.background};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.primary.disabled.background};
		border: 1px solid ${(props) => props.theme.colors.button.primary.disabled.border};
		span {
			color: ${(props) => props.theme.colors.button.primary.disabled.color};
		}
	}

	span {
		width: fit-content;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) =>
			props.active ? props.theme.colors.button.primary.active.color : props.theme.colors.button.primary.color};
	}
`;

export const IconPrimary = styled.div<{
	active: boolean;
	disabled: boolean;
	leftAlign: boolean;
}>`
	svg {
		height: 20px;
		width: 20px;
		padding: 1.5px 0 0 0;
		margin: ${(props) => (props.leftAlign ? '0 12.5px 0 0' : '0 0 0 12.5px')};
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.color
				: props.active
				? props.theme.colors.button.primary.active.color
				: props.theme.colors.button.primary.color};
	}
`;

export const Alt1 = styled(Primary)`
	background: ${(props) =>
		props.active ? props.theme.colors.button.alt1.active.background : props.theme.colors.button.alt1.background};
	border: 1px solid
		${(props) => (props.active ? props.theme.colors.button.alt1.active.border : props.theme.colors.button.alt1.border)};
	border-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		background: ${(props) => props.theme.colors.button.alt1.active.background};
		border: 1px solid ${(props) => props.theme.colors.button.alt1.active.border};
	}
	&:focus {
		background: ${(props) =>
			props.active ? props.theme.colors.button.alt1.active.background : props.theme.colors.button.alt1.background};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.alt1.disabled.background};
		border: 1px solid ${(props) => props.theme.colors.button.alt1.disabled.border};
		span {
			color: ${(props) => props.theme.colors.button.alt1.disabled.color};
		}
	}

	span {
		width: fit-content;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) =>
			props.active ? props.theme.colors.button.alt1.active.color : props.theme.colors.button.alt1.color};
	}
`;

export const IconAlt1 = styled(IconPrimary)`
	svg {
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.button.alt1.disabled.color
				: props.active
				? props.theme.colors.button.alt1.active.color
				: props.theme.colors.button.alt1.color};
	}
`;

export const Warning = styled(Primary)`
	span {
		color: ${(props) => props.theme.colors.notification.warning};
	}
`;

export const IconWarning = styled(IconPrimary)`
	svg {
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.color
				: props.active
				? props.theme.colors.notification.warning
				: props.theme.colors.notification.warning};
	}
`;
