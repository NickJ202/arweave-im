import styled, { css } from 'styled-components';

import { fadeIn1, open, openLeft } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	min-height: 100vh;
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 11;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.colors.overlay.primary};
	backdrop-filter: blur(2px);
`;

export const PWrapper = styled.div<{ overlay: boolean }>`
	height: 100vh;
	width: ${STYLING.dimensions.navPanelWidth};
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	padding: ${(props) => (props.overlay ? '0' : `${STYLING.dimensions.navHeaderHeight} 0 0 0`)};
	background: ${(props) =>
		props.overlay ? props.theme.colors.container.primary.background : props.theme.colors.navigation.panel.background};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	will-change: transform;
	animation: ${(props) =>
		props.overlay
			? css`
					${openLeft} 0.15s ease-in-out forwards
			  `
			: 'none'};
`;

export const TWrapper = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${open} ${fadeIn1};
`;

export const LWrapper = styled.div`
	svg {
		padding: 3.5px 0 0 0;
		height: 33.5px;
		width: 30px;
		transition: all 100ms;
		&:hover {
			cursor: pointer;
			opacity: 0.5;
		}
	}
`;

export const Group = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${open} ${fadeIn1};
`;

export const GroupAction = styled.button`
	width: calc(100% - 15px);
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-align: left;
	border: 1px solid transparent;
	border-radius: ${STYLING.dimensions.borderRadius};
	padding: 5px 10px;
	background: transparent;
	&:hover {
		background: ${(props) => props.theme.colors.button.primary.active.background};
		border: 1px solid ${(props) => props.theme.colors.button.primary.active.border};
	}
	&:disabled {
		border: 1px solid transparent;
		background: transparent;
	}
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	svg {
		height: 17.5px;
		width: 17.5px;
		padding: 5px 0 0 0;
		fill: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Channels = styled.div`
	height: calc(100% - 55px);
	width: 100%;
	padding: 15px 0;
	overflow: auto;
	animation: ${open} ${fadeIn1};
	scrollbar-width: thin;
	scrollbar-color: transparent transparent;
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-radius: ${STYLING.dimensions.borderRadius};
	}

	&:hover {
		scrollbar-color: ${(props) => props.theme.colors.scrollbar.thumb} transparent;

		::-webkit-scrollbar-thumb {
			background-color: ${(props) => props.theme.colors.scrollbar.thumb};
		}
	}

	> * {
		&:not(:last-child) {
			margin: 0 0 10px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;

export const Channel = styled.div<{ active: boolean }>`
	height: 35px;
	display: flex;
	align-items: center;
	padding: 0 7.5px;
	button {
		height: 100%;
		width: 100%;
		text-align: left;
		border: 1px solid ${(props) => (props.active ? props.theme.colors.button.primary.active.border : 'transparent')};
		border-radius: ${STYLING.dimensions.borderRadius};
		padding: 0 7.5px;
		background: ${(props) =>
			props.active
				? props.theme.colors.button.primary.active.background
				: props.theme.colors.button.primary.background};
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		span {
			font-size: ${(props) => props.theme.typography.size.base};
			font-family: ${(props) => props.theme.typography.family.primary};
			font-weight: ${(props) => props.theme.typography.weight.bold};
			color: ${(props) =>
				props.active ? props.theme.colors.button.primary.active.color : props.theme.colors.button.primary.color};
		}
		&:hover {
			border: 1px solid ${(props) => props.theme.colors.button.primary.active.border};
			background: ${(props) => props.theme.colors.button.primary.active.background};
			span {
				color: ${(props) => props.theme.colors.button.primary.color};
			}
		}
	}
`;

export const LoadingWrapper = styled.div`
	width: fit-content;
	margin: 10px auto 0 auto;
`;