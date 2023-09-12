import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100vh;
	width: ${STYLING.dimensions.navPanelWidth};
	position: fixed;
	top: 0;
	left: 0;
	padding: ${STYLING.dimensions.navHeaderHeight} 0 0 0;
	background: ${(props) => props.theme.colors.navigation.panel.background};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Group = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
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
		border: 1px solid
		${(props) =>
			props.active ? props.theme.colors.button.primary.active.border : 'transparent'};
		border-radius: ${STYLING.dimensions.borderRadius};
		padding: 0 7.5px;
		background: ${(props) =>
			props.active ? props.theme.colors.button.primary.active.background : props.theme.colors.button.primary.background};
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
			border: 1px solid
				${(props) => props.theme.colors.button.primary.active.border};
			background: ${(props) => props.theme.colors.button.primary.active.background};
			span {
				color: ${(props) => props.theme.colors.button.primary.color};
			}
		}
	}
`;