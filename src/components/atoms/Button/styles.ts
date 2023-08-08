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
	border-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		background: ${(props) => props.theme.colors.button.primary.active.background};
	}
	&:focus {
		background: ${(props) =>
			props.active ? props.theme.colors.button.primary.active.background : props.theme.colors.button.primary.background};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.primary.disabled.background};
		span {
			color: ${(props) => props.theme.colors.button.primary.disabled.label};
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
				? props.theme.colors.button.primary.disabled.label
				: props.active
				? props.theme.colors.button.primary.active.label
				: props.theme.colors.button.primary.label};
	}
`;